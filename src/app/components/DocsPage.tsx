import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, List, X } from "lucide-react";
import { Footer, Nav, font } from "./Layout";
import { ManualRenderer } from "./docs/ManualRenderer";
import {
  getActiveSectionId,
  getAllManualIds,
  getSearchEntries,
  getSectionHeadings,
  manualContent,
  type ManualSection,
} from "../content/manual";

export default function DocsPage() {
  const firstSectionId = manualContent.sections[0]?.id ?? "";
  const [activeId, setActiveId] = useState(firstSectionId);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const suppressObserverRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allIds = useMemo(() => getAllManualIds(), []);
  const searchEntries = useMemo(() => getSearchEntries(), []);
  const activeSectionId = getActiveSectionId(activeId);
  const activeSection =
    manualContent.sections.find((section) => section.id === activeSectionId) ??
    manualContent.sections[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return;
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;

        const sorted = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActiveId(sorted[0].target.id);
      },
      { rootMargin: "-120px 0px -62% 0px", threshold: 0 }
    );

    allIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [allIds]);

  const handleNavigate = (id: string) => {
    setActiveId(id);
    suppressObserverRef.current = true;

    if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = setTimeout(() => {
      suppressObserverRef.current = false;
    }, 1000);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white flex flex-col min-h-screen w-full" style={{ fontFamily: font }}>
      <Nav onMenuOpen={() => setMobileNavOpen(true)} searchEntries={searchEntries} />

      <MobileCurrentSectionBar
        activeSection={activeSection}
        onOpenToc={() => setMobileTocOpen(true)}
      />

      <MobileGlobalNavDrawer
        open={mobileNavOpen}
        activeSectionId={activeSectionId}
        onClose={() => setMobileNavOpen(false)}
        onNavigate={handleNavigate}
      />

      <MobileTocDrawer
        open={mobileTocOpen}
        activeId={activeId}
        section={activeSection}
        onClose={() => setMobileTocOpen(false)}
        onNavigate={handleNavigate}
      />

      <div className="flex flex-1">
        <GlobalNavSidebar activeSectionId={activeSectionId} onNavigate={handleNavigate} />
        <div className="flex-1 min-w-0 flex flex-col">
          <section className="flex-1 w-full flex items-start xl:pr-[40px] py-[36px] lg:py-[72px]">
            <div className="flex-1 min-w-0 flex justify-center px-[24px] lg:px-[40px]">
              <div className="w-full max-w-[880px]">
                <PageHeader />
                <ManualRenderer sections={manualContent.sections} />
              </div>
            </div>
            <DocsTocRightSidebar
              activeId={activeId}
              section={activeSection}
              onNavigate={handleNavigate}
            />
          </section>
          <Footer />
        </div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="mb-[44px] lg:mb-[64px]">
      <p className="text-[#9b9b9b] tracking-[-0.14px] leading-[1.3] mb-[8px] text-[13px] lg:text-[17px]">
        {manualContent.updatedAt}
      </p>
      <h1 className="text-[#141414] leading-[1.2] text-[30px] lg:text-[48px]" style={{ fontWeight: 650, letterSpacing: "-0.035em" }}>
        {manualContent.title}
      </h1>
      <p className="text-[#222] leading-[1.55] mt-[12px] text-[15px] lg:text-[17px]" style={{ letterSpacing: "-0.01em" }}>
        {manualContent.intro}
      </p>
      <div className="w-full h-px bg-[#e0e0e0] mt-[28px] lg:mt-[40px]" />
    </header>
  );
}

