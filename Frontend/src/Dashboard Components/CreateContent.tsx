import axios from "../utils/token";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config";

interface AddContentProps {
  open: boolean;
  onClose: () => void;
  shared?:boolean;
}

const linkTypes = [
  { value: "Twitter", label: "Twitter" },
  { value: "Youtube", label: "Youtube" },
  { value: "Website", label: "Website" },
  { value: "Document", label: "Document" },
  { value: "Links", label: "Links" },
  { value: "Other", label: "Other" },
];

interface Tag {
  _id: string;  
  name: string;  
  createdAt?: string; 
  updatedAt?: string; 
}

function CreateContent({ open, onClose,shared }: AddContentProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkType, setLinkType] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shared) return;
    async function fetchTags() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/tags`);
        setTags(res.data.tags);
      } catch (error) {
        alert("Error fetching tags " + error)
      }
    }
    fetchTags();
  }, [shared]);

  const handleTagSelection = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((name) => name !== tagName) : [...prev, tagName]
    );
  };
  
  
  const handleAddNewTag = async () => {
  
    if (tags.some((tag) => tag.name.toLowerCase() === newTag.toLowerCase())) {
      alert("Tag already exists.");
      return;
    }
  
    try {
      const res = await axios.put(`${BACKEND_URL}/api/v1/tags`, { tags: [newTag] });
      const createdTag = res.data.tags[0]; // Extract the created tag
      setTags([...tags, createdTag]); 
      setNewTag("");
      setShowNewTagInput(false);
      setSelectedTags([])
      alert(res.data.message);
    } catch (error) {
      alert("Failed to add new tag. Please try again. " + error);
    }
  };

  const addContent = async () => {
    if (!title || !linkType) {
      alert("Please fill in all fields and select at least one tag.")
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/content`, {
        title,
        description,
        linkType,
        link,
        tags: selectedTags,
      });
      alert(res.data.message);
      onClose();
      setTitle("");
      setDescription("");
      setLinkType("");
      setLink("");
    } catch (error) {
      alert("Error adding content: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="w-screen h-screen bg-zinc-900 fixed top-0 left-0 bg-opacity-60">
          <div className="flex items-center justify-center w-full h-full">
            <div className="bg-white dark:bg-zinc-800 shadow-lg dark:shadow-2xl rounded-xl p-8 w-full max-w-md relative transition-colors duration-200">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
                Add New Item
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Description <span className="text-zinc-400">(optional)</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter description"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Type
                  </label>
                  <select
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select type</option>
                    {linkTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Link <span className="text-zinc-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter link"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Tags <span className="text-zinc-400">(optional)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag._id}
                        type="button"
                        onClick={() => handleTagSelection(tag.name)}
                        className={`px-3 py-1 rounded-full border ${
                          selectedTags.includes(tag.name)
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-zinc-100 text-zinc-700 border-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600"
                        }  hover:text-white hover:border-blue-500 transition-colors`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowNewTagInput(true)}
                    className="text-blue-600 dark:text-blue-400 mt-2"
                  >
                    Add new tag
                  </button>
                </div>
                {showNewTagInput && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-grow px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter new tag"
                    />
                    <button
                      onClick={handleAddNewTag}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md"
                    >
                      Add
                    </button>
                  </div>
                )}
                <button
                  onClick={addContent}
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateContent;
