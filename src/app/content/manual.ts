import rawContent from "./manualContent.json";

export interface ManualImage {
  src: string;
  alt?: string;
}

export interface ManualTableCell {
  text: string;
  images: ManualImage[];
}

export type ManualBlock =
  | { type: "heading"; level: number; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "table"; rows: ManualTableCell[][] }
  | { type: "imageGrid"; images: ManualImage[]; caption?: string };

export interface ManualSection {
  id: string;
  title: string;
  blocks: ManualBlock[];
}

export interface ManualContent {
  title: string;
  updatedAt: string;
  intro: string;
  sections: ManualSection[];
}

export interface SearchEntry {
  id: string;
  title: string;
  breadcrumb: string;
  snippet?: string;
}

export const manualContent = rawContent as ManualContent;

export function getSectionHeadings(section: ManualSection) {
  return section.blocks.filter(
    (block): block is Extract<ManualBlock, { type: "heading" }> =>
      block.type === "heading"
  );
}

export function getAllManualIds() {
  return manualContent.sections.flatMap((section) => [
    section.id,
    ...getSectionHeadings(section).map((heading) => heading.id),
  ]);
}

export function getActiveSectionId(activeId: string) {
  return (
    manualContent.sections.find((section) => {
      if (section.id === activeId) return true;
      return getSectionHeadings(section).some((heading) => heading.id === activeId);
    })?.id ?? manualContent.sections[0]?.id
  );
}

export function getSearchEntries(): SearchEntry[] {
  return manualContent.sections.flatMap((section) => {
    const sectionEntry: SearchEntry = {
      id: section.id,
      title: section.title,
      breadcrumb: manualContent.title,
      snippet: firstTextSnippet(section),
    };

    return [
      sectionEntry,
      ...getSectionHeadings(section).map((heading) => ({
        id: heading.id,
        title: heading.text,
        breadcrumb: section.title,
        snippet: nearbyTextSnippet(section, heading.id),
      })),
    ];
  });
}

function firstTextSnippet(section: ManualSection) {
  const block = section.blocks.find(
    (item) => item.type === "paragraph" || item.type === "list"
  );

  if (!block) return undefined;
  if (block.type === "paragraph") return block.text;
  return block.items.join(", ");
}

function nearbyTextSnippet(section: ManualSection, headingId: string) {
  const headingIndex = section.blocks.findIndex(
    (block) => block.type === "heading" && block.id === headingId
  );
  if (headingIndex === -1) return undefined;

  for (const block of section.blocks.slice(headingIndex + 1)) {
    if (block.type === "heading") return undefined;
    if (block.type === "paragraph") return block.text;
    if (block.type === "list") return block.items.join(", ");
  }

  return undefined;
}
