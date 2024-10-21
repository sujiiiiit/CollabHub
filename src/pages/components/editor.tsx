'use client'

import React, { useMemo, useCallback } from 'react'
import { createEditor, Descendant, BaseEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact, useSlate, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bold, Italic, Underline, List, ListOrdered } from 'lucide-react'

// Custom types for the editor elements and text
type CustomElement = { type: 'paragraph' | 'list-item' | 'numbered-list' | 'bulleted-list'; children: CustomText[] }
type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

// Initial content for the editor
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Start typing your document here...' }],
  },
]

// Button component for the toolbar
const ToolbarButton = ({ format, icon: Icon, tooltip }: { format: string; icon: React.ElementType; tooltip: string }) => {
  const editor = useSlate()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onMouseDown={(event) => {
              event.preventDefault()
              toggleFormat(editor, format)
            }}
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Toggling the formatting on or off (bold, italic, underline)
const toggleFormat = (editor: ReactEditor, format: string) => {
  const isActive = isFormatActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

// Checking if the format is active (bold, italic, underline)
const isFormatActive = (editor: ReactEditor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? (marks as Record<string, boolean>)[format] === true : false
}

// Rendering different elements (paragraph, lists)
const Element = ({ attributes, children, element }: { attributes: any; children: React.ReactNode; element: CustomElement }) => {
  switch (element.type) {
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'paragraph':
    default:
      return <p {...attributes}>{children}</p>
  }
}

// Rendering leaf nodes with styles (bold, italic, underline)
const Leaf = ({ attributes, children, leaf }: { attributes: any; children: React.ReactNode; leaf: CustomText }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span>
}

export default function AdvancedDocumentEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    const text = event.clipboardData?.getData('text') || ''
    Transforms.insertText(editor, text)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Slate editor={editor} initialValue={initialValue}>
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-muted rounded-md">
          <ToolbarButton format="bold" icon={Bold} tooltip="Bold (Ctrl+B)" />
          <ToolbarButton format="italic" icon={Italic} tooltip="Italic (Ctrl+I)" />
          <ToolbarButton format="underline" icon={Underline} tooltip="Underline (Ctrl+U)" />
          <ToolbarButton format="bulleted-list" icon={List} tooltip="Bulleted List" />
          <ToolbarButton format="numbered-list" icon={ListOrdered} tooltip="Numbered List" />
        </div>
        <div className="min-h-[500px] p-4 border rounded-md bg-background">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Start typing your document here..."
            spellCheck
            autoFocus
            onPaste={handlePaste} // Disable image pasting
            onKeyDown={(event) => {
              if (!event.ctrlKey) return
              switch (event.key) {
                case 'b': {
                  event.preventDefault()
                  toggleFormat(editor, 'bold')
                  break
                }
                case 'i': {
                  event.preventDefault()
                  toggleFormat(editor, 'italic')
                  break
                }
                case 'u': {
                  event.preventDefault()
                  toggleFormat(editor, 'underline')
                  break
                }
              }
            }}
          />
        </div>
      </Slate>
    </div>
  )
}
