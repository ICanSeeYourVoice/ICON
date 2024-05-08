import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import SmallButton from "../../../components/common/button/SmallButton";
import useBleStore from "../../../stores/bluetooth";
type DeviceOptions = {
  bleService: BluetoothServiceUUID;
  bleCharacteristic: BluetoothCharacteristicUUID;
};
interface BleStore {
  isConnected: boolean;
  device: BluetoothDevice | null;
  server: BluetoothRemoteGATTServer | undefined;
  service: BluetoothRemoteGATTService | undefined;
  characteristic: BluetoothRemoteGATTCharacteristic | undefined;
  deviceValue: string;
  changeValue: string;
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
    changeValue,
    characteristic,
    setDevice,
    setServer,
    setService,
    setCharacteristic,
    setChangeValue,
    writeCharacteristic,
  } = useBleStore() as BleStore;
  const [deviceValue, setDeviceValue] = useState(""); // 처음 특성의 value 값
  const [testValue, setTestValue] = useState(""); // 변경된 특성 value 응답 값
  const characteristicGlobal = useRef(
    null as BluetoothRemoteGATTCharacteristic | null
  );

  useEffect(() => {
    if (!("bluetooth" in navigator)) {
      console.error("블루투스를 지원하지 않는 브라우저입니다.");
      toast.error("블루투스를 지원하지 않는 브라우저입니다.");
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

      // characteristicGlobal.current = characteristic ?? null;
      setCharacteristic(characteristic);
      // characteristic?.startNotifications().then(
      //   () => {
      //     console.log("Notifications started");
      //     characteristic?.addEventListener(
      //       "characteristicvaluechanged",
      //       handleCharacteristicValueChanged
      //     );
      //   },
      //   (error) => {
      //     console.error("Failed to start notifications", error);
      //   }
      // );

      // const handleCharacteristicValueChanged = (event: Event) => {
      //   const characteristic =
      //     event.target as BluetoothRemoteGATTCharacteristic;
      //   console.log("Characteristic value changed", characteristic.uuid);
      //   if (characteristic.value) {
      //     const value = new TextDecoder().decode(characteristic.value);
      //     console.log("New value", value);
      //     setTestValue(value);
      //     setChangeValue(value);
      //   } else {
      //     console.error("Characteristic value is null");
      //   }
      // };

      const valueDataView = await characteristic?.readValue();
      const valueString = new TextDecoder().decode(valueDataView);
      setDeviceValue(valueString);
    } catch (err) {
      console.error(err);
    }
  };

  // const writeCharacteristic = async (value: string) => {
  //   if (!characteristicGlobal.current) {
  //     console.error("Characteristic is not available.");
  //     return;
  //   }
  //   try {
  //     const encoder = new TextEncoder();
  //     await characteristicGlobal.current.writeValue(encoder.encode(value));
  //     await characteristic?.writeValue(encoder.encode(value));
  //     console.log("Value written to the characteristic:", value);
  //   } catch (error) {
  //     console.error("Failed to write value", error);
  //   }
  // };

  const handleScanClick = () => {
    connectToDevice({
      bleService: "12345678-1234-1234-1234-123456789abc",
      bleCharacteristic: "87654321-4321-4321-4321-cba987654321",
    });
  };

  return (
    <div className="flex flex-col items-center mb-[1rem] gap-[1rem]">
      <p>워치랑 연결하고 알림을 받아보세요.</p>
      <SmallButton label="연결" onClick={handleScanClick} />
      <SmallButton
        label="워치 알림 테스트"
        onClick={() => writeCharacteristic("hungry")}
      />
      {changeValue != "" ? <p>변경 값: {changeValue}</p> : null}
      {deviceValue != "" ? <p>초기 값: {deviceValue}</p> : null}
    </div>
  );
};

export default BleConnect;
