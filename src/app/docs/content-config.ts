export interface TocItem {
  id: string;
  number: string;
  title: string;
  level: number;
  children?: TocItem[];
}

export interface SearchEntry {
  id: string;
  title: string;
  breadcrumb: string;
  snippet?: string;
}

export interface ComingSoonChild {
  id: string;
  number: string;
  title: string;
}

export const tocData: TocItem[] = [
  {
    id: "conventions",
    number: "",
    title: "Conventions",
    level: 0,
    children: [
      { id: "order-of-vector-elements", number: "1", title: "Order of vector elements", level: 1 },
      { id: "device-information", number: "2", title: "Device information", level: 1 },
      {
        id: "network-configuration",
        number: "3",
        title: "Network configuration",
        level: 1,
        children: [{ id: "host-port-binding", number: "3.1", title: "Host port binding", level: 2 }],
      },
      {
        id: "smoothing-mode",
        number: "4",
        title: "Smoothing mode in position control",
        level: 1,
        children: [
          { id: "triggering", number: "4.1", title: "Triggering", level: 2 },
          { id: "purpose", number: "4.2", title: "Purpose", level: 2 },
          { id: "implementation", number: "4.3", title: "Implementation", level: 2 },
          { id: "exit-mechanism", number: "4.4", title: "Exit mechanism", level: 2 },
        ],
      },
    ],
  },
  {
    id: "commonly-used-apis-cpp",
    number: "",
    title: "Commonly used APIs (C++)",
    level: 0,
    children: [
      { id: "cpp-device-connection", number: "1", title: "Device connection", level: 1 },
      { id: "cpp-interaction-with-device", number: "2", title: "Interaction with the device", level: 1 },
      { id: "cpp-device-control", number: "3", title: "Device control", level: 1 },
      { id: "cpp-joint-motion-control", number: "4", title: "Joint motion control", level: 1 },
      { id: "cpp-acquisition-tactile-data", number: "5", title: "Acquisition of tactile data", level: 1 },
      { id: "cpp-safety-limits", number: "6", title: "Safety limits", level: 1 },
      { id: "cpp-diagnostics-monitoring", number: "7", title: "Diagnostics & monitoring", level: 1 },
      { id: "cpp-firmware-control", number: "8", title: "Firmware Control", level: 1 },
    ],
  },
  {
    id: "commonly-used-apis-python",
    number: "",
    title: "Commonly used APIs (Python)",
    level: 0,
    children: [
      { id: "py-device-connection-management", number: "1", title: "Device Connection Management", level: 1 },
      { id: "py-device-interaction-service", number: "2", title: "Device Interaction Service", level: 1 },
      { id: "py-device-control", number: "3", title: "Device Control", level: 1 },
      { id: "py-joint-motion-control", number: "4", title: "Joint Motion Control", level: 1 },
      { id: "py-tactile-data-acquisition", number: "5", title: "Tactile data acquisition", level: 1 },
      { id: "py-safety-limits", number: "6", title: "Safety limits", level: 1 },
      { id: "py-diagnosis-monitoring", number: "7", title: "Diagnosis & monitoring", level: 1 },
      { id: "py-firmware-control", number: "8", title: "Firmware Control", level: 1 },
    ],
  },
  {
    id: "complete-api-reference",
    number: "",
    title: "Complete API reference",
    level: 0,
  },
];

