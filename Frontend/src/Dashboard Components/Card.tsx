import { MdDeleteOutline } from "react-icons/md";
import { RiLinksLine } from "react-icons/ri";
import { ReactNode, useCallback, useEffect } from "react";

interface CardProps {
  id: string;
  title: string;
  Src: string 
  type: string;
  discription?: string;
  Date: string;
  tags?: string[];
  icon?: ReactNode;
  del: (id: string) => void ;
  shared?: boolean;
}


const Card = ({ Src,type,title,tags,Date,discription,icon,id,del,shared }: CardProps) => {

  // Custom hook to handle external link opening based on available URLs.
  const useExternalLink = () => {
    const openExternalLinks = useCallback((...urls: string[]) => {
      urls.forEach(url => window.open(url, '_blank'));
    }, []);
  
    return openExternalLinks;
  };

  // Get the function to open external links.
  const openExternalLink = useExternalLink();

  // Effect hook to load the Twitter embed script when the component mounts.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js"; // Twitter embed script
    script.async = true; // Async loading to not block the page rendering
    document.body.appendChild(script); // Append the script to the body

    return () => {
      document.body.removeChild(script); // Cleanup: remove script when the component unmounts
    };
  }, []);

  // Function to transform 'x.com' Twitter links to 'twitter.com' format.
  const getTwitterUrl = (url: string | undefined) => {
    if (!url) return ""; // If there's no Twitter URL, return an empty string
    return url.replace(/^https:\/\/x\.com/, "https://twitter.com"); // Replace 'x.com' with 'twitter.com'
  };

  // Transform the Twitter URL using the getTwitterUrl function.
  const transformedUrl = getTwitterUrl(Src);

  // Function to convert YouTube URL to the embed format.
  const convertToEmbedUrl = (url: string | undefined) => {
    if (!url) return ""; // If there's no URL, return an empty string

    let videoId = "";

    // Check for YouTube Live URL (youtube.com/live/)
    if (url.includes("youtube.com/live/")) {
      videoId = url.split("/live/")[1].split("?")[0]; // Extract video ID from live URL
    }
    // Check for Shortened YouTube URL (youtu.be)
    else if (url.includes("youtu.be")) {
      videoId = url.split("/")[3].split("?")[0]; // Extract video ID from shortened URL
    } 
    // Standard YouTube URL (youtube.com/watch?v=VIDEO_ID)
    else if (url.includes("youtube.com/watch")) {
      const urlParams = new URL(url).searchParams;
      videoId = urlParams.get("v") || ""; // Extract video ID from standard YouTube URL
    }
    // Handle YouTube Playlist URL (youtube.com/playlist)
    else if (url.includes("youtube.com/playlist")) {
      const urlParams = new URL(url).searchParams;
      videoId = urlParams.get("v") || ""; // Extract first video ID in playlist
      if (!videoId) {
        const listId = urlParams.get("list");
        if (listId) {
          videoId = listId.split(",")[0]; // Use first video ID from playlist
        }
      }
    }

    // Return the embed URL if a video ID was found, else return an empty string
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return "";
  };

  // Convert the YouTube URL (YoutubeSrc prop) to embed URL using the convertToEmbedUrl function.
  const embedUrl = convertToEmbedUrl(Src);

  return (
    <div className="flex flex-col justify-between bg-zinc-700 max-w-80 max-h-[56vh] md:mx-2 my-5 rounded-xl overflow-hidden px-4 outline outline-1 outline-gray-100">
      <div>
        <div className="flex justify-between h-10 mb-2 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <span className="text-base font-bold">{type}</span>
          </div>
          <div className="text-xl flex gap-3">
            {/* Share Icon - Calls openExternalLink to open the respective link */}
            <RiLinksLine
              onClick={() => openExternalLink(Src)}
              className="hover:text-gray-50 text-gray-300 cursor-pointer"
            />
            {/* Delete Icon - Placeholder for delete functionality */}
           {!shared && <MdDeleteOutline onClick={()=>del(id)} className="hover:text-gray-50 text-gray-300 cursor-pointer" />}
          </div>
        </div>
        <div className="h-12 font-bold text-2xl">{title}</div>
      </div>

      <div className="object-cover overflow-hidden flex flex-col gap-2">
        <span>{discription}</span>
        {(type === "Website" || type === "Links" || type === "Document" || type === "Others") && <span>{Src}</span>}

        {/* Twitter Embed */}
        {type == "Twitter" && (
          <blockquote
            className="twitter-tweet"
            data-theme="dark"
            style={{ width: "100%", maxWidth: "500px" }} // Make sure tweet fits in the container
          >
            <a href={transformedUrl}></a> {/* Twitter Embed Link */}
          </blockquote>
        )}

        {/* YouTube Embed */}
        {type=="Youtube" && (
          <iframe
            src={embedUrl} // YouTube Embed URL
            className="w-full h-[100%]" // Full width and auto height to fit
            style={{ maxWidth: "500px", aspectRatio: "16/9" }} // Responsive aspect ratio for YouTube video
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div>
        <div className="text-sm w-full h-10 items-center flex gap-1 my-2">
          {tags && tags.map((tag,index)=><div key={index} className="bg-purple-300 text-purple-500 w-fit px-3 py-1 rounded-xl">#{tag}</div>)}
        </div>
        <div className="h-8 items-center my-1 text-sm text-gray-300">Added on {Date}</div>
      </div>
    </div>
  );
};

export default Card;
