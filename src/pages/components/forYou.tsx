import React from "react";
import { Button } from "@/components/ui/button";

const ForYou: React.FC = () => {
  return (
    <div className="flex md:flex-row flex-col gap-3">
      {/* post cards  */}
      <div className="w-full max-w-sm *:mt-2 ">
        <div
          className="relative w-full flex flex-col gap-1 p-3 border rounded-lg"
          style={{ borderRadius: "8px" }}
        >
          <div className="flex justify-start items-center gap-2">
            <div className='w-6 h-6 rounded-full border bg-muted bg-[url("https://github.com/sujiiiiit.png")] bg-cover bg-no-repeat'></div>
            <a href="#" className="text-sm text-black/80">
              Sujit Dwivedi
            </a>
          </div>
          <div className="w-full font-medium text-black text-lg">
            Web developer
          </div>
          <div className="text-xs text-black/80">Remote</div>
          <div className="flex flex-nowrap justify-between items-center">
            <div className="text-xs text-black/80">₹2L - ₹10L</div>
            <div className="text-xs text-black/80">24h</div>
          </div>
          <button className="absolute right-1 top-1 p-2 rouneded-full bg-transparent hover:bg-muted rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full border mt-2 rounded-[8px] p-5">
        <div className="flex justify-between">
          <div>
            <div className="flex justify-start items-center gap-2">
              <div className='w-8 h-8 rounded-full border bg-muted bg-[url("https://github.com/sujiiiiit.png")] bg-cover bg-no-repeat'></div>
              <a href="#" className="text-lg font-medium text-black/80">
                Sujit Dwivedi
              </a>
            </div>
            <div className="text-3xl font-medium mt-2">Web developer</div>
            <div className="text-sm  text-black/80">Remote</div>
          </div>
          <div className="flex gap-2 sticky">
            <Button className="bg-muted" size={"icon"} variant={"ghost"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
              </svg>
            </Button>
            <Button className="bg-muted" size={"icon"} variant={"ghost"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
              </svg>
            </Button>
            <Button className="bg-[var(--ten2)] text-black hover:border-black hover:border hover:outline-none hover:shadow-[4px_4px_0_0_#000] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px]">
              Apply to the role
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
