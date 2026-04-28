import { useState } from "react";
import type { ManualBlock, ManualSection, ManualTableCell } from "../../content/manual";
import { font } from "../Layout";

interface ManualRendererProps {
  sections: ManualSection[];
}

export function ManualRenderer({ sections }: ManualRendererProps) {
  return (
    <div className="flex flex-col gap-[56px] lg:gap-[72px]">
      {sections.map((section) => (
        <ManualSectionView key={section.id} section={section} />
      ))}
    </div>
  );
}

function ManualSectionView({ section }: { section: ManualSection }) {
  return (
    <section id={section.id} className="scroll-mt-[120px]">
      <h2 className="text-[#345bb4] text-[28px] lg:text-[40px] leading-[1.2] mb-[28px] lg:mb-[40px]" style={{ fontWeight: 650, letterSpacing: "-0.03em" }}>
        {section.title}
      </h2>
      <div className="flex flex-col gap-[18px]">
        {section.blocks.map((block, index) => (
          <ManualBlockView key={`${section.id}-${index}`} block={block} />
        ))}
      </div>
    </section>
  );
}

function ManualBlockView({ block }: { block: ManualBlock }) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock block={block} />;
    case "paragraph":
      return <Paragraph text={block.text} />;
    case "list":
      return <BulletList items={block.items} />;
    case "code":
      return <CodeBlock code={block.code} language={block.language} />;
    case "table":
      return <TableBlock rows={block.rows} />;
    case "imageGrid":
      return <ImageGrid images={block.images} caption={block.caption} />;
    default:
      return null;
  }
}

function HeadingBlock({ block }: { block: Extract<ManualBlock, { type: "heading" }> }) {
  const level = Math.min(Math.max(block.level, 2), 5);
  const classNameByLevel: Record<number, string> = {
    2: "text-[#141414] text-[24px] lg:text-[32px] leading-[1.25] mt-[12px] mb-[8px]",
    3: "text-[#141414] text-[21px] lg:text-[26px] leading-[1.3] mt-[10px] mb-[4px]",
    4: "text-[#141414] text-[18px] lg:text-[21px] leading-[1.35] mt-[8px] mb-[2px]",
    5: "text-[#141414] text-[17px] lg:text-[19px] leading-[1.4] mt-[6px]",
  };
  const content = (
    <span className="break-words">
      {block.text}
    </span>
  );
  const props = {
    id: block.id,
    className: `${classNameByLevel[level]} scroll-mt-[120px]`,
    style: { fontWeight: level <= 3 ? 650 : 600, letterSpacing: "-0.015em" },
  };

  if (level === 2) return <h3 {...props}>{content}</h3>;
  if (level === 3) return <h4 {...props}>{content}</h4>;
  if (level === 4) return <h5 {...props}>{content}</h5>;
  return <h6 {...props}>{content}</h6>;
}

function Paragraph({ text }: { text: string }) {
  return (
    <p className="text-[#141414] text-[16px] lg:text-[17px] tracking-[-0.17px] leading-[1.65] whitespace-pre-line">
      {renderInlineCode(text)}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-[24px] text-[#141414] text-[16px] lg:text-[17px] tracking-[-0.17px] leading-[1.65] space-y-[5px]">
      {items.map((item, index) => (
        <li key={index} className="pl-[2px]">
          {renderInlineCode(item)}
        </li>
      ))}
    </ul>
  );
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="relative group rounded-[12px] bg-[#fafafa] border border-[#f0f0f0] overflow-hidden my-[4px]">
      <div className="flex items-center justify-between px-[18px] py-[10px] border-b border-[#eeeeee]">
        <span className="text-[12px] uppercase tracking-[0.08em] text-[#999]">{language || "text"}</span>
        <button
          onClick={handleCopy}
          className="px-[10px] py-[4px] rounded-[6px] bg-white border border-[#e0e0e0] text-[13px] text-[#666] transition-all duration-200 cursor-pointer hover:bg-[#f0f0f0] hover:text-[#222] active:scale-95"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-[18px] py-[18px] text-[14px] leading-[1.75] text-[#141414]" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TableBlock({ rows }: { rows: ManualTableCell[][] }) {
  const maxColumns = Math.max(...rows.map((row) => row.length));
  const firstRowLooksLikeHeader =
    rows.length > 1 &&
    rows[0].every((cell) => cell.text && !cell.images.length) &&
    rows[0].length === maxColumns;

  return (
    <div className="overflow-x-auto rounded-[12px] border border-[#e4e4e7] my-[4px]">
      <table className="w-full text-[14px] caption-bottom" style={{ fontFamily: font }}>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[#e4e4e7] last:border-b-0">
              {Array.from({ length: maxColumns }).map((_, cellIndex) => {
                const cell = row[cellIndex] ?? { text: "", images: [] };
                const Tag = firstRowLooksLikeHeader && rowIndex === 0 ? "th" : "td";
                return (
                  <Tag
                    key={cellIndex}
                    className={`min-w-[160px] px-[14px] py-[12px] align-top text-left ${
                      Tag === "th"
                        ? "bg-[#f9fafb] text-[#71717a] text-[12px] uppercase tracking-[0.02em]"
                        : "text-[#3f3f46]"
                    }`}
                    style={{ fontWeight: Tag === "th" ? 600 : 400 }}
                  >
                    <CellContent cell={cell} />
                  </Tag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CellContent({ cell }: { cell: ManualTableCell }) {
  return (
    <div className="flex flex-col gap-[10px]">
      {cell.images.map((image, index) => (
        <img
          key={`${image.src}-${index}`}
          src={image.src}
          alt={image.alt || ""}
          className="max-h-[260px] w-auto max-w-full rounded-[8px] object-contain"
          loading="lazy"
        />
      ))}
      {cell.text && (
        <div className="whitespace-pre-line leading-[1.55]">
          {renderInlineCode(cell.text)}
        </div>
      )}
    </div>
  );
}

function ImageGrid({ images, caption }: Extract<ManualBlock, { type: "imageGrid" }>) {
  if (!images.length) return null;

  return (
    <figure className="my-[6px]">
      <div className={`grid gap-[14px] ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {images.map((image, index) => (
          <img
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt || caption || ""}
            className="w-full max-h-[520px] rounded-[12px] border border-[#f0f0f0] object-contain bg-[#fafafa]"
            loading="lazy"
          />
        ))}
      </div>
      {caption && (
        <figcaption className="text-center text-[#8a8a8a] text-[13px] leading-[1.5] mt-[10px]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="bg-[#f0f0f0] text-[#c0392b] px-[5px] py-[2px] rounded-[4px] text-[0.92em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
