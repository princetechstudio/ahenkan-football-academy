import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Wand2,
  Sparkles,
  Copy,
  Undo2,
  Redo2,
  FileText,
  Volume2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  onImproveAI?: () => Promise<void>;
  aiLoading?: boolean;
  aiMessage?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  minHeight = "300px",
  onImproveAI,
  aiLoading = false,
  aiMessage = "",
}: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null);
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string>("");

  // Enhanced toolbar with all professional formatting options
  const modules = {
    toolbar: {
      container: [
        // Text styles
        [{ header: [1, 2, 3, 4, false] }],
        [{ size: ["small", false, "large", "huge"] }],

        // Basic formatting
        ["bold", "italic", "underline", "strike"],

        // Colors
        [{ color: [] }, { background: [] }],

        // Font family
        [{ font: [] }],

        // Alignment
        [{ align: [] }],

        // Lists
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],

        // Quote and code
        ["blockquote", "code-block"],

        // Media
        ["link", "image", "video"],

        // Clear formatting
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "size",
    "color",
    "background",
    "font",
    "align",
    "list",
    "indent",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  const styleOptions = [
    { label: "Heading 1", value: { header: 1 } },
    { label: "Heading 2", value: { header: 2 } },
    { label: "Heading 3", value: { header: 3 } },
    { label: "Normal", value: { header: false } },
  ];

  const applyStyle = (style: any) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      if (range && range.length > 0) {
        Object.keys(style).forEach((key) => {
          editor.formatText(range.index, range.length, key, style[key]);
        });
      } else if (range) {
        // If no text is selected, apply to the current line/selection point
        Object.keys(style).forEach((key) => {
          editor.formatText(range.index, 1, key, style[key]);
        });
      }
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(
      quillRef.current?.getEditor().getText() || ""
    );
  };

  const undo = () => {
    quillRef.current?.getEditor().history.undo();
  };

  const redo = () => {
    quillRef.current?.getEditor().history.redo();
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b-2 border-gold-500/30 bg-bone-50 p-4">
        {/* AI Tools */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onImproveAI}
            disabled={aiLoading || !value.trim()}
            className="flex items-center gap-2 rounded-lg border-2 border-gold-500 bg-gold-50 px-3 py-2 font-cond text-sm font-bold uppercase tracking-[0.12em] text-gold-600 transition-all hover:bg-gold-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Use AI to improve your content"
          >
            <Sparkles className="h-4 w-4" />
            {aiLoading ? "Improving..." : "AI Enhance"}
          </button>
        </div>

        {/* Divider */}
        <div className="w-px bg-pitch-900/10" />

        {/* Undo/Redo */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={undo}
            className="flex items-center gap-1 rounded-lg border-2 border-pitch-700 px-3 py-2 font-cond text-xs font-bold uppercase tracking-[0.12em] text-pitch-700 transition-colors hover:bg-pitch-700 hover:text-bone-50"
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            className="flex items-center gap-1 rounded-lg border-2 border-pitch-700 px-3 py-2 font-cond text-xs font-bold uppercase tracking-[0.12em] text-pitch-700 transition-colors hover:bg-pitch-700 hover:text-bone-50"
            title="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px bg-pitch-900/10" />

        {/* Copy & Utility */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copyContent}
            className="flex items-center gap-1 rounded-lg border-2 border-pitch-700 px-3 py-2 font-cond text-xs font-bold uppercase tracking-[0.12em] text-pitch-700 transition-colors hover:bg-pitch-700 hover:text-bone-50"
            title="Copy text"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px bg-pitch-900/10" />

        {/* Quick Styles */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowStylePanel(!showStylePanel)}
            className="flex items-center gap-2 rounded-lg border-2 border-pitch-700 px-3 py-2 font-cond text-xs font-bold uppercase tracking-[0.12em] text-pitch-700 transition-colors hover:bg-pitch-700 hover:text-bone-50"
            title="Quick styles"
          >
            <Wand2 className="h-4 w-4" />
            Styles
          </button>
          {showStylePanel && (
            <div className="absolute top-full left-0 mt-2 z-50 border-2 border-pitch-700 bg-bone-50 p-3 space-y-2 rounded-lg shadow-lg min-w-[200px]">
              {styleOptions.map((style) => (
                <button
                  key={style.label}
                  type="button"
                  onClick={() => {
                    applyStyle(style.value);
                    setShowStylePanel(false);
                  }}
                  className="block w-full text-left rounded px-3 py-2 hover:bg-pitch-900/10 font-cond text-sm uppercase tracking-[0.12em]"
                >
                  {style.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div
        className="prose prose-sm max-w-none rounded-lg border-2 border-pitch-900/10"
        style={{
          backgroundColor: "#f9f9f9",
        }}
      >
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder={placeholder}
          style={{ minHeight }}
        />
      </div>

      {/* Status Messages */}
      {aiMessage && (
        <div
          className={`flex items-center gap-3 rounded-lg border-l-4 px-4 py-3 ${
            aiMessage.includes("Error")
              ? "border-clay-500 bg-clay-50 text-clay-700"
              : "border-gold-500 bg-gold-50 text-gold-700"
          }`}
        >
          <Sparkles className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm font-medium">{aiMessage}</p>
        </div>
      )}

      {/* Character Count */}
      <div className="flex justify-end">
        <p className="font-cond text-xs text-pitch-900/50">
          {quillRef.current?.getEditor().getLength() || 0} characters
        </p>
      </div>
    </div>
  );
}
