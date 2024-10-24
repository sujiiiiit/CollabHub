import React, { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Apply from "@/pages/components/apply";

// Define an interface for the props
interface RoleDetailProps {
  id: string;
}

const RoleDetail: React.FC<RoleDetailProps> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [htmlOutput, setHtmlOutput] = useState<string>("");

  const editor = useCreateBlockNote();

  useEffect(() => {
    const fetchDescription = async () => {
      setLoading(true); // Set loading to true at the start
      try {
        const response = await fetch(
          `http://localhost:5000/api/rolepost/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Assuming 'data.description' contains the block data in the required format
        editor.replaceBlocks(editor.document, data.description);
        const htmlFromBlocks = editor.blocksToFullHTML(data.description);
        setHtmlOutput(await htmlFromBlocks);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [editor, id]);

  return (
    <div
      id="roleDetail"
      style={{ height: `calc(100vh - 14px )` }}
      className="sticky top-2 w-full "
    >
      <ScrollArea className="h-[calc(100dvh_-_18px)] relative justify-between border mt-2 rounded-[8px] p-5">
        {loading ? (
          <Loading />
        ) : (
          <>
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
              <div className="flex top-0 gap-2 sticky">
                <span>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-muted w-10 h-10 flex justify-center items-center rounded-md">
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
                <Apply />
              </div>
            </div>
            <div className={"wrapper"}>
              <div className={"item"}>
                <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
              </div>
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default RoleDetail;
