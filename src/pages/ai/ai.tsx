import { ScrollArea } from "@/components/ui/scroll-area";
import Filetree from "./file-tree";
import { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function AI({ owner = "facebook", repo = "react", path = "" }) {
  const [fileTree, setFileTree] = useState<
    { path: string; name: string; type: string }[]
  >([]);
  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFileTree() {
      const { data } = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
      );
      setFileTree(data);
    }
    fetchFileTree();
  }, [path]);

  const loadFileContent = async (filePath: any) => {
    const { data } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`
    );
    const content = atob(data.content); // Decode base64
    setFileContent(content);
  };
  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-[calc(100dvh_-_6rem)] flex max-w-6xl m-auto p-4"
      >
        <ResizablePanel defaultSize={20} className="h-[calc(100dvh_-_6rem)] rounded-xl bg-gray-50 border-l border-t border-b  border-r-0 rounded-r-none">
          <ScrollArea className="h-[calc(100dvh_-_6rem)] ">
            <Filetree />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="h-[calc(100dvh_-_6rem)] bg-black/30"
        />
        <ResizablePanel className="h-[calc(100dvh_-_6rem)]  rounded-xl border-t border-r border-b border-l-0 rounded-l-none">
          <ScrollArea className="h-[calc(100dvh_-_6rem)] w-full">
            <div className="file-tree-ui">
              <ul>
                {fileTree.map((item) => (
                  <li
                    key={item.path}
                    onClick={() =>
                      item.type === "file" ? loadFileContent(item.path) : null
                    }
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              {fileContent && (
                <MonacoEditor
                  height="400px"
                  language="javascript" // Adjust based on file type
                  value={fileContent}
                  options={{ readOnly: true }}
                />
              )}
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
