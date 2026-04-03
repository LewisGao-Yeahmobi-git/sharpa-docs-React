import { font } from "../../Layout";
import { CodeBlock } from "../DocBlocks";
import networkDiagram from "@/assets/network-diagram-placeholder.svg";

const vectorOrderCode = `[
    'thumb_CMC_FE',
    'thumb_CMC_AA',
    'thumb_MCP_FE',
    'thumb_MCP_AA',
    'thumb_IP',

    'index_MCP_FE',
    'index_MCP_AA',
    'index_PIP',
    'index_DIP',

    'middle_MCP_FE',
    'middle_MCP_AA',
    'middle_PIP',
    'middle_DIP',

    'ring_MCP_FE',
    'ring_MCP_AA',
    'ring_PIP',
    'ring_DIP',

    'pinky_CMC',
    'pinky_MCP_FE',
    'pinky_MCP_AA',
    'pinky_PIP',
    'pinky_DIP',
]`;

export function SectionConventions() {
  return (
    <div id="conventions" className="scroll-mt-[120px]">
      <h2 className="text-[#345bb4] text-[24px] lg:text-[32px] leading-[1.3] mb-[32px] lg:mb-[48px]" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
        Conventions
      </h2>

      <div id="order-of-vector-elements" className="scroll-mt-[120px] mb-[40px] lg:mb-[56px]">
        <h3 className="text-[#141414] leading-[1.3] mb-[16px] lg:mb-[20px] text-[19px] lg:text-[24px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
          <span className="text-[#141414] mr-[8px]" style={{ fontWeight: 700 }}>
            1.
          </span>
          Order of vector elements
        </h3>
        <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[24px]"></p>
        <CodeBlock code={vectorOrderCode} startLine={1} />
      </div>

      <div id="device-information" className="scroll-mt-[120px] mb-[40px] lg:mb-[56px]">
        <h3 className="text-[#141414] leading-[1.3] mb-[16px] lg:mb-[20px] text-[19px] lg:text-[24px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
          <span className="text-[#141414] mr-[8px]" style={{ fontWeight: 700 }}>
            2.
          </span>
          Device information
        </h3>
        <CodeBlock
          code={`- Control mode
- Control source
- Data transfer (format:
      "debug": {"target_ip": "192.168.10.255", "target_port": 50005, "transfer_mode": 0
      "heart": {"target_ip": "192.168.10.255", "target_port": 54321, "transfer_mode": 0
      "joint": {"target_ip": "192.168.10.255", "target_port": 50000, "transfer_mode": 0
      "tactile": {"target_ip": "192.168.10.240", "target_port": 50001, "transfer_mode":
      )
- Dvice type
- Firmware version
- Hand side
- IP (format: "192.168.10.10")
- MAC address (format: "00:1A:C2:7B:00:47")
- Manufacturer ("Sharpa")
- Serial number of the paired device (if applicable)
- Product name (i.e, "Wave01-A4")
- Serial number
- Status (format: "battery": 0, "error_joint": 268435456, "fault_code": 1857, "joint_lock
- TCP command port (default: 59999)
- UDP data port (default: 52400)
- SDK Version
- Active Status
- UDP error
- UDP error level
- Udp error msg`}
          startLine={1}
        />
      </div>

      <div id="network-configuration" className="scroll-mt-[120px] mb-[40px] lg:mb-[56px]">
        <h3 className="text-[#141414] leading-[1.3] mb-[16px] lg:mb-[20px] text-[19px] lg:text-[24px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
          <span className="text-[#141414] mr-[8px]" style={{ fontWeight: 700 }}>
            3.
          </span>
          Network configuration
        </h3>
        <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[24px]">Default settings:</p>

        <div className="overflow-x-auto mb-[20px] rounded-[12px] border border-[#e4e4e7]">
          <table className="w-full text-[13px] caption-bottom" style={{ fontFamily: font }}>
            <thead className="[&_tr]:border-b">
              <tr className="border-b border-[#e4e4e7] bg-[#f9fafb] transition-colors">
                <th className="h-[52px] px-[12px] text-left align-middle text-[#71717a] text-[12px] whitespace-nowrap" style={{ fontWeight: 500 }}>
                  Data Type
                </th>
                <th className="h-[52px] px-[12px] text-left align-middle text-[#71717a] text-[12px]" style={{ fontWeight: 500, maxWidth: 160 }}>
                  Communication
                  <br />
                  mode
                </th>
                <th className="h-[52px] px-[12px] text-left align-middle text-[#71717a] text-[12px]" style={{ fontWeight: 500 }}>
                  Source port
                  <br />
                  (hand)
                </th>
                <th className="h-[52px] px-[12px] text-left align-middle text-[#71717a] text-[12px]" style={{ fontWeight: 500 }}>
                  Receiving port
                  <br />
                  (host computer)
                </th>
                <th className="h-[52px] px-[12px] text-left align-middle text-[#71717a] text-[12px]" style={{ fontWeight: 500 }}>
                  Listening port
                  <br />
                  (hand)
                </th>
                <th className="h-[52px] px-[12px] text-left align-middle text-[#71717a] text-[12px]" style={{ fontWeight: 500 }}>
                  IP address
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="border-b border-[#e4e4e7] transition-colors group/row">
                <td className="px-[12px] py-[10px] align-middle text-[#09090b] whitespace-nowrap group-hover/row:bg-[#f9fafb]" style={{ fontWeight: 500 }}>
                  Joint data
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">Broadcast, multicast, or unicast</td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    10000
                  </code>
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  L:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50000
                  </code>
                  <br />
                  R:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50010
                  </code>
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  L:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50020
                  </code>
                  <br />
                  R:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50030
                  </code>
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] border-l border-[#e4e4e7]" rowSpan={5}>
                  <div className="space-y-[6px]">
                    <div>
                      <span className="text-[#71717a] text-[11px]">Left Hand</span>
                      <br />
                      <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        192.168.10.10
                      </code>
                    </div>
                    <div>
                      <span className="text-[#71717a] text-[11px]">Right Hand</span>
                      <br />
                      <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        192.168.10.20
                      </code>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#e4e4e7] transition-colors group/row">
                <td className="px-[12px] py-[10px] align-middle text-[#09090b] whitespace-nowrap group-hover/row:bg-[#f9fafb]" style={{ fontWeight: 500 }}>
                  Tactile data stream
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">Unicast</td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    10001–10005
                  </code>
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  L:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50011
                  </code>
                  <br />
                  R:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50001
                  </code>
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#71717a] border-l border-[#e4e4e7]" rowSpan={4}>
                  <span className="text-[#141414]">N/A</span>
                </td>
              </tr>
              <tr className="border-b border-[#e4e4e7] transition-colors group/row">
                <td className="px-[12px] py-[10px] align-middle text-[#09090b] whitespace-nowrap group-hover/row:bg-[#f9fafb]" style={{ fontWeight: 500 }}>
                  Tactile data packet
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">Broadcast, multicast, or unicast</td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    10006
                  </code>
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  L:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50002
                  </code>
                  <br />
                  R:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50012
                  </code>
                </td>
              </tr>
              <tr className="border-b border-[#e4e4e7] transition-colors group/row">
                <td className="px-[12px] py-[10px] align-middle text-[#09090b] whitespace-nowrap group-hover/row:bg-[#f9fafb]" style={{ fontWeight: 500 }}>
                  Diagnostic data
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">Unicast or broadcast</td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    10007
                  </code>
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  L:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50005
                  </code>
                  <br />
                  R:{" "}
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    50015
                  </code>
                </td>
              </tr>
              <tr className="transition-colors group/row">
                <td className="px-[12px] py-[10px] align-middle text-[#09090b] whitespace-nowrap group-hover/row:bg-[#f9fafb]" style={{ fontWeight: 500 }}>
                  Heartbeat data
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">Broadcast</td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    10008
                  </code>
                </td>
                <td className="px-[12px] py-[10px] align-middle text-[#3f3f46] group-hover/row:bg-[#f9fafb]">
                  <code className="bg-[#f4f4f5] px-[4px] py-[1px] rounded-[4px] text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    54321
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-[20px]">
          <img src={networkDiagram} alt="Network port diagram" className="w-full rounded-[8px]" />
        </div>

        <div id="host-port-binding" className="scroll-mt-[120px] mt-[24px] mb-[24px]">
          <h4 className="text-[#141414] text-[20px] tracking-[-0.2px] leading-[1.3] mb-[12px]" style={{ fontWeight: 600 }}>
            <span className="mr-[8px]">3.1</span>Host port binding
          </h4>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[10px]">
            The process of binding the receiving ports of the host computer consists of into two steps:
          </p>
          <ul className="list-disc pl-[24px] text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[10px] space-y-[4px]">
            <li>During startup, the SDK automatically binds the heartbeat receiving port of the host computer.</li>
            <li>After receiving a heartbeat packet from the device, the SDK automatically binds the other receiving ports of the host computer according to the port numbers announced in the packet.</li>
          </ul>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[10px]">
            During this process, if any receiving port is already occupied, the SDK will report a "Port Occupied" error.
          </p>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[8px]">Solution to the "Port Occupied" Error:</p>
          <ol className="list-decimal pl-[24px] text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] space-y-[4px]">
            <li>Temporarily close the third-party application that is occupying the port, so that the port becomes available.</li>
            <li>Modify the default port via SDK.</li>
          </ol>
        </div>
      </div>

      <div id="smoothing-mode" className="scroll-mt-[120px] mb-[40px] lg:mb-[56px]">
        <h3 className="text-[#141414] leading-[1.3] mb-[16px] lg:mb-[20px] text-[19px] lg:text-[24px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
          <span className="text-[#141414] mr-[8px]" style={{ fontWeight: 700 }}>
            4.
          </span>
          Smoothing mode in position control
        </h3>

        <div id="triggering" className="scroll-mt-[120px] mb-[24px]">
          <h4 className="text-[#141414] text-[20px] tracking-[-0.2px] leading-[1.3] mb-[8px]" style={{ fontWeight: 600 }}>
            <span className="mr-[8px]">4.1</span>Triggering
          </h4>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[10px]">
            When using the{" "}
            <code className="bg-[#f0f0f0] text-[#c0392b] px-[6px] py-[2px] rounded-[4px] text-[15px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              set_joint_position(angles_rad)
            </code>{" "}
            interface to set joint positions:
          </p>
          <ul className="list-disc pl-[24px] text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[10px] space-y-[4px]">
            <li>By default, no smoothing is performed, and the joint is directly driven to the target angular position.</li>
            <li>However, if the difference in the target angle of any joint DOF across two consecutive frames exceeds the safety threshold (20°), smoothing mode will be enabled automatically.</li>
          </ul>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6]">
            When use{" "}
            <code className="bg-[#f0f0f0] text-[#c0392b] px-[6px] py-[2px] rounded-[4px] text-[15px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              set_joint_position(angles_rad, <span className="text-[#e6a817]">interpolate=True</span>)
            </code>{" "}
            with the &apos;interpolate&apos; flag to be True, smoothing mode is always enforced.
          </p>
        </div>

        <div id="purpose" className="scroll-mt-[120px] mb-[24px]">
          <h4 className="text-[#141414] text-[20px] tracking-[-0.2px] leading-[1.3] mb-[12px]" style={{ fontWeight: 600 }}>
            <span className="mr-[8px]">4.2</span>Purpose
          </h4>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[10px]">
            In smoothing mode, the joints do not reach their target angular positions immediately but gradually approach them.
          </p>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6]">
            This ensures more robust motion planning and produces smoother, more natural movements, while avoiding sudden changes that could cause jitter or mechanical shock.
          </p>
        </div>

        <div id="implementation" className="scroll-mt-[120px] mb-[24px]">
          <h4 className="text-[#141414] text-[20px] tracking-[-0.2px] leading-[1.3] mb-[12px]" style={{ fontWeight: 600 }}>
            <span className="mr-[8px]">4.3</span>Implementation
          </h4>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[8px]">
            In smoothing mode, the interpolated angular positions are updated every 2 ms according to this formula:
          </p>
          <div className="flex justify-center my-[12px]">
            <div className="text-[17px] text-[#141414] tracking-[-0.17px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              smoothed_angle<sub>T</sub> = <i>c</i> · target_angle + (1 − <i>c</i>) · smoothed_angle<sub>T−1</sub>
            </div>
          </div>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[8px]">Where:</p>
          <ul className="list-disc pl-[24px] text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.8] space-y-[4px]">
            <li>
              <code className="bg-[#f0f0f0] px-[6px] py-[2px] rounded-[4px] text-[15px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                smoothed_angle<sub>T</sub>
              </code>{" "}
              : Joint angle sent at the current moment
            </li>
            <li>
              <code className="bg-[#f0f0f0] px-[6px] py-[2px] rounded-[4px] text-[15px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                smoothed_angle<sub>T−1</sub>
              </code>{" "}
              : Joint angle sent at the previous moment
            </li>
            <li>
              <code className="bg-[#f0f0f0] px-[6px] py-[2px] rounded-[4px] text-[15px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                target_angle
              </code>{" "}
              : Target Angle
            </li>
            <li>
              <code className="bg-[#f0f0f0] px-[6px] py-[2px] rounded-[4px] text-[15px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                c
              </code>{" "}
              : smoothing coefficient, fixed at 0.01
            </li>
          </ul>
        </div>

        <div id="exit-mechanism" className="scroll-mt-[120px] mb-[24px]">
          <h4 className="text-[#141414] text-[20px] tracking-[-0.2px] leading-[1.3] mb-[12px]" style={{ fontWeight: 600 }}>
            <span className="mr-[8px]">4.4</span>Exit mechanism
          </h4>
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[10px]">
            Under any of the following conditions, the device will automatically exit smoothing mode and move directly to the target position.
          </p>
          <ul className="list-disc pl-[24px] text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] space-y-[4px]">
            <li>The difference between the current and target angular positions of all joints is less than 2°.</li>
            <li>The smoothing duration exceeds 2 s.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
