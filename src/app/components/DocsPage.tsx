import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, AlignLeft, X } from "lucide-react";
import { Nav, Footer, font } from "./Layout";
import { getActiveSectionTitle, getAllIds, pythonComingSoonChildren, tocData, type TocItem } from "../docs/content-config";
import { ComingSoonSection } from "./docs/sections/ComingSoonSection";
import { SectionCompleteApiReference } from "./docs/sections/SectionCompleteApiReference";
import { SectionConventions } from "./docs/sections/SectionConventions";
import { SectionCppApis } from "./docs/sections/SectionCppApis";

// --- TOC helpers ---
function containsId(item: TocItem, targetId: string): boolean {
  if (item.id === targetId) return true;
  return item.children?.some((c) => containsId(c, targetId)) ?? false;
}

function TocSidebarItem({
  item,
  activeId,
  onClick,
}: {
  item: TocItem;
  activeId: string;
  onClick: (id: string) => void;
}) {
  const isActive = activeId === item.id;
  const isExpanded = containsId(item, activeId);
  const isHighlighted = isActive || (item.level === 0 && isExpanded);

  // Level 0: no number. Level 1: "1. Title". Level 2: "1.1 Title"
  const label =
    item.level === 0
      ? item.title
      : item.level === 1
      ? `${item.number}. ${item.title}`
      : `${item.number} ${item.title}`;

  const baseClass = "cursor-pointer transition-colors duration-200 leading-[1.3]";

  let levelClass = "";
  let fontWeight = 400;

  if (item.level === 0) {
    levelClass = "text-[17px] tracking-[-0.17px] py-[9px] px-[12px] rounded-[8px]";
    fontWeight = isHighlighted ? 600 : 500;
  } else if (item.level === 1) {
    levelClass = "text-[15px] tracking-[-0.15px] py-[6px] pl-[12px] pr-[12px]";
    fontWeight = isActive ? 600 : 400;
  } else if (item.level === 2) {
    levelClass = "text-[13px] tracking-[-0.13px] py-[5px] pl-[24px] pr-[12px]";
    fontWeight = isActive ? 500 : 400;
  }

  const colorClass = isActive
    ? "text-[#345bb4]"
    : isHighlighted
    ? "text-[#345bb4]"
    : "text-[#777] hover:text-[#222]";

  return (
    <div className={item.level === 0 ? "mt-[4px] first:mt-0" : ""}>
      <div
        onClick={() => onClick(item.id)}
        className={`${baseClass} ${levelClass} ${colorClass} text-[16px] flex items-center justify-between gap-[6px]`}
        style={{ fontWeight }}
      >
        <span className="flex-1 min-w-0">{label}</span>
        {item.children && item.children.length > 0 && (
          isExpanded
            ? <ChevronDown size={18} className="shrink-0" />
            : <ChevronRight size={18} className="shrink-0" />
        )}
      </div>
      {item.children && isExpanded && (
        <div className="mt-[2px] mb-[2px]">
          {item.children.map((child) => (
            <TocSidebarItem key={child.id} item={child} activeId={activeId} onClick={onClick} />
          ))}
        </div>
      )}
    </div>
  );
}

function DocsSidebar({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
  return (
    <aside className="hidden lg:block w-[380px] shrink-0 sticky top-[100px]" style={{ fontFamily: font, maxHeight: "calc(100vh - 120px)" }}>
      <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[16px] p-[16px] overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
        <div className="flex flex-col gap-[0px]">
          {tocData.map((item) => (
            <TocSidebarItem key={item.id} item={item} activeId={activeId} onClick={onNavigate} />
          ))}
        </div>
      </div>
    </aside>
  );
}

// --- Mobile TOC Drawer ---
function MobileTocDrawer({
  open,
  onClose,
  activeId,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[100] lg:hidden" onClick={onClose} />
      <div
        className="fixed top-0 left-0 h-full z-[110] bg-white flex flex-col shadow-2xl lg:hidden"
        style={{ width: "min(85vw, 340px)", fontFamily: font }}
      >
        <div className="flex items-center justify-between px-[20px] py-[20px] border-b border-[#f0f0f0] shrink-0">
          <span className="text-[#141414] text-[17px] tracking-[-0.17px]" style={{ fontWeight: 600 }}>
            Contents
          </span>
          <button onClick={onClose} className="text-[#888] hover:text-[#222] transition-colors p-[4px] cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 py-[12px] px-[8px]">
          {tocData.map((item) => (
            <TocSidebarItem
              key={item.id}
              item={item}
              activeId={activeId}
              onClick={(id) => { onNavigate(id); onClose(); }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function DocsPage() {
  const [activeId, setActiveId] = useState("conventions");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const suppressObserverRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const allIds = getAllIds(tocData);
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const sorted = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );
    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    setActiveId(id);
    suppressObserverRef.current = true;
    if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = setTimeout(() => {
      suppressObserverRef.current = false;
    }, 1000);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeSectionTitle = getActiveSectionTitle(activeId);

  return (
    <div className="bg-white flex flex-col min-h-screen w-full" style={{ fontFamily: font }}>
      <Nav />

      {/* Mobile TOC bar — sticky below nav */}
      <div className="lg:hidden sticky top-[64px] z-[40] bg-white border-b border-[#f0f0f0] px-[20px] h-[48px] flex items-center justify-between shrink-0">
        <span className="text-[#888] text-[13px] tracking-[-0.13px] truncate mr-[12px] min-w-0">
          {activeSectionTitle}
        </span>
        <button
          onClick={() => setMobileTocOpen(true)}
          className="flex items-center gap-[5px] text-[#345bb4] text-[13px] tracking-[-0.13px] shrink-0 cursor-pointer"
          style={{ fontWeight: 500 }}
        >
          <AlignLeft size={15} strokeWidth={2} />
          Contents
        </button>
      </div>

      <MobileTocDrawer
        open={mobileTocOpen}
        onClose={() => setMobileTocOpen(false)}
        activeId={activeId}
        onNavigate={handleNavigate}
      />

      {/* Content */}
      <section className="w-full flex justify-center px-[20px] lg:px-[160px] py-[36px] lg:py-[80px]">
        <div className="flex gap-[60px] items-start w-full max-w-[1600px] justify-center">
          <DocsSidebar activeId={activeId} onNavigate={handleNavigate} />
          <div ref={contentRef} className="flex-1 min-w-0 max-w-[980px]">
            {/* Header info */}
            <div className="mb-[36px] lg:mb-[56px]">
              <p className="text-[#9b9b9b] tracking-[-0.14px] leading-[1.3] mb-[8px] text-[13px] lg:text-[17px]">Update on 19 Jun 2025</p>
              <h1 className="text-[#141414] leading-[1.2] text-[28px] lg:text-[44px]" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
                SharpaWave SDK
              </h1>
              <p className="text-[#222] leading-[1.5] mt-[10px] text-[15px] lg:text-[17px]" style={{ letterSpacing: "-0.01em" }}>
                The examples of whole-hand control and tactile visualization are in the &ldquo;How-to guides&rdquo; section of SharpaWave: User Manual.
              </p>
              <div className="w-full h-px bg-[#e0e0e0] mt-[28px] lg:mt-[40px]" />
            </div>
            <SectionConventions />
            <SectionCppApis />
            <ComingSoonSection id="commonly-used-apis-python" title="Commonly used APIs (Python)" children={pythonComingSoonChildren} />
            <SectionCompleteApiReference />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}