export const searchData: SearchEntry[] = [
  { id: "conventions", title: "Conventions", breadcrumb: "Chapter 1", snippet: "Order of vector elements, device information, network configuration, smoothing mode" },
  { id: "order-of-vector-elements", title: "1. Order of vector elements", breadcrumb: "Conventions", snippet: "thumb_CMC_FE, thumb_CMC_AA, index_MCP_FE, joint DOFs vector ordering" },
  { id: "device-information", title: "2. Device information", breadcrumb: "Conventions", snippet: "Control mode, control source, firmware version, hand side, IP address, MAC address, serial number" },
  { id: "network-configuration", title: "3. Network configuration", breadcrumb: "Conventions", snippet: "Default settings, joint data, tactile data stream, diagnostic data, heartbeat, UDP, TCP ports" },
  { id: "host-port-binding", title: "3.1 Host port binding", breadcrumb: "Conventions › Network configuration", snippet: "Port binding process, Port Occupied error, heartbeat receiving port" },
  { id: "smoothing-mode", title: "4. Smoothing mode in position control", breadcrumb: "Conventions", snippet: "set_joint_position, interpolate flag, safety threshold 20°, smooth natural movements" },
  { id: "triggering", title: "4.1 Triggering", breadcrumb: "Conventions › Smoothing mode", snippet: "Consecutive frames, safety threshold 20°, interpolate=True" },
  { id: "purpose", title: "4.2 Purpose", breadcrumb: "Conventions › Smoothing mode", snippet: "Gradual approach to target, robust motion planning, smoother movements" },
  { id: "implementation", title: "4.3 Implementation", breadcrumb: "Conventions › Smoothing mode", snippet: "Interpolated angular positions updated every 2 ms, smoothing coefficient c=0.01" },
  { id: "exit-mechanism", title: "4.4 Exit mechanism", breadcrumb: "Conventions › Smoothing mode", snippet: "2° threshold, 2 second timeout, automatic exit from smoothing mode" },
  { id: "commonly-used-apis-cpp", title: "Commonly used APIs (C++)", breadcrumb: "Chapter 2", snippet: "SharpaWaveManager, SharpaWave, device connection, joint control, tactile data" },
  { id: "cpp-device-connection", title: "1. Device connection", breadcrumb: "Commonly used APIs (C++)", snippet: "get_instance, get_all_device_sn, get_all_devices, connect, HandSide, serial number" },
  { id: "cpp-interaction-with-device", title: "2. Interaction with the device", breadcrumb: "Commonly used APIs (C++)" },
  { id: "cpp-device-control", title: "3. Device control", breadcrumb: "Commonly used APIs (C++)" },
  { id: "cpp-joint-motion-control", title: "4. Joint motion control", breadcrumb: "Commonly used APIs (C++)", snippet: "set_joint_position, angles_rad, position control" },
  { id: "cpp-acquisition-tactile-data", title: "5. Acquisition of tactile data", breadcrumb: "Commonly used APIs (C++)", snippet: "Tactile sensor data stream, tactile packets" },
  { id: "cpp-safety-limits", title: "6. Safety limits", breadcrumb: "Commonly used APIs (C++)", snippet: "Joint angle limits, safety thresholds, error handling" },
  { id: "cpp-diagnostics-monitoring", title: "7. Diagnostics & monitoring", breadcrumb: "Commonly used APIs (C++)", snippet: "Fault code, error joint, battery status" },
  { id: "cpp-firmware-control", title: "8. Firmware Control", breadcrumb: "Commonly used APIs (C++)", snippet: "Firmware version, firmware update, control source" },
  { id: "commonly-used-apis-python", title: "Commonly used APIs (Python)", breadcrumb: "Chapter 3", snippet: "Python SDK, device connection, joint control, tactile data" },
  { id: "py-device-connection-management", title: "1. Device Connection Management", breadcrumb: "Commonly used APIs (Python)" },
  { id: "py-device-interaction-service", title: "2. Device Interaction Service", breadcrumb: "Commonly used APIs (Python)" },
  { id: "py-device-control", title: "3. Device Control", breadcrumb: "Commonly used APIs (Python)" },
  { id: "py-joint-motion-control", title: "4. Joint Motion Control", breadcrumb: "Commonly used APIs (Python)", snippet: "Python joint position control, motion planning" },
  { id: "py-tactile-data-acquisition", title: "5. Tactile data acquisition", breadcrumb: "Commonly used APIs (Python)", snippet: "Python tactile sensor streaming, data packets" },
  { id: "py-safety-limits", title: "6. Safety limits", breadcrumb: "Commonly used APIs (Python)" },
  { id: "py-diagnosis-monitoring", title: "7. Diagnosis & monitoring", breadcrumb: "Commonly used APIs (Python)", snippet: "Fault codes, error monitoring, battery status via Python" },
  { id: "py-firmware-control", title: "8. Firmware Control", breadcrumb: "Commonly used APIs (Python)" },
  { id: "complete-api-reference", title: "Complete API reference", breadcrumb: "Chapter 4", snippet: "SDK/SharpaWave_CompleteAPI_Reference/html/classsharpa_1_1SharpaWaveManager.html" },
];

export const cppHiddenAnchorIds = [
  "cpp-interaction-with-device",
  "cpp-device-control",
  "cpp-joint-motion-control",
  "cpp-acquisition-tactile-data",
  "cpp-safety-limits",
  "cpp-diagnostics-monitoring",
  "cpp-firmware-control",
];

export const pythonComingSoonChildren: ComingSoonChild[] = [
  { id: "py-device-connection-management", number: "3.1", title: "Device Connection Management" },
  { id: "py-device-interaction-service", number: "3.2", title: "Device Interaction Service" },
  { id: "py-device-control", number: "3.3", title: "Device Control" },
  { id: "py-joint-motion-control", number: "3.4", title: "Joint Motion Control" },
  { id: "py-tactile-data-acquisition", number: "3.5", title: "Tactile data acquisition" },
  { id: "py-safety-limits", number: "3.6", title: "Safety limits" },
  { id: "py-diagnosis-monitoring", number: "3.7", title: "Diagnosis & monitoring" },
  { id: "py-firmware-control", number: "3.8", title: "Firmware Control" },
];

export function getAllIds(items: TocItem[]): string[] {
  const ids: string[] = [];
  for (const item of items) {
    ids.push(item.id);
    if (item.children) ids.push(...getAllIds(item.children));
  }
  return ids;
}

export function getActiveSectionTitle(activeId: string): string {
  for (const item of tocData) {
    if (item.id === activeId) return item.title;
    if (!item.children) continue;

    for (const child of item.children) {
      if (child.id === activeId) return `${child.number}. ${child.title}`;
      if (!child.children) continue;

      for (const grandChild of child.children) {
        if (grandChild.id === activeId) return `${grandChild.number} ${grandChild.title}`;
      }
    }
  }
  return "Contents";
}
