import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SmallButton from "../../../components/common/button/SmallButton";
import useBleStore from "../../../stores/bluetooth";
import BleImage from "../../../components/main/setting/ble/BleImage";

type DeviceOptions = {
  bleService: BluetoothServiceUUID;
  bleCharacteristic: BluetoothCharacteristicUUID;
};

interface BleStore {
  device: BluetoothDevice | null;
  setDevice: (device: BluetoothDevice) => void;
  setServer: (server: BluetoothRemoteGATTServer | undefined) => void;
  setService: (service: BluetoothRemoteGATTService | undefined) => void;
  setCharacteristic: (
    characteristic: BluetoothRemoteGATTCharacteristic | undefined
  ) => void;
  setIsConnected: (isConnected: boolean) => void;
  setDeviceValue: (value: string) => void;
  setChangeValue: (value: string) => void;
  writeCharacteristic: (value: string) => void;
}

const BleConnect = () => {
  const {
    device,
    setDevice,
    setServer,
    setService,
    setCharacteristic,
    writeCharacteristic,
  } = useBleStore() as BleStore;
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    if (!("bluetooth" in navigator)) {
      toast.error(
        "블루투스를 지원하지 않는 브라우저입니다.\nChrome에서 이용해주세요.",
        { duration: 5000 }
      );
      return;
    }
    return () => {};
  }, []);

  const connectToDevice = async ({
    bleService,
    bleCharacteristic,
  }: DeviceOptions) => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [bleService] }],
      });
      setDevice(device);
      console.log("device", device);
      const server = await device.gatt?.connect();
      setServer(server);
      console.log("server", server);

      const service = await server?.getPrimaryService(bleService);
      setService(service);
      console.log("service", service);

      const characteristic = await service?.getCharacteristic(
        bleCharacteristic
      );
      console.log("characteristic", characteristic);
      setCharacteristic(characteristic);
      setConnection(true);
      writeCharacteristic("init");
    } catch (err) {
      console.error(err);
    }
  };

  const handleScanClick = () => {
    connectToDevice({
      bleService: "12345678-1234-1234-1234-123456789abc",
      bleCharacteristic: "87654321-4321-4321-4321-cba987654321",
    });
  };

  const handleDisconnectClick = () => {
    if (!device) {
      return;
    }
    if (device.gatt?.connected) {
      device.gatt.disconnect;
      setConnection(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-[1rem] gap-[1rem]">
      <p>워치랑 연결하고 알림을 받아보세요.</p>
      <BleImage />
      {!connection ? (
        <SmallButton label="연결" onClick={handleScanClick} />
      ) : (
        <SmallButton label="연결해제" onClick={handleDisconnectClick} />
      )}
    </div>
  );
};

export default BleConnect;
