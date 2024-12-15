import { useState } from "react";
import axios from "../config/axios";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
interface BluetoothRemoteGATTServer {
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect(): void;
  getPrimaryService(
    service: string | number,
  ): Promise<BluetoothRemoteGATTService>;
}

interface BluetoothRemoteGATTService {
  getCharacteristic(
    characteristic: string | number,
  ): Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTCharacteristic {
  startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
  stopNotifications(): Promise<void>;
  addEventListener(
    type: "characteristicvaluechanged",
    listener: (this: BluetoothRemoteGATTCharacteristic, ev: Event) => any,
  ): void;
  readValue(): Promise<DataView>;
}

type Device = {
  name?: string; // Allow 'name' to be optional
  id: string;
  macAddress?: string;
  gatt?: BluetoothRemoteGATTServer;
};

export default function DeviceRegistration() {
  // const { user } = useUserContext();
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice] = useState<Device | null>(null);
  const navigate = useNavigate();
  const { user } = useUserContext();
  // Function to scan for devices
  const scanForDevices = async () => {
    try {
      const device: any = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });
      if (device) {
        setDevices((prevDevices) => [
          ...prevDevices,
          device, // No need to map; device already has the correct structure
        ]);
      }
    } catch (error) {
      console.error("Error scanning for devices:", error);
    }
  };

  // Function to link and read the MAC address
  const linkDevice = async () => {
    // try {
    // console.log("Connecting to device GATT server...");
    // const server = await device.gatt?.connect();
    // if (!server) throw new Error("Failed to connect to GATT server");

    // console.log("Connected to GATT server.");

    // const service = await server.getPrimaryService(0x1800); // Generic Access Service UUID (as a valid alias)

    // // Get the characteristic for the MAC address (UUID 0x2A2A)
    // const characteristic = await service.getCharacteristic(0x2a2a); // Manufacturer Name characteristic UUID (as a valid alias)
    // const value = await characteristic.readValue();

    // // Decode the value into a UTF-8 string
    // const decoder = new TextDecoder("utf-8");
    // const macAddress = decoder.decode(value);

    // alert(`MAC Address: ${macAddress}`);
    // // Update the selected device with MAC address
    // setSelectedDevice({ ...device, macAddress });

    // alert(`Device ${device.name} linked successfully! MAC: ${macAddress}`);
    // } catch (error) {
    // console.error("Error linking device:", error);
    // alert("Failed to link device.");
    // }
    let macAddress = "A0:B7:65:20:DE:1C";
    try {
      const response = await axios.post("/api/user/link-user", {
        userId: user?._id,
        macAddress: macAddress,
      });

      if (response.status === 200) {
        alert(response.data.message);
        // Redirect to the IoT device registration page after successful response
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error adding emergency contacts:", err);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mb-10 grid place-items-center">
        <ol className="hidden w-full items-center gap-5 space-y-4 md:flex lg:space-x-4 lg:space-y-0">
          <li className="relative">
            <a className="flex w-full items-center font-medium">
              <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs lg:h-8 lg:w-8 lg:text-sm">
                1
              </span>
              <div className="block">
                <h4 className="text-xs text-gray-900 lg:text-base">
                  Create Account
                </h4>
              </div>
              <svg
                className="ml-2 h-5 w-5 stroke-gray-900 sm:ml-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                  stroke="stroke-current"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </li>
          <li className="relative">
            <a className="flex w-full items-center font-medium">
              <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs lg:h-8 lg:w-8 lg:text-sm">
                2
              </span>
              <div className="block">
                <h4 className="text-xs text-gray-900 lg:text-base">
                  Add Contacts
                </h4>
              </div>
            </a>
          </li>
          <li className="relative">
            <a
              href="https://pagedone.io/"
              className="flex w-full items-center font-medium"
            >
              <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-indigo-600 text-xs text-white lg:h-8 lg:w-8 lg:text-sm">
                3
              </span>
              <div className="block">
                <h4 className="text-xs text-indigo-600 lg:text-base">
                  Link Device
                </h4>
              </div>
              <svg
                className="ml-2 h-5 w-5 stroke-indigo-600 sm:ml-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                  stroke="stroke-current"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div>

      <div className="container mx-auto grid h-full w-full grid-cols-1 gap-10 rounded-lg bg-white p-10 shadow-sm md:grid-cols-3">
        <div className="col-span-1">
          <img src="/device.jpg" className=" " />
        </div>
        <div className="col-span-2 rounded-lg bg-gradient-to-r from-indigo-400 to-indigo-200 p-8">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-indigo-600">
            Ride Safe, Stay Connected
          </span>
          <h1 className="mb-7 mt-3 text-2xl font-semibold text-white lg:text-3xl">
            Link your SmartHelm Device
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-56 w-80 rounded-md bg-white p-5">
              <div className="grid h-full w-full place-content-center rounded-md border-2 border-dashed border-gray-300">
                <div className="grid place-content-center text-center">
                  <svg
                    className="mx-auto h-10 w-10 fill-slate-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                  </svg>
                  <span className="text-center text-slate-400">
                    Add your device
                  </span>
                  <button
                    type="button"
                    onClick={scanForDevices}
                    className="mt-3 rounded-lg bg-indigo-600 px-3 py-2 text-xs text-white duration-150 hover:bg-indigo-700 active:shadow-lg"
                  >
                    Scan for Devices
                  </button>
                </div>
              </div>
            </div>

            <div className="h-56 w-80 rounded-md bg-white p-5 ">
              <h1 className="border-b pb-2 font-medium text-blue-950">
                Devices
              </h1>
              {devices.length === 0 ? (
                <div className="text-gray-400">No devices found</div>
              ) : (
                <ul role="list" className="divide-y divide-gray-100">
                  {devices.map((device) => (
                    <li
                      key={device.id}
                      className="mt-2 flex cursor-pointer flex-col items-start justify-start gap-y-2 rounded-md bg-slate-50 px-3 py-5"
                    >
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {device.name}
                      </p>
                      <button
                        onClick={() => linkDevice()}
                        className="mt-1 rounded-lg bg-indigo-600 px-3 py-1 text-xs text-white duration-150 hover:bg-indigo-700 active:shadow-lg"
                      >
                        Link Device
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {selectedDevice && (
                <div className="mt-3 text-sm text-gray-800">
                  Selected Device: {selectedDevice.name} (MAC:{" "}
                  {selectedDevice.macAddress || "Fetching..."})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
