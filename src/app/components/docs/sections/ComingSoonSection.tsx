import type { ComingSoonChild } from "../../../docs/content-config";

export function ComingSoonSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: ComingSoonChild[];
}) {
  return (
    <div id={id} className="scroll-mt-[120px] mb-[40px] lg:mb-[56px]">
      <h2 className="text-[#345bb4] text-[24px] lg:text-[32px] leading-[1.3] mb-[20px] lg:mb-[24px]" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[12px] px-[20px] lg:px-[32px] py-[28px] lg:py-[40px] flex items-center gap-[16px]">
        <div className="w-[8px] h-[8px] rounded-full bg-[#345bb4] opacity-40" />
        <p className="text-[#9b9b9b] text-[17px] tracking-[-0.17px] leading-[1.6]">Content coming soon. This section is currently being written.</p>
      </div>
      {children?.map((child) => (
        <div key={child.id} id={child.id} className="scroll-mt-[120px]" />
      ))}
    </div>
  );
}
