import React, { useState } from "react";
import { AlertTriangle, Info } from "lucide-react";
import type {
  ManualBlock,
  ManualImage,
  ManualListItem,
  ManualSection,
  ManualTableCell,
} from "../../content/manual";
import { font } from "../Layout";

const assetBase =
  (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/";

interface ManualRendererProps {
  sections: ManualSection[];
}

export function ManualRenderer({ sections }: ManualRendererProps) {
  return (
    <div className="flex flex-col gap-[56px] lg:gap-[72px]">
      {sections.map((section) => (
        <div key={section.id}>
          <ManualSectionView section={section} />
        </div>
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
          <div key={`${section.id}-${index}`}>
            <ManualBlockView block={block} />
          </div>
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
      return <ListBlock block={block} />;
    case "callout":
      return <CalloutBlock block={block} />;
    case "code":
      return <CodeBlock code={block.code} language={block.language} />;
    case "table":
      return <TableBlock rows={block.rows} columnWidths={block.columnWidths} />;
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
  const content = <span className="break-words">{block.text}</span>;
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
      {renderInlineContent(text)}
    </p>
  );
}

function ListBlock({ block }: { block: Extract<ManualBlock, { type: "list" }> }) {
  const Tag = block.ordered ? "ol" : "ul";
  const listClass = block.ordered ? "list-decimal" : "list-disc";

  return (
    <Tag
      className={`${listClass} pl-[24px] text-[#141414] text-[16px] lg:text-[17px] tracking-[-0.17px] leading-[1.65] space-y-[5px]`}
      start={block.ordered ? block.start : undefined}
    >
      {block.items.map((rawItem, index) => {
        const item = normalizeListItem(rawItem);

        return (
          <li key={index} className="pl-[2px]" style={{ marginLeft: `${item.level * 18}px` }}>
            {renderInlineContent(item.text)}
          </li>
        );
      })}
    </Tag>
  );
}

function CalloutBlock({ block }: { block: Extract<ManualBlock, { type: "callout" }> }) {
  const isWarning = block.variant === "warning";
  const Icon = isWarning ? AlertTriangle : Info;

  return (
    <div
      className={`flex gap-[12px] rounded-[10px] border px-[14px] py-[12px] text-[15px] lg:text-[16px] leading-[1.55] ${
        isWarning
          ? "border-[#f4d48a] bg-[#fff8e6] text-[#3f3320]"
          : "border-[#d8e2f7] bg-[#f5f8ff] text-[#26364f]"
      }`}
    >
      <Icon
        size={18}
        className={`mt-[3px] shrink-0 ${isWarning ? "text-[#d18a00]" : "text-[#345bb4]"}`}
        strokeWidth={2}
      />
      <div className="whitespace-pre-line">{renderInlineContent(block.text)}</div>
    </div>
  );
}

function normalizeListItem(item: string | ManualListItem): Required<ManualListItem> {
  if (typeof item === "string") return { text: item, level: 0 };
  return { text: item.text, level: item.level ?? 0 };
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

function TableBlock({
  rows,
  columnWidths,
}: {
  rows: ManualTableCell[][];
  columnWidths?: number[];
}) {
  const maxColumns = Math.max(
    ...rows.map((row) => row.reduce((count, cell) => count + (cell.colSpan ?? 1), 0))
  );
  const firstRowLooksLikeHeader =
    rows.length > 1 &&
    rows[0].every((cell) => cell.text && !cell.images.length) &&
    rows[0].length === maxColumns;
  const totalWidth = columnWidths?.reduce((sum, width) => sum + width, 0) ?? 0;

  return (
    <div className="overflow-x-auto rounded-[10px] border border-[#dcdfe5] my-[4px]">
      <table
        className="w-full border-collapse text-[14px] caption-bottom"
        style={{
          fontFamily: font,
          minWidth: maxColumns > 3 ? `${maxColumns * 150}px` : "100%",
        }}
      >
        {columnWidths && totalWidth > 0 && (
          <colgroup>
            {columnWidths.map((width, index) => (
              <col key={index} style={{ width: `${(width / totalWidth) * 100}%` }} />
            ))}
          </colgroup>
        )}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const Tag = firstRowLooksLikeHeader && rowIndex === 0 ? "th" : "td";
                const imageOnly = cell.images.length > 0 && !cell.text;

                return (
                  <Tag
                    key={cellIndex}
                    colSpan={cell.colSpan}
                    className={`border border-[#dcdfe5] px-[14px] py-[12px] text-left ${
                      imageOnly ? "align-middle" : "align-top"
                    } ${
                      Tag === "th"
                        ? "bg-[#f7f8fa] text-[#4b5563] text-[12px] uppercase tracking-[0.02em]"
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
    <div className={`flex flex-col gap-[10px] ${cell.images.length > 0 && !cell.text ? "items-center justify-center" : ""}`}>
      {cell.images.map((image, index) => (
        <img
          key={`${image.src}-${index}`}
          src={resolveAssetPath(image.src)}
          alt={image.alt || ""}
          className="max-h-[320px] w-auto max-w-full rounded-[8px] object-contain mx-auto"
          loading="lazy"
        />
      ))}
      {cell.text && <CellText text={cell.text} />}
    </div>
  );
}

function CellText({ text }: { text: string }) {
  if (text.includes("\t")) {
    if (isPinTableText(text)) return <PinTable text={text} />;

    const rows = text.split("\n").filter(Boolean).map((line) => line.split("\t"));

    return (
      <table className="w-full border-collapse text-[13px] leading-[1.45]">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border border-[#e4e7ec] px-[8px] py-[6px] text-left align-top ${
                    rowIndex === 0 ? "bg-[#f7f8fa] text-[#4b5563]" : ""
                  }`}
                  style={{ fontWeight: rowIndex === 0 ? 600 : 400 }}
                >
                  {renderInlineContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length >= 3 && !lines[0].startsWith("①")) {
    const [lead, ...items] = lines;

    return (
      <div className="leading-[1.55]">
        <div>{renderInlineContent(lead)}</div>
        <ul className="mt-[8px] list-disc pl-[20px] space-y-[5px] marker:text-[#345bb4]">
          {items.map((item, index) => (
            <li key={index} className="pl-[2px]">
              {renderInlineContent(item)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="whitespace-pre-line leading-[1.55]">
      {renderInlineContent(text)}
    </div>
  );
}

function isPinTableText(text: string) {
  return (
    text.startsWith("Pin No.\tSignal name\tDescription") ||
    text.startsWith("Pin\tSignal\tDescription")
  );
}

function PinTable({ text }: { text: string }) {
  const [headerLine, ...bodyLines] = text.split("\n").filter(Boolean);
  const headers = headerLine.split("\t");
  const rows = bodyLines.map((line) => {
    const [pin = "", signal = "", description = ""] = line.split("\t");
    return { pin, signal, description };
  });
  const mdiRows = rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => row.signal.startsWith("MDI"));
  const mdi0Rows = mdiRows.filter(({ row }) => row.signal.startsWith("MDI0"));
  const remainingMdiRows = mdiRows.filter(({ row }) => !row.signal.startsWith("MDI0"));

  return (
    <table className="w-full border-collapse text-[13px] leading-[1.45]">
      <thead>
        <tr>
          {headers.slice(0, 2).map((header) => (
            <th
              key={header}
              className="border border-[#dcdfe5] bg-[#f7f8fa] px-[8px] py-[8px] text-left text-[#4b5563]"
              style={{ fontWeight: 600 }}
            >
              {header}
            </th>
          ))}
          <th
            colSpan={2}
            className="border border-[#dcdfe5] bg-[#f7f8fa] px-[8px] py-[8px] text-left text-[#4b5563]"
            style={{ fontWeight: 600 }}
          >
            {headers[2] ?? "Description"}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const isMdi0Start = mdi0Rows[0]?.index === index;
          const isMdi2Start = rows[index]?.signal === "MDI2_N";
          const isMdiRow = mdiRows.some((item) => item.index === index);
          const isTopRightEthernetRow = ["MDI0_N", "MDI0_P", "MDI1_N", "MDI1_P"].includes(row.signal);
          const isNotUsedRow = ["MDI2_N", "MDI2_P", "MDI3_N", "MDI3_P"].includes(row.signal);

          return (
            <tr key={`${row.pin}-${row.signal}`}>
              <td className="border border-[#dcdfe5] px-[8px] py-[8px] text-left align-middle">
                {renderInlineContent(row.pin)}
              </td>
              <td className="border border-[#dcdfe5] px-[8px] py-[8px] text-left align-middle">
                {renderInlineContent(row.signal)}
              </td>
              {isMdi0Start ? (
                <>
                  <td
                    rowSpan={mdiRows.length}
                    className="border border-[#dcdfe5] px-[8px] py-[8px] text-left align-top"
                  >
                    <span className="whitespace-pre-line">Ethernet{"\n"}1000BASE-T</span>
                  </td>
                  <td
                    rowSpan={4}
                    className="border border-[#dcdfe5] px-[8px] py-[8px] text-left align-top"
                  >
                    <span className="whitespace-pre-line">Ethernet{"\n"}100BASE-TX</span>
                  </td>
                </>
              ) : isMdi2Start ? (
                <td
                  rowSpan={4}
                  className="border border-[#dcdfe5] px-[8px] py-[8px] text-left align-middle"
                >
                  <span className="whitespace-pre-line">Not used in{"\n"}100BASE-TX</span>
                </td>
              ) : isMdiRow || isTopRightEthernetRow || isNotUsedRow ? null : (
                <td
                  colSpan={2}
                  className="border border-[#dcdfe5] px-[8px] py-[8px] text-left align-middle"
                >
                  {renderInlineContent(row.description)}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ImageGrid({ images, caption }: { images: ManualImage[]; caption?: string }) {
  if (!images.length) return null;
  const hasMultipleImages = images.length > 1;

  return (
    <figure className="my-[6px]">
      <div className={`grid gap-[14px] ${hasMultipleImages ? "sm:grid-cols-2" : ""}`}>
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`flex items-center justify-center rounded-[12px] border border-[#f0f0f0] bg-[#fafafa] overflow-hidden ${
              hasMultipleImages ? "h-[260px] lg:h-[320px]" : ""
            }`}
          >
            <img
              src={resolveAssetPath(image.src)}
              alt={image.alt || caption || ""}
              className={hasMultipleImages ? "h-full w-full object-contain" : "w-full max-h-[520px] object-contain"}
              loading="lazy"
            />
          </div>
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

function resolveAssetPath(src: string) {
  if (!src.startsWith("/")) return src;
  return `${assetBase.replace(/\/$/, "")}${src}`;
}

function renderInlineContent(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="bg-[#f0f0f0] text-[#c0392b] px-[5px] py-[2px] rounded-[4px] text-[0.92em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={index}>{linkifyText(part)}</span>;
  });
}

function linkifyText(text: string) {
  const pattern = /((?:https?:\/\/)[^\s)]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    const value = match[0];
    const href = value.startsWith("http") ? value : `mailto:${value}`;
    nodes.push(
      <a
        key={`${value}-${match.index}`}
        href={href}
        target={value.startsWith("http") ? "_blank" : undefined}
        rel={value.startsWith("http") ? "noreferrer" : undefined}
        className="text-[#345bb4] underline decoration-[#345bb4]/35 underline-offset-[3px] hover:decoration-[#345bb4]"
      >
        {value}
      </a>
    );

    lastIndex = match.index + value.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}
