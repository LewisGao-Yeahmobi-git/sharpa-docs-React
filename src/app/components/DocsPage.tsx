import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const waveSections = manualContent.sections.filter((section) => section.title !== "North");
  const northSection = manualContent.sections.find((section) => section.title === "North");
  const isWaveActive = activeSectionId !== northSection?.id;

  return (
    <aside className="hidden lg:block w-[248px] xl:w-[288px] shrink-0 border-r border-[#eeeeee] bg-white sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto">
      <div className="px-[24px] xl:px-[32px] py-[24px]">
        <p className="text-[#141414] text-[14px] leading-[1.35] pb-[16px] border-b border-[#eeeeee]" style={{ fontWeight: 650 }}>
          User Manual
        </p>
        <nav className="flex flex-col py-[10px]">
          <button
            onClick={() => waveSections[0] && onNavigate(waveSections[0].id)}
            className={`w-full px-0 py-[10px] text-left text-[14px] leading-[1.35] transition-colors cursor-pointer ${
              isWaveActive ? "text-[#345bb4]" : "text-[#141414] hover:text-[#345bb4]"
            }`}
            style={{ fontWeight: isWaveActive ? 650 : 600 }}
          >
            <span>{manualContent.title}</span>
          </button>
          <div className="flex flex-col pb-[8px]">
            {waveSections.map((section) => {
            const isActive = activeSectionId === section.id;

            return (
              <div key={section.id}>
                <button
                  onClick={() => onNavigate(section.id)}
                  className={`w-full py-[8px] pl-[14px] text-left text-[12px] leading-[1.35] transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#345bb4]"
                      : "text-[#555] hover:text-[#345bb4]"
                  }`}
                  style={{ fontWeight: isActive ? 650 : 500 }}
                >
                  <span>{section.title}</span>
                </button>
              </div>
            );
            })}
          </div>
          {northSection && (
            <button
              onClick={() => onNavigate(northSection.id)}
              className={`w-full px-0 py-[10px] text-left text-[14px] leading-[1.35] transition-colors cursor-pointer ${
                activeSectionId === northSection.id
                  ? "text-[#345bb4]"
                  : "text-[#141414] hover:text-[#345bb4]"
              }`}
              style={{ fontWeight: activeSectionId === northSection.id ? 650 : 600 }}
            >
              <span>{northSection.title}</span>
            </button>
          )}
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
  const tocItems = [
    { id: section.id, text: section.title, level: 1 },
    ...headings.map((heading) => ({
      id: heading.id,
      text: heading.text,
      level: heading.level,
    })),
  ];

  return (
    <aside className="hidden xl:block w-[280px] shrink-0 sticky top-[112px] max-h-[calc(100vh-136px)] overflow-y-auto rounded-[16px] bg-[#fbfbfc] px-[20px] py-[20px]">
      <p className="text-[13px] tracking-[-0.13px] text-[#141414] mb-[18px]" style={{ fontWeight: 650 }}>
        On this page
      </p>
      <nav className="relative flex flex-col gap-[2px]">
        <span className="absolute left-[10px] top-[10px] bottom-[10px] w-px bg-[#e3e3e3]" />
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          const depth = Math.max(0, item.level - 1);
          const markerSize = item.level <= 2 ? 8 : item.level === 3 ? 6 : 5;
          const textSize =
            item.level <= 2 ? "text-[13px]" : item.level === 3 ? "text-[12px]" : "text-[11px]";

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative flex w-full items-start gap-[12px] text-left ${textSize} leading-[1.45] py-[6px] pr-[8px] transition-colors cursor-pointer ${
                isActive
                  ? "text-[#345bb4]"
                  : "text-[#777] hover:text-[#141414]"
              }`}
              style={{ fontWeight: isActive ? 600 : 400 }}
            >
              <span className="relative flex h-[20px] w-[22px] shrink-0 justify-center">
                {isActive && (
                  <span className="absolute top-[-6px] bottom-[-6px] w-px bg-[#345bb4]" />
                )}
                <span
                  className={`relative z-10 mt-[6px] rounded-full ${isActive ? "bg-[#345bb4]" : "bg-[#e2e2e2] group-hover:bg-[#cfcfcf]"}`}
                  style={{
                    height: `${isActive ? Math.max(10, markerSize + 2) : markerSize}px`,
                    width: `${isActive ? Math.max(10, markerSize + 2) : markerSize}px`,
                  }}
                />
              </span>
              <span style={{ paddingLeft: `${depth * 10}px` }}>{item.text}</span>
            </button>
          );
        })}
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
