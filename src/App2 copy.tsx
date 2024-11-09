"use client";
import React from "react";
import { BlockNoteEditor, filterSuggestionItems } from "@blocknote/core";
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { BlockNoteView, lightDefaultTheme } from "@blocknote/mantine";

import "@blocknote/core/fonts/inter.css";

// Import the necessary Gemini Flash libraries
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";



// Function to handle Gemini API streaming and parse each chunk of Markdown to blocks
const streamFromGemini = async (inputText: string, editor: BlockNoteEditor) => {
  try {
    const API_KEY = ""; // Replace with your actual API key
    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: inputText }] }],
    });

    let accumulatedMarkdown = "";
    for await (let response of result.stream) {
      const chunk = response.text();
      accumulatedMarkdown += chunk;

      // Convert the accumulated Markdown to blocks in real time
      const blocks = await editor.tryParseMarkdownToBlocks(accumulatedMarkdown);
      editor.replaceBlocks(editor.document, blocks);
    }
  } catch (e) {
    console.error("Error generating content:", (e as Error).message);
  }
};

const contentWritingPrompt = `
  You are a professional content writer specializing in creating engaging, well-researched, and informative content. categorize the question asked and if it is about your name answer that you are "CollabHub AI Assistant" adn addition what you can do.
  Follow these guidelines when generating content:
  
  1. Start with a catchy introduction to hook the reader.
  2. Structure the content into clear sections with proper headings and subheadings.
  3. Ensure the content is relevant and up-to-date, backed by reliable sources when needed.
  4. Use a friendly and approachable tone to engage the target audience.
  5. Provide actionable tips, insights, or solutions where applicable.
  6. Use bullet points, lists, or numbered steps to enhance readability.
  7. End with a concise conclusion that summarizes the main points and includes a call-to-action if relevant.
  
  Your content should be SEO-friendly with natural use of keywords, but avoid keyword stuffing. Prioritize clarity, flow, and value to the reader.

  Topic: "{topic}"
`;

const insertMagicAi = (editor: BlockNoteEditor) => {
  const prevText = editor._tiptapEditor.state.doc.textBetween(
    Math.max(0, editor._tiptapEditor.state.selection.from - 5000),
    editor._tiptapEditor.state.selection.from - 1,
    "\n"
  );
  const prompt = contentWritingPrompt.replace("{topic}", prevText || "general content topic");

  streamFromGemini(prompt, editor);
};

const insertMagicItem = (editor: BlockNoteEditor) => ({
  title: "Insert Magic Text",
  onItemClick: async () => {
    insertMagicAi(editor);
  },
  aliases: ["autocomplete", "ai"],
  group: "AI",
  icon: (
    <svg
      fill="none"
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
        fill="url(#prefix__paint0_radial_980_20147)"
      />
      <defs>
        <radialGradient
          id="prefix__paint0_radial_980_20147"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
        >
          <stop offset=".067" stop-color="#9168C0" />
          <stop offset=".343" stop-color="#5684D1" />
          <stop offset=".672" stop-color="#1BA1E3" />
        </radialGradient>
      </defs>
    </svg>
  ),
  subtext: "Continue your note with AI-generated text",
});

// Update the function to place the AI item first in the menu
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  insertMagicItem(editor), // Add AI item first
  ...getDefaultReactSlashMenuItems(editor), // Then add other items
];

const TextEditor: React.FC = () => {
  const editor = useCreateBlockNote({});



  return (
    <div className="flex flex-col items-center min-h-screen px-4 w-full">
      <div className="w-full max-w-4xl mx-auto m-5">
        <div className="item">
          <BlockNoteView
            editor={editor}
            slashMenu={false}
            theme={lightDefaultTheme}
          >
            <SuggestionMenuController
              triggerCharacter={"@"}
              getItems={async (query) =>
                filterSuggestionItems(getCustomSlashMenuItems(editor), query)
              }
            />
          </BlockNoteView>
        </div>
       
      </div>
    </div>
  );
};

export default TextEditor;
