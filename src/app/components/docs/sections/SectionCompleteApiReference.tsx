import { CodeBlock } from "../DocBlocks";

export function SectionCompleteApiReference() {
  return (
    <div id="complete-api-reference" className="scroll-mt-[120px]">
      <h2 className="text-[#345bb4] text-[24px] lg:text-[32px] leading-[1.3] mb-[20px] lg:mb-[24px]" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
        Complete API reference
      </h2>
      <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[20px]">Open this file in the supplied USB flash drive:</p>
      <CodeBlock code={`SDK/SharpaWave_CompleteAPI_Reference/html/classsharpa_1_1SharpaWaveManager.html`} startLine={1} defaultCollapsed={false} />
    </div>
  );
}
