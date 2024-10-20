import { Button } from "@/components/ui/button";
import MultiAvatar from "@/components/ui/multiAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

const ForYou: React.FC = () => {
  return (
    <div className="flex md:flex-row flex-col gap-3 ">
      {/* post cards  */}
      <div className="w-full md:max-w-sm *:mt-2 ">
        <div
          data-state="active"
          className="group cursor-pointer relative w-full flex flex-col gap-1 p-3 border-b rounded-lg data-[state=active]:border"
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
          <MultiAvatar
            size={"sm"}
            numPeople={99}
            avatarUrls={avatarUrls}
            className="my-2"
          />

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
      <div
        id="roleDetail"
        style={{ height: `calc(100vh - 14px )` }}
        className="sticky top-2 w-full "
      >
        <div className="h-[calc(100dvh_-_18px)] relative flex justify-between border mt-2 rounded-[8px] p-5">
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
          <div className="flex top-0 gap-2 sticky">
            <span>
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-muted w-10 h-10 flex  justify-center items-center rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
                    </svg>
                    <span>Report</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>

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
            <Button className="bg-primary text-black hover:border-black hover:border hover:outline-none hover:shadow-[4px_4px_0_0_#000] hover:transform hover:translate-x-[-4px] hover:translate-y-[-4px]">
              Collaborate Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
