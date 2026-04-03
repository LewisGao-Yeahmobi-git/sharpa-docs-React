import { cppHiddenAnchorIds } from "../../../docs/content-config";
import { ApiMethod, InfoCallout, LabeledCodeBlock } from "../DocBlocks";

export function SectionCppApis() {
  return (
    <div id="commonly-used-apis-cpp" className="scroll-mt-[120px]">
      <h2 className="text-[#345bb4] text-[24px] lg:text-[32px] leading-[1.3] mb-[32px] lg:mb-[48px]" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
        Commonly used APIs (C++)
      </h2>

      <div id="cpp-device-connection" className="scroll-mt-[120px] mb-[40px] lg:mb-[56px]">
        <h3 className="text-[#141414] text-[19px] lg:text-[26px] leading-[1.3] mb-[24px] lg:mb-[32px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
          <span className="text-[#141414] mr-[8px]" style={{ fontWeight: 700 }}>
            1.
          </span>
          Device connection
        </h3>

        <ApiMethod name="get_instance()" description="Get device manager instance.">
          <LabeledCodeBlock label="Method prototype" code={`static SharpaWaveManager& sharpa::SharpaWaveManager::get_instance()`} />
          <LabeledCodeBlock label="Examples" code={`manager = SharpaWaveManager::get_instance();`} />
        </ApiMethod>

        <ApiMethod name="get_all_device_sn()" description="Get the serial numbers of all discovered devices.">
          <LabeledCodeBlock label="Method prototype" code={`std::vector<std::string> sharpa::SharpaWaveManager::get_all_device_sn()const`} />
          <LabeledCodeBlock label="Returns" code={`Serial numbers of all discovered devices (including both connected and disconnected\ndevices that have sent a heartbeat packet within the timeout period)`} />
          <LabeledCodeBlock
            label="Examples"
            code={`manager = &SharpaWaveManager::get_instance();
// wait for device discovery (up to 4 seconds)
auto sns = manager->get_all_device_sn();
if (!sns.empty()) {
    TEST_DEVICE_SN = sns[0];
} else {
    std::cout << "Failed to find device" << std::endl;
}`}
          />
        </ApiMethod>

        <ApiMethod name="get_all_devices()" description="Get complete information of all discovered devices.">
          <LabeledCodeBlock label="Method prototype" code={`std::vector<DeviceInfo> sharpa::SharpaWaveManager::get_all_devices()const`} />
          <div className="flex flex-col lg:flex-row gap-[12px]">
            <div className="flex-1">
              <LabeledCodeBlock label="Returns" code={`A vector of DeviceInfo structures`} />
            </div>
            <InfoCallout>
              The information contained in the return is listed in{" "}
              <a href="#device-information" className="text-[#345bb4] hover:underline">
                Device Information
              </a>
              .
            </InfoCallout>
          </div>
          <LabeledCodeBlock
            label="Examples"
            code={`void print_device_info(const sharpa::DeviceInfo& info) {
    std::cout << "Device Information:" << std::endl;
    std::cout << "  Serial Number: " << (info.sn.empty() ? "N/A" : info.sn) <<
    std::endl;
    std::cout << "  Device Type: " << static_cast<int>(info.device_type) << std::endl;
    std::cout << "  Hand Side: " << (info.hand_side == sharpa::HandSide::LEFT ?
    "LEFT" : "RIGHT") << std::endl;
    std::cout << "  IP Address: " << (info.ip.empty() ? "N/A" : info.ip) << std::endl;
    std::cout << "  TCP Port: " << info.tcp_port << std::endl;
    std::cout << "  UDP Port: " << info.udp_port << std::endl;
    std::cout << "  Firmware Version: " << (info.firmware_version.empty() ? "N/A" :
    info.firmware_version) << std::endl;
    std::cout << "  MAC Address: " << (info.mac.empty() ? "N/A" : info.mac) <<
    std::endl;
    std::cout << "  Fault Code: " << info.status.fault_code << std::endl;
    std::cout << std::endl;
}

// Get detailed device info
auto devices = sharpa::SharpaWaveManager::get_instance().get_all_devices();

// Print info of all discovered devices
for (const auto& device : devices) {
    print_device_info(device);
}`}
            defaultCollapsed
          />
        </ApiMethod>

        <ApiMethod name="connect()" description="Connect a device.">
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] -mt-[8px] mb-[4px]" style={{ fontWeight: 600 }}>
            -&nbsp; Using the left/right-hand configuration
          </p>
          <LabeledCodeBlock label="Method prototype" code={`SharpaWave& sharpa::SharpaWaveManager::connect(const HandSide & hand_side)`} />
          <LabeledCodeBlock label="Input parameters" code={`hand_side: Left/Right-hand configuration of the target device (LEFT/RIGHT)`} />
          <LabeledCodeBlock label="Returns" code={`Reference to the SharpaWave control object of the target device`} />
          <LabeledCodeBlock label="Postcondition" code={`Access the device control interface using the returned \`SharpaWave&\`.`} />
          <LabeledCodeBlock
            label="Exceptions"
            code={`Throws \`std::runtime_error\` in the following cases:
  - No device is found that matches the specified left/right hand configuration
  - Multiple devices are found that match the specified left/right hand configuration
  - Failed to connect to the device`}
          />
          <LabeledCodeBlock
            label="Examples"
            code={`try {
    SharpaWave* hand_by_side = &manager->connect(info.hand_side);
    ASSERT_EQ(hand_by_side->get_device_info().hand_side, info.hand_side);
} else{
    // No unique matching device found
}`}
          />

          <div className="mt-[24px]" />
          <p className="text-[#141414] text-[17px] tracking-[-0.17px] leading-[1.6] mb-[4px]" style={{ fontWeight: 600 }}>
            -&nbsp; Using the serial number
          </p>
          <LabeledCodeBlock label="Method prototype" code={`SharpaWave& sharpa::SharpaWaveManager::connect(const std::string & device_sn)`} />
          <LabeledCodeBlock label="Input parameters" code={`device_sn: Serial number of the target device`} />
          <LabeledCodeBlock label="Returns" code={`Reference to the SharpaWave control object of the target device`} />
          <LabeledCodeBlock label="Postcondition" code={`Access the device control interface using the returned \`SharpaWave&\`.`} />
          <LabeledCodeBlock
            label="Exceptions"
            code={`- Throws \`std::out_of_range\` if the specified serial number does not exist.
- Throws \`std::runtime_error\` if the connection fails.`}
          />
          <LabeledCodeBlock
            label="Examples"
            code={`try {
    device = &manager->connect(test_device_sn);
    std::cout << "Device connected: " << test_device_sn << std::endl;
} catch (const std::exception& e) {
    std::cerr << "Cannot connect device: " << e.what() << std::endl;
    test_device_sn.clear();
}`}
          />
        </ApiMethod>
      </div>

      {cppHiddenAnchorIds.map((id) => (
        <div key={id} id={id} className="scroll-mt-[120px]" />
      ))}
    </div>
  );
}
