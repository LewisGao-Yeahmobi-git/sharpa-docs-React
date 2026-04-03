import { useState } from "react";
import type { ReactNode } from "react";
import { font } from "../Layout";

function colorize(line: string) {
  return line.split(/('.*?')/g).map((part, i) => {
    if (part.startsWith("'") && part.endsWith("'")) {
      return (
        <span key={i} className="text-[#2e8b57]">
          {part}
        </span>
      );
    }
    return (
      <span key={i} className="text-[#141414]">
        {part}
      </span>
    );
  });
}

export function CodeBlock({
  code,
  startLine = 1,
  defaultCollapsed = true,
}: {
  code: string;
  startLine?: number;
  defaultCollapsed?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const lines = code.split("\n");
  const previewLines = 3;
  const canCollapse = lines.length > previewLines;
  const visibleLines = canCollapse && collapsed ? lines.slice(0, previewLines) : lines;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-[12px] bg-[#fafafa] border border-[#f0f0f0] overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-[12px] right-[12px] px-[10px] py-[4px] rounded-[6px] bg-white border border-[#e0e0e0] text-[13px] text-[#666] opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer hover:bg-[#f0f0f0] hover:text-[#222] active:scale-95 z-10"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <div className="overflow-x-auto py-[24px] px-[24px]">
        <table className="border-collapse">
          <tbody>
            {visibleLines.map((line, i) => (
              <tr key={i} className="leading-[1.8]">
                <td
                  className="pr-[24px] text-right text-[#c0c0c0] text-[14px] select-none whitespace-nowrap"
                  style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                >
                  {startLine + i}
                </td>
                <td className="text-[14px] whitespace-pre" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                  {colorize(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {canCollapse && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full py-[10px] text-[14px] text-[#345bb4] bg-[#f5f5f7] border-t border-[#f0f0f0] cursor-pointer hover:bg-[#eef0f4] transition-colors duration-200"
        >
          {collapsed ? `Show all ${lines.length} lines ▾` : "Collapse ▴"}
        </button>
      )}
    </div>
  );
}

export function LabeledCodeBlock({
  label,
  code,
  defaultCollapsed = false,
}: {
  label: string;
  code: string;
  defaultCollapsed?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const lines = code.split("\n");
  const previewLines = 3;
  const canCollapse = lines.length > previewLines;
  const visibleLines = canCollapse && collapsed ? lines.slice(0, previewLines) : lines;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-[12px] bg-[#fafafa] border border-[#f0f0f0] overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-[12px] right-[12px] px-[10px] py-[4px] rounded-[6px] bg-white border border-[#e0e0e0] text-[13px] text-[#666] opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer hover:bg-[#f0f0f0] hover:text-[#222] active:scale-95 z-10"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <div className="px-[24px] pt-[16px] pb-[4px] text-[13px] text-[#888] tracking-[-0.13px]" style={{ fontWeight: 500 }}>
        {label}
      </div>
      <div className="overflow-x-auto pb-[24px] px-[24px]">
        <table className="border-collapse">
          <tbody>
            {visibleLines.map((line, i) => (
              <tr key={i} className="leading-[1.8]">
                <td
                  className="pr-[24px] text-right text-[#c0c0c0] text-[14px] select-none whitespace-nowrap"
                  style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                >
                  {i + 1}
                </td>
                <td className="text-[14px] whitespace-pre" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                  {colorize(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {canCollapse && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full py-[10px] text-[14px] text-[#345bb4] bg-[#f5f5f7] border-t border-[#f0f0f0] cursor-pointer hover:bg-[#eef0f4] transition-colors duration-200"
        >
          {collapsed ? `Show all ${lines.length} lines ▾` : "Collapse ▴"}
        </button>
      )}
    </div>
  );
}

export function ApiMethod({ name, description, children }: { name: string; description: string; children: ReactNode }) {
  return (
    <div className="mb-[48px]">
      <h4 className="text-[#141414] text-[20px] tracking-[-0.2px] leading-[1.3] mb-[8px]" style={{ fontWeight: 600, fontFamily: font }}>
        {name}
      </h4>
      <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[16px]">{description}</p>
      <div className="flex flex-col gap-[12px]">{children}</div>
    </div>
  );
}

export function InfoCallout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#f0f4ff] border border-[#d6e0f5] rounded-[12px] px-[20px] py-[16px] flex items-start gap-[10px]">
      <p className="text-[#141414] text-[15px] tracking-[-0.15px] leading-[1.6]">{children}</p>
    </div>
  );
}
