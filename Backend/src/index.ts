import express, { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import {
  UserModel,
  ContentModel,
  LinkModel,
  TagsModel,
} from "./Database/schema";
import { FRONTEND_URL, JWT_SECRET, mongo } from "./config";
import authMiddleware from "./auth";
import cors from "cors";
const app = express();
const saltRounds = 5;

app.use(
  cors({
    origin: "*", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);
app.options("*", cors()); // Handle all OPTIONS requests

app.use(express.json());

// Validation Schema
const reqBody = z.object({
  email: z.string().email(),
  username: z.string().min(1).max(100),
  name: z.string().min(1).max(100),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(30),
});

type SignupRequest = z.infer<typeof reqBody>;

interface IGetUserAuthInfoRequest extends Request {
  userId?: string;
}

interface ContentInfo {
  title: string;
  link: string;
  description: string;
  linkType: string;
  tags: string[];
}

type fun = Promise<any>;

// Signup Route
app.post("/api/v1/signup", async (req: Request, res: Response): fun => {
  const validation = reqBody.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid input format",
      errors: validation.error.errors,
    });
  }

  const { email, username, name, password }: SignupRequest = validation.data;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UserModel.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Signup successful" });
  } catch (error: any) {
    return res
      .status(409)
      .json({ message: "User already exists", error: error.message });
  }
});

// Signin Route
app.post("/api/v1/signin", async (req: Request, res: Response): fun => {
  const { email, password }: Pick<SignupRequest, "email" | "password"> =
    req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Please sign up" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "10h" });

    return res.status(200).json({ token, message: "Signin successful" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// acess to the shared link
app.get(
  "/api/v1/brain/:shareLink",
  async (req: Request, res: Response): fun => {
    try {
      const hash = req.params.shareLink;

      // Find the link by hash and populate the associated user
      const link = await LinkModel.findOne({ hash }).populate(
        "userId",
        "username"
      );

      if (!link) {
        return res.status(401).json({ message: "Invalid or expired link" });
      }

      // Find the content associated with the user
      const content = await ContentModel.find({ userId: link.userId });

      if (!content) {
        return res
          .status(404)
          .json({ message: "No content found for the provided link" });
      }

      //username finding
      let user = link.userId["username"];

      // Return the username and content
      res.json({ user, content });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while processing the request",
        error,
      });
    }
  }
);

// Authentication Middleware
app.use(authMiddleware);

// Create Content
app.post(
  "/api/v1/content",
  async (req: IGetUserAuthInfoRequest, res: Response): fun => {
    const { title, description, link, linkType, tags }: ContentInfo = req.body;

    // Validate required fields
    if (!title || !tags || !linkType) {
      return res.status(400).json({
        message: "Missing required fields: title, link, linkType, or tags.",
      });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Validate tags is an array
    if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string")) {
      return res
        .status(400)
        .json({ message: "Tags must be an array of strings." });
    }

    try {
      // Create content with all required fields
      await ContentModel.create({
        title,
        description,
        link,
        linkType,
        tags,
        userId: req.userId,
      });

      return res.status(201).json({ message: "Content created successfully." });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "An internal error occurred", error: error.message });
    }
  }
);

//update/add tags
app.put(
  "/api/v1/tags",
  async (req: IGetUserAuthInfoRequest, res: Response): fun => {
    const { tags }: Pick<ContentInfo, "tags"> = req.body;

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res
        .status(400)
        .json({ message: "Missing or invalid required field: tags." });
    }

    try {
      // Insert new tags if they don't exist
      const insertedTags = await Promise.all(
        tags.map(async (tagName) => {
          const existingTag = await TagsModel.findOne({ name: tagName });

          if (!existingTag) {
            return new TagsModel({ name: tagName }).save();
          }
          return existingTag;
        })
      );

      return res.status(201).json({
        message: "Tags created/updated successfully.",
        tags: insertedTags,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "An internal error occurred", error: error.message });
    }
  }
);

// Fetch User's Contents
app.get(
  "/api/v1/contents",
  async (req: IGetUserAuthInfoRequest, res: Response): fun => {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    try {
      const contents = await ContentModel.find({ userId: req.userId }).populate(
        "userId",
        "username"
      );
      return res.status(200).json({ contents });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "An internal error occurred", error: error.message });
    }
  }
);

app.get(
  "/api/v1/tags",
  async (req: IGetUserAuthInfoRequest, res: Response): fun => {
    try {
      const tags = await TagsModel.find({});
      return res.status(200).json({ tags });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "An internal error occurred", error: error.message });
    }
  }
);

// Delete Content
app.delete(
  "/api/v1/content",
  async (req: IGetUserAuthInfoRequest, res: Response): fun => {
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({ message: "Content ID is required." });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    try {
      const result = await ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId,
      });
      if (!result.deletedCount) {
        return res
          .status(404)
          .json({ message: "Content not found or unauthorized." });
      }

      return res.status(200).json({ message: "Content deleted successfully." });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "An internal error occurred", error: error.message });
    }
  }
);

app.get(
  "/api/v1/contents/:content",
  async (req: IGetUserAuthInfoRequest, res: Response): fun => {
    const filter = req.params.content;
    const userId = req.userId;

    // Use a mapping object for search values
    const filterMap: Record<string, string | string[]> = {
      Videos: "Youtube",
      Tweets: "Twitter",
      Documents: "Document",
      Website: "Links",
      Links: ["Links", "Website"],
    };

    const linkType = filter === "All" ? "" : filterMap[filter];

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    try {
      let query: Record<string, unknown>;

      if (linkType) {
        // If linkType is an array (e.g., "Links" case), use $in
        query = Array.isArray(linkType)
          ? { linkType: { $in: linkType }, userId }
          : { linkType, userId };
      } else {
        // Handle "All" case
        query = { userId };
      }

      const content = await ContentModel.find(query);

      res
        .status(200)
        .json({ message: "Content loaded successfully.", content });
    } catch (error) {
      res.status(500).json({ message: "An internal server error occurred." });
    }
  }
);

function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
}

app.post(
  "/api/v1/brain/share",
  async (req: IGetUserAuthInfoRequest, res: Response): fun => {
    try {
      const share: boolean = req.body.share;

      if (share) {
        const exist = await LinkModel.findOne({ userId: req.userId });

        if (exist) {
          const hash = exist.hash;
          return res.json({ message: "Shareable link ", hash });
        }

        const hash: string = generateRandomString(10);
        // Create a new shareable link
        await LinkModel.create({
          hash,
          userId: req.userId,
        });
        return res.json({ message: "Shareable link created", hash });
      } else {
        await LinkModel.deleteMany({
          userId: req.userId,
        });
        return res.json({ message: "Shareable links removed" });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  }
);

async function main(): Promise<void> {
  try {
    await mongoose.connect(mongo);
    console.log("Db connected");

    app.listen(3000);
    console.log("App is listening");
  } catch (error) {
    process.exit(1);
  }
}

main();
