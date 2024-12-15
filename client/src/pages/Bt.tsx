import  { useState } from "react";
declare interface BluetoothDevice {
  gatt?: BluetoothRemoteGATTServer;
}

declare type BluetoothServiceUUID = number | string;
declare type BluetoothCharacteristicUUID = number | string;

type BluetoothRemoteGATTServer = {
  connect: () => Promise<BluetoothRemoteGATTServer>;
  getPrimaryService: (
    service: BluetoothServiceUUID,
  ) => Promise<BluetoothRemoteGATTService>;
};

interface BluetoothRemoteGATTService {
  getCharacteristic: (
    characteristic: BluetoothCharacteristicUUID,
  ) => Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTCharacteristic {
  readValue: () => Promise<DataView>;
}

type Device = {
  id: string;
  name: string;
  gatt: BluetoothRemoteGATTServer | null;
};

const BluetoothDeviceScanner = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const scanForDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          "00001800-0000-1000-8000-00805F9B34FB", // Generic Access Service UUID
          "00002A2A-0000-1000-8000-00805F9B34FB", // MAC Address UUID
        ],
      });

      if (device) {
        setDevices((prevDevices) => {
          const isDuplicate = prevDevices.some((d) => d.id === device.id);
          return isDuplicate
            ? prevDevices
            : [
                ...prevDevices,
                {
                  id: device.id,
                  name: device.name || "Unknown Device",
                  gatt: device.gatt,
                },
              ];
        });
      }
    } catch (err) {
      console.error("Error scanning for devices:", err);
      setError("Failed to scan for devices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const linkDevice = async (device: Device) => {
    setError(null);
    try {
      if (!device.gatt) {
        throw new Error("Device does not support GATT.");
      }

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(0x1800); // Generic Access Service
      const characteristic = await service.getCharacteristic(0x2a2a); // Device Name Characteristic

      const value = await characteristic.readValue();
      const decoder = new TextDecoder("utf-8");
      const macAddress = decoder.decode(value);

      alert(`Device MAC Address: ${macAddress}`);
      setSelectedDevice(device);
    } catch (err) {
      console.error("Error linking device:", err);
      setError(
        "Failed to link to the device. Ensure it supports required services.",
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Bluetooth Device Scanner</h1>

      <button
        onClick={scanForDevices}
        disabled={loading}
        className={`rounded px-4 py-2 ${loading ? "bg-gray-300" : "bg-blue-500 text-white"}`}
      >
        {loading ? "Scanning..." : "Scan for Devices"}
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <ul className="mt-4">
        {devices.map((device) => (
          <li
            key={device.id}
            className="mb-2 flex items-center justify-between rounded border p-2"
          >
            <span>
              {device.name} (ID: {device.id})
            </span>
            <button
              onClick={() => linkDevice(device)}
              className="rounded bg-green-500 px-3 py-1 text-white"
            >
              Link
            </button>
          </li>
        ))}
      </ul>

      {selectedDevice && (
        <div className="mt-4 rounded border bg-gray-100 p-4">
          <h2 className="text-xl font-bold">Selected Device</h2>
          <p>Name: {selectedDevice.name}</p>
          <p>ID: {selectedDevice.id}</p>
        </div>
      )}
    </div>
  );
};

export default BluetoothDeviceScanner;
