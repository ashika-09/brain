import { FaArrowRightLong } from "react-icons/fa6";


export default function HomePage() {
  return (
    <div>
      <section className="container py-24">
          <div className="max-w-[800px] mx-auto text-center space-y-8">
            <h1 className="text-[6vw] font-bold tracking-tight">
              EMBRACE <FaArrowRightLong className="inline-block ml-2 text-5xl" />
              <span className="block">THE SMART WAY</span>
              <span className="block">OF WRITING IDEAS</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-2">
              {["intelligence", "bookmark", "organize", "sync", "share"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 bg-gray-100 text-black rounded-full text-sm capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>


        </section>
    </div>
  )
}

