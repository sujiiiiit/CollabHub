import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface RepoFile {
  name: string;
  type: string;
  path: string;
}

interface Message {
  role: "user" | "model"; 
  content: string;
}

interface ChatbotProps {
  repo: string;
  ownerId: string;
}

const MultiTenantChatbot: React.FC<ChatbotProps> = ({ repo, ownerId }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [repoContent, setRepoContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true); // Track scroll position

  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN as string;
  const chatHistoryRef = useRef<HTMLDivElement>(null); // Reference for the scrollable area

  useEffect(() => {
    const fetchRepoFiles = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${ownerId}/${repo}/contents/`, {
          headers: { Authorization: `token ${githubToken}` },
        });

        if (!res.ok) throw new Error(`GitHub API error: ${await res.text()}`);

        const files: RepoFile[] = await res.json();
        const contentPromises = files
          .filter((file) => file.type === "file")
          .map(async (file) => {
            const fileRes = await fetch(
              `https://api.github.com/repos/${ownerId}/${repo}/contents/${encodeURIComponent(file.path)}`,
              { headers: { Authorization: `token ${githubToken}` } }
            );
            if (!fileRes.ok) throw new Error(`Error fetching file: ${file.name}`);
            const fileData = await fileRes.json();
            return `File: ${file.name}\n\n${atob(fileData.content)}\n\n`;
          });

        const contentArray = await Promise.all(contentPromises);
        setRepoContent(contentArray.join(""));
        console.log("Repo content:", contentArray.join(""));
      } catch (err) {
        console.error("Error fetching repo files:", err);
      }
    };

    fetchRepoFiles();
  }, [repo, ownerId]);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!prompt.trim()) return;

    const newMessage: Message = { role: "user", content: prompt };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setPrompt("");
    setLoading(true);

    try {
      const conversation = updatedMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));
      const fullPrompt = `Repo Content:\n\n${repoContent}\n\nConversation:\n${conversation
        .map((m) => `${m.role}: ${m.parts[0].text}`)
        .join("\n")}`;

      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      const contents = [{ role: "user", parts: [{ text: fullPrompt }] }];

      const result = await model.generateContentStream({ contents });

      const buffer: string[] = [];
      for await (const response of result.stream) buffer.push(response.text());

      const assistantMessage: Message = { role: "model", content: buffer.join("") };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "model", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to manage scroll position
  useEffect(() => {
    const chatContainer = chatHistoryRef.current;
    if (chatContainer) {
      const handleScroll = () => {
        const isAtBottom = chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight;
        setIsAtBottom(isAtBottom);
      };

      chatContainer.addEventListener("scroll", handleScroll);

      // Cleanup
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Effect to auto-scroll to bottom if needed
  useEffect(() => {
    if (isAtBottom) {
      const chatContainer = chatHistoryRef.current;
      chatContainer?.scrollTo(0, chatContainer.scrollHeight); // Auto-scroll to bottom
    }
  }, [messages, loading, isAtBottom]); // Trigger auto-scroll on new messages or loading

  return (
    <div className="chat-container flex flex-col max-w-2xl mx-auto h-screen">
      <ScrollArea className="chat-history h-[calc(100dvh_-_8rem)] p-4 overflow-y-auto bg-white rounded-b-lg" ref={chatHistoryRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block text-sm px-4 py-2 rounded-lg ${
                msg.role === "user" ? "bg-blue-100 text-white" : "bg-black/5 text-black"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && <div className="text-left text-base shimmer">thinking...</div>}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex h-16 p-4 border-t">
        <input
          type="text"
          placeholder="Type your message..."
          value={prompt}
          onChange={(ev) => setPrompt(ev.target.value)}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <Button
          type="submit"
          className={`ml-2 px-4 py-2 h-8 rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"}`}
          disabled={loading}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default MultiTenantChatbot;