function GlobalNavSidebar({
  activeSectionId,
  onNavigate,
}: {
  activeSectionId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <aside className="hidden lg:block w-[248px] xl:w-[288px] shrink-0 border-r border-[#f0f0f0] bg-[#fbfbfc] sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto">
      <div className="px-[24px] xl:px-[32px] py-[32px]">
        <p className="text-[12px] uppercase tracking-[0.12em] text-[#9b9b9b] mb-[18px]">
          Manual
        </p>
        <nav className="flex flex-col gap-[4px]">
          {manualContent.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`group flex items-center justify-between gap-[12px] rounded-[10px] px-[12px] py-[10px] text-left text-[15px] leading-[1.35] transition-colors cursor-pointer ${
                activeSectionId === section.id
                  ? "bg-white text-[#345bb4] shadow-[0_1px_10px_rgba(0,0,0,0.05)]"
                  : "text-[#3f3f46] hover:bg-white hover:text-[#141414]"
              }`}
              style={{ fontWeight: activeSectionId === section.id ? 600 : 500 }}
            >
              <span>{section.title}</span>
              <ChevronRight
                size={15}
                className={`shrink-0 transition-transform ${activeSectionId === section.id ? "translate-x-[2px]" : "opacity-0 group-hover:opacity-100"}`}
              />
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function DocsTocRightSidebar({
  activeId,
  section,
  onNavigate,
}: {
  activeId: string;
  section?: ManualSection;
  onNavigate: (id: string) => void;
}) {
  if (!section) return null;
  const headings = getSectionHeadings(section);

  return (
    <aside className="hidden xl:block w-[280px] shrink-0 sticky top-[112px] max-h-[calc(100vh-136px)] overflow-y-auto pr-[12px]">
      <p className="text-[12px] uppercase tracking-[0.12em] text-[#9b9b9b] mb-[16px]">
        On this page
      </p>
      <button
        onClick={() => onNavigate(section.id)}
        className={`w-full text-left text-[14px] leading-[1.45] mb-[8px] transition-colors cursor-pointer ${
          activeId === section.id ? "text-[#345bb4]" : "text-[#666] hover:text-[#141414]"
        }`}
        style={{ fontWeight: activeId === section.id ? 600 : 500 }}
      >
        {section.title}
      </button>
      <nav className="flex flex-col border-l border-[#eeeeee]">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => onNavigate(heading.id)}
            className={`text-left text-[13px] leading-[1.45] py-[6px] pr-[8px] transition-colors cursor-pointer border-l -ml-px ${
              activeId === heading.id
                ? "text-[#345bb4] border-[#345bb4]"
                : "text-[#777] border-transparent hover:text-[#141414]"
            }`}
            style={{
              paddingLeft: `${Math.max(12, (heading.level - 1) * 10)}px`,
              fontWeight: activeId === heading.id ? 600 : 400,
            }}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function MobileCurrentSectionBar({
  activeSection,
  onOpenToc,
}: {
  activeSection?: ManualSection;
  onOpenToc: () => void;
}) {
  return (
    <div className="lg:hidden sticky top-[64px] z-[40] bg-white border-b border-[#f0f0f0] px-[20px] h-[48px] flex items-center justify-between shrink-0">
      <span className="text-[#888] text-[13px] tracking-[-0.13px] truncate mr-[12px] min-w-0">
        {activeSection?.title ?? "Manual"}
      </span>
      <button
        onClick={onOpenToc}
        className="flex items-center gap-[5px] text-[#345bb4] text-[13px] tracking-[-0.13px] shrink-0 cursor-pointer"
        style={{ fontWeight: 500 }}
      >
        <List size={15} strokeWidth={2} />
        Contents
      </button>
    </div>
  );
}

function MobileGlobalNavDrawer({
  open,
  activeSectionId,
  onClose,
  onNavigate,
}: {
  open: boolean;
  activeSectionId: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[100] lg:hidden" onClick={onClose} />
      <div className="fixed top-0 left-0 h-full z-[110] bg-white flex flex-col shadow-2xl lg:hidden" style={{ width: "min(85vw, 340px)", fontFamily: font }}>
        <DrawerHeader title="Manual" onClose={onClose} />
        <nav className="flex-1 overflow-y-auto py-[12px] px-[16px]">
          {manualContent.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                onNavigate(section.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between rounded-[10px] px-[12px] py-[12px] text-left text-[15px] transition-colors cursor-pointer ${
                activeSectionId === section.id
                  ? "bg-[#f0f4ff] text-[#345bb4]"
                  : "text-[#222] active:bg-[#f5f5f7]"
              }`}
              style={{ fontWeight: activeSectionId === section.id ? 600 : 500 }}
            >
              {section.title}
              <ChevronRight size={15} />
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

function MobileTocDrawer({
  open,
  activeId,
  section,
  onClose,
  onNavigate,
}: {
  open: boolean;
  activeId: string;
  section?: ManualSection;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  if (!open || !section) return null;
  const headings = getSectionHeadings(section);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[100] lg:hidden" onClick={onClose} />
      <div className="fixed top-0 left-0 h-full z-[110] bg-white flex flex-col shadow-2xl lg:hidden" style={{ width: "min(88vw, 360px)", fontFamily: font }}>
        <DrawerHeader title="Contents" onClose={onClose} />
        <div className="px-[20px] pt-[16px] pb-[10px] text-[#141414] text-[17px]" style={{ fontWeight: 600 }}>
          {section.title}
        </div>
        <nav className="flex-1 overflow-y-auto py-[8px] px-[12px]">
          <button
            onClick={() => {
              onNavigate(section.id);
              onClose();
            }}
            className={`w-full rounded-[8px] px-[12px] py-[10px] text-left text-[14px] cursor-pointer ${
              activeId === section.id ? "bg-[#f0f4ff] text-[#345bb4]" : "text-[#444]"
            }`}
          >
            Overview
          </button>
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => {
                onNavigate(heading.id);
                onClose();
              }}
              className={`w-full rounded-[8px] py-[9px] pr-[10px] text-left text-[14px] leading-[1.45] cursor-pointer ${
                activeId === heading.id ? "bg-[#f0f4ff] text-[#345bb4]" : "text-[#444] active:bg-[#f5f5f7]"
              }`}
              style={{
                paddingLeft: `${Math.max(12, (heading.level - 1) * 12)}px`,
                fontWeight: activeId === heading.id ? 600 : 400,
              }}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

function DrawerHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-[20px] py-[20px] border-b border-[#f0f0f0] shrink-0">
      <span className="text-[#141414] text-[17px]" style={{ fontWeight: 600 }}>
        {title}
      </span>
      <button onClick={onClose} className="text-[#888] hover:text-[#222] transition-colors p-[4px] cursor-pointer">
        <X size={20} />
      </button>
    </div>
  );
}
