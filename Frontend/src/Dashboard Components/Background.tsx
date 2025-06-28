import Button from "./Button";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Cards from "./Cards";
import axios from "../utils/token";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import { FRONTEND_URL } from "../../config";
import { useParams } from "react-router";

interface FuncProps {
  onClickopen: () => void;
  cardRender: boolean;
  data?: Card[]; 
  shared?: boolean;
}

interface Card {
  _id: string;
  title: string;
  content: string;
  linkType:string;
  link:string;
  description:string;
  tags:string[];
}

const Background = ({ onClickopen, cardRender, data, shared }: FuncProps) => {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  
  const {filter} = useParams();
  // Fetch cards only when shared is false
  useEffect(() => {
    if (shared) return;
    
    async function getCards() {
      setLoading(true);
      try {
        if (filter) {
          const res = await axios.get<{ content: Card[] }>(`${BACKEND_URL}/api/v1/contents/${filter}`);
          setCardData(res.data.content); // Set fetched data
        } else {
          const res = await axios.get<{ contents: Card[] }>(`${BACKEND_URL}/api/v1/contents`);
          setCardData(res.data.contents); // Set fetched data
        }
      } catch (error: unknown) {
        alert("Failed to fetch cards. Please try again. " + error);
      } finally {
        setLoading(false);
      }
    }
  
    getCards();
  }, [cardRender, deleted, shared, filter]); // Added shared to dependencies
  


  async function deleteCard(id: string) {
    try {
      const res = await axios.delete<{ message: string }>(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId: id },
      });
      setDeleted((prev) => !prev);
      alert(res.data.message);
    } catch (error: unknown) {
      alert("Failed to delete the card. Please try again. " +error);
    }
  }
  

  async function copy() {
    try {
      const res = await axios.post<{ hash?: string }>(`${BACKEND_URL}/api/v1/brain/share`, {
        share: true,
      });
      
      if (res.data && res.data.hash) {
        await navigator.clipboard.writeText(`${FRONTEND_URL}/share/${res.data.hash}`);
        alert("Copied to clipboard!");
      } else {
        alert("No hash data found.");
      }
    } catch (error: unknown) {
      alert("Failed to copy. Please try again. " + error);
    }
  }
  

  
  return (
    <div id="Background" className="w-full min-h-screen py-12 md:px-10 md:py-12 ">
      <div id="nav" className="w-full flex justify-between px-1">
        <div id="text" className="font-bold text-2xl md:text-4xl">
          All Notes
        </div>
        {!shared && (
          <div className="flex gap-3 w-[19vw]">
            <Button
              text="Share Idea"
              variant="bg-purple-300 hover:bg-purple-400 text-purple-500 hidden justify-center items-center "
              sidebar={false}
              icon={<IoShareSocialOutline />}
              onClick={copy}
            />
            <Button
              onClick={onClickopen}
              text="Add Content"
              variant="bg-purple-700 hover:bg-purple-600 justify-center items-center"
              icon={<FaPlus />}
            />
          </div>
        )}
      </div>
      <div id="cards">
        {loading ? (
        <div className=" absolute left-1/2 top-1/2">
           <div>Loading...</div>
        </div>
        ) :(
          shared && data? (<Cards deleteCard={deleteCard} shared={shared} data={data} />):(<Cards deleteCard={deleteCard} data={cardData} />)
        )}
      </div>

    </div>
  );
};

export default Background;
