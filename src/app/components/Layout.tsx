import svgPaths from "../../imports/svg-c6pkhq2x9i";
import { useState, useEffect, useRef } from "react";
import { Search, X, AlignLeft } from "lucide-react";

export const font = "'Plus Jakarta Sans', sans-serif";

export interface SearchEntry {
  id: string;
  title: string;
  breadcrumb: string;
  snippet?: string;
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <>
      <span>{text.slice(0, idx)}</span>
      <span className="text-[#345bb4] bg-[#eef2ff] rounded-[3px] px-[1px]">{text.slice(idx, idx + query.length)}</span>
      <span>{text.slice(idx + query.length)}</span>
    </>
  );
}

function filterSearch(entries: SearchEntry[], q: string) {
  if (!q.trim()) return [];
  const lower = q.toLowerCase();
  return entries.filter((entry) =>
    entry.title.toLowerCase().includes(lower) ||
    entry.breadcrumb.toLowerCase().includes(lower) ||
    (entry.snippet?.toLowerCase().includes(lower) ?? false)
  );
}

// --- Desktop Inline Search Bar ---
function NavSearch({ searchEntries }: { searchEntries: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = filterSearch(searchEntries, query);

  useEffect(() => { setSelected(0); }, [query]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.children[selected] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navigate = (id: string) => {
    setOpen(false);
    setQuery("");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && results[selected]) { navigate(results[selected].id); }
    if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
  };

  return (
    <div ref={containerRef} className="relative hidden lg:block w-[320px] shrink-0">
      <div className={`flex items-center gap-[12px] h-[48px] bg-white rounded-full border px-[20px] transition-colors duration-200 ${open ? "border-[#345bb4] shadow-[0_0_0_3px_rgba(52,91,180,0.10)]" : "border-[#cbcbcc] hover:border-[#999]"}`}>
        <Search size={18} className="text-[#888] shrink-0" strokeWidth={2} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search by keywords"
          className="flex-1 text-[15px] text-[#141414] placeholder-[#cbcbcc] outline-none bg-transparent tracking-[-0.15px] leading-[1.3]"
          style={{ fontFamily: font }}
        />
        {query && (
          <button
            onMouseDown={(e) => { e.preventDefault(); setQuery(""); setOpen(false); }}
            className="text-[#bbb] hover:text-[#666] transition-colors cursor-pointer text-[18px] leading-none"
          >
            ×
          </button>
        )}
      </div>
      {open && query.trim() && (
        <div className="absolute top-[56px] left-0 w-full min-w-[440px] bg-white rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.14)] border border-[#f0f0f0] overflow-hidden z-[200]">
          {results.length === 0 ? (
            <div className="px-[20px] py-[32px] text-center">
              <p className="text-[#999] text-[14px] tracking-[-0.14px]">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-[#ccc] text-[12px] tracking-[-0.12px] mt-[4px]">Try a different keyword</p>
            </div>
          ) : (
            <ul ref={listRef} className="max-h-[400px] overflow-y-auto py-[8px]">
              {results.map((entry, i) => (
                <li
                  key={entry.id}
                  onMouseDown={() => navigate(entry.id)}
                  onMouseEnter={() => setSelected(i)}
                  className={`px-[20px] py-[12px] cursor-pointer transition-colors ${i === selected ? "bg-[#f0f4ff]" : "hover:bg-[#fafafa]"}`}
                >
                  <div className="text-[11px] text-[#aaa] tracking-[-0.11px] mb-[2px]">{entry.breadcrumb}</div>
                  <div className="text-[14px] text-[#141414] tracking-[-0.14px]" style={{ fontWeight: 500 }}>
                    {highlightMatch(entry.title, query)}
                  </div>
                  {entry.snippet && (
                    <div className="text-[12px] text-[#999] tracking-[-0.12px] mt-[2px] line-clamp-1">
                      {highlightMatch(entry.snippet, query)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="px-[20px] py-[10px] border-t border-[#f5f5f5] flex gap-[12px] items-center">
            <span className="text-[11px] text-[#ccc] tracking-[-0.11px]">
              <kbd className="bg-[#f5f5f7] border border-[#e8e8e8] rounded-[4px] px-[5px] py-[1px] text-[10px]">↑</kbd>{" "}
              <kbd className="bg-[#f5f5f7] border border-[#e8e8e8] rounded-[4px] px-[5px] py-[1px] text-[10px]">↓</kbd>{" "}
              navigate &nbsp;·&nbsp;{" "}
              <kbd className="bg-[#f5f5f7] border border-[#e8e8e8] rounded-[4px] px-[5px] py-[1px] text-[10px]">↵</kbd>{" "}
              select &nbsp;·&nbsp;{" "}
              <kbd className="bg-[#f5f5f7] border border-[#e8e8e8] rounded-[4px] px-[5px] py-[1px] text-[10px]">ESC</kbd>{" "}
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Mobile Full-Screen Search Overlay ---
function MobileSearchOverlay({ onClose, searchEntries }: { onClose: () => void; searchEntries: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = filterSearch(searchEntries, query);

  useEffect(() => { setSelected(0); }, [query]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.children[selected] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  // Auto-focus input
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const navigate = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && results[selected]) { navigate(results[selected].id); }
    if (e.key === "Escape") { onClose(); }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col" style={{ fontFamily: font }}>
      {/* Search bar */}
      <div className="flex items-center gap-[12px] px-[16px] h-[64px] border-b border-[#f0f0f0] shrink-0">
        <Search size={20} className="text-[#888] shrink-0" strokeWidth={2} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder="Search by keywords"
          className="flex-1 text-[16px] text-[#141414] placeholder-[#cbcbcc] outline-none bg-transparent tracking-[-0.15px]"
          style={{ fontFamily: font }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-[#bbb] hover:text-[#666] transition-colors cursor-pointer p-[4px]"
          >
            <X size={18} />
          </button>
        )}
        <button
          onClick={onClose}
          className="text-[#555] hover:text-[#141414] transition-colors cursor-pointer ml-[4px] text-[15px] tracking-[-0.15px]"
          style={{ fontWeight: 500 }}
        >
          Cancel
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {!query.trim() ? (
          <div className="px-[20px] py-[48px] text-center">
            <p className="text-[#bbb] text-[15px] tracking-[-0.15px]">Type to search documentation…</p>
          </div>
        ) : results.length === 0 ? (
          <div className="px-[20px] py-[48px] text-center">
            <p className="text-[#999] text-[15px] tracking-[-0.15px]">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-[#ccc] text-[13px] tracking-[-0.13px] mt-[6px]">Try a different keyword</p>
          </div>
        ) : (
          <ul ref={listRef} className="py-[8px]">
            {results.map((entry, i) => (
              <li
                key={entry.id}
                onClick={() => navigate(entry.id)}
                onMouseEnter={() => setSelected(i)}
                className={`px-[20px] py-[14px] cursor-pointer transition-colors border-b border-[#f8f8f8] ${i === selected ? "bg-[#f0f4ff]" : "active:bg-[#f5f5f7]"}`}
              >
                <div className="text-[11px] text-[#aaa] tracking-[-0.11px] mb-[3px]">{entry.breadcrumb}</div>
                <div className="text-[15px] text-[#141414] tracking-[-0.15px]" style={{ fontWeight: 500 }}>
                  {highlightMatch(entry.title, query)}
                </div>
                {entry.snippet && (
                  <div className="text-[13px] text-[#999] tracking-[-0.13px] mt-[3px] line-clamp-2">
                    {highlightMatch(entry.snippet, query)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SharpaLogo() {
  return (
    <svg className="h-[16px] w-[81px] lg:h-[32px] lg:w-[162px] cursor-pointer hover:opacity-70 transition-opacity duration-200" fill="none" viewBox="0 0 162 32.09">
      <g clipPath="url(#clip0_logo)">
        <path clipRule="evenodd" d={svgPaths.p30573200} fill="black" fillRule="evenodd" />
        <path d={svgPaths.p3ca17f70} fill="#DA401E" />
      </g>
      <defs>
        <clipPath id="clip0_logo">
          <rect fill="white" height="32.09" width="162" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Nav({ onMenuOpen, searchEntries = [] }: { onMenuOpen?: () => void; searchEntries?: SearchEntry[] }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#f5f5f7]/95 backdrop-blur-sm flex items-center justify-between px-[24px] lg:px-[40px] h-[64px] lg:h-[80px] w-full sticky top-0 z-50" style={{ fontFamily: font }}>
        <div className="flex items-center gap-[12px]">
          {/* Mobile menu button — left of logo */}
          <button
            onClick={onMenuOpen}
            className="lg:hidden p-[6px] -ml-[6px] text-[#222] hover:text-[#345bb4] transition-colors cursor-pointer"
          >
            <AlignLeft size={22} strokeWidth={2} />
          </button>
          <SharpaLogo />
        </div>
        <NavSearch searchEntries={searchEntries} />
        {/* Mobile search icon */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="lg:hidden p-[8px] -mr-[8px] text-[#222] hover:text-[#345bb4] transition-colors cursor-pointer"
        >
          <Search size={22} strokeWidth={2} />
        </button>
      </nav>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div className="lg:hidden">
          <MobileSearchOverlay onClose={() => setMobileSearchOpen(false)} searchEntries={searchEntries} />
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#f5f5f7] w-full flex items-center justify-center px-[24px] lg:px-[80px] py-[24px]" style={{ fontFamily: font }}>
      <div className="w-full max-w-[1600px] flex justify-center">
        <span className="text-[#222] text-[14px] lg:text-[16px] tracking-[-0.16px]">&copy; 2025 Sharpa. All rights reserved.</span>
      </div>
    </footer>
  );
}