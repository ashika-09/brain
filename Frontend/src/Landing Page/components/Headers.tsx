import { LuBrain } from "react-icons/lu";
import Button from "../components/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router";

function Headers() {
  const navigate = useNavigate();
  
  return (
    <div className=" flex items-center justify-between ">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <LuBrain className="text-xl"/>
        <div>IdeaForge</div>
      </div>
      <div className="gap-10 hidden md:flex">
        <a href="#about">About</a>
        <a href="#use-case">Use Case</a>
        <a href="#contact">Contact</a>
        <a href="#whats-new">What's New</a>
      </div>
      <div className="flex gap-3">
        <Button onClick={()=>navigate("/signup")} variant="border bg-zinc-200 text-black" text="SignUp"/>
        <Button onClick={()=>navigate("/login")} variant="bg-blue-500 text-white" icon={<FaArrowRightLong />} text="Login"/>
      </div>
    </div>
  );
}

export default Headers;
