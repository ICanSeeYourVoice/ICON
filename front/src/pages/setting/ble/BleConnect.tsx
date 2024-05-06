import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import SmallButton from "../../../components/common/button/SmallButton";

type DeviceOptions = {
  bleService: BluetoothServiceUUID;
  bleCharacteristic: BluetoothCharacteristicUUID;
};

const BleConnect = () => {
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
  // const connectToDevice = async ({
  //   bleService,
  //   bleCharacteristic,
  // }: DeviceOptions) => {
  //   try {
  //     navigator.bluetooth
  //       .requestDevice({
  //         filters: [
  //           {
  //             // 사용자 정의 service uuid기 때문에 앱으로 광고를 게시한 블루투스만 필터링하여 목록 표시
  //             services: [bleService],
  //           },
  //         ],
  //       })
  //       .then((device) => {
  //         // 선택한 device 연결 시도
  //         console.log("Connecting to GATT Server...");
  //         return device.gatt?.connect();
  //       })
  //       .then((server) => {
  //         // GATT 서버에 연결 시도
  //         console.log("Connected to GATT Server");
  //         return server?.getPrimaryService(bleService);
  //       })
  //       .then((service) => {
  //         // 특정 특성에 접근 시도
  //         console.log("Connecting to GATT Service characteristic...");
  //         return service?.getCharacteristic(bleCharacteristic);
  //       })
  //       .then(async (characteristic) => {
  //         console.log("Connected to GATT Service characteristic");

  //         // 알림 설정
  //         // characteristic?.startNotifications().then(() => {
  //         //   characteristic?.addEventListener(
  //         //     "characteristicvaluechanged",
  //         //     (e) => {
  //         //       console.log(e);
  //         //       const target = e.target as BluetoothRemoteGATTCharacteristic;
  //         //       if (!target.value) {
  //         //         console.error("Characteristic value is null");
  //         //         return;
  //         //       }

  //         //       const value = target.value.buffer;
  //         //       console.log(
  //         //         `${bleCharacteristic} changed`,
  //         //         new TextDecoder().decode(value)
  //         //       );
  //         //       setTestValue(new TextDecoder().decode(value));
  //         //     }
  //         //   );
  //         // });
  //         characteristicGlobal.current = characteristic ?? null;
  //         characteristic?.startNotifications().then(
  //           () => {
  //             console.log("Notifications started");
  //             characteristic?.addEventListener(
  //               "characteristicvaluechanged",
  //               handleCharacteristicValueChanged
  //             );
  //           },
  //           (error) => {
  //             console.error("Failed to start notifications", error);
  //           }
  //         );

  //         function handleCharacteristicValueChanged(event) {
  //           const characteristic =
  //             event.target as BluetoothRemoteGATTCharacteristic;
  //           console.log("Characteristic value changed", characteristic.uuid);
  //           if (characteristic.value) {
  //             const value = new TextDecoder().decode(characteristic.value);
  //             console.log("New value", value);
  //             setTestValue(value);
  //           } else {
  //             console.error("Characteristic value is null");
  //           }
  //         }

  //         console.log("Notifications have been started.");

  //         // 데이터 읽기 또는 쓰기
  //         const valueDataView = await characteristic?.readValue();
  //         const valueString = new TextDecoder().decode(valueDataView);

  //         console.log("characteristic read value", valueString);
  //         // console.log("characteristic read value", characteristic?.readValue());
  //         // console.log(
  //         // "characteristic read value",
  //         // new TextDecoder().decode(characteristic?.readValue())
  //         // );

  //         // 데이터 변화 감지
  //         // characteristic?.addEventListener(
  //         //   "characteristicvaluechanged",
  //         //   (e) => {
  //         //     const target = e.target as BluetoothRemoteGATTCharacteristic;
  //         //     if (!target.value) {
  //         //       console.error("Characteristic value is null");
  //         //       return;
  //         //     }

  //         //     const value = target.value.buffer;
  //         //     console.log(
  //         //       `${bleCharacteristic} changed`,
  //         //       new TextDecoder().decode(value)
  //         //     );
  //         //     setTestValue(new TextDecoder().decode(value));
  //         //   }
  //         // );
  //         return characteristic?.readValue();
  //       })
  //       .then((value) => {
  //         // 데이터 value 처리
  //         console.log(value);
  //         const val = new TextDecoder().decode(value);
  //         setDeviceValue(val!);
  //         console.log("Characteristic value:", new TextDecoder().decode(value));
  //       })
  //       .catch((error) => {
  //         console.error("Connection failed", error);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const connectToDevice = async ({
    bleService,
    bleCharacteristic,
  }: DeviceOptions) => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [bleService] }],
      });
      console.log("device", device);
      const server = await device.gatt?.connect();
      console.log("server", server);

      const service = await server?.getPrimaryService(bleService);
      console.log("service", service);

      const characteristic = await service?.getCharacteristic(
        bleCharacteristic
      );
      console.log("characteristic", characteristic);

      characteristicGlobal.current = characteristic ?? null;
      characteristic?.startNotifications().then(
        () => {
          console.log("Notifications started");
          characteristic?.addEventListener(
            "characteristicvaluechanged",
            handleCharacteristicValueChanged
          );
        },
        (error) => {
          console.error("Failed to start notifications", error);
        }
      );

      const handleCharacteristicValueChanged = (event) => {
        const characteristic =
          event.target as BluetoothRemoteGATTCharacteristic;
        console.log("Characteristic value changed", characteristic.uuid);
        if (characteristic.value) {
          const value = new TextDecoder().decode(characteristic.value);
          console.log("New value", value);
          setTestValue(value);
        } else {
          console.error("Characteristic value is null");
        }
      };

      const valueDataView = await characteristic?.readValue();
      const valueString = new TextDecoder().decode(valueDataView);
      setDeviceValue(valueString);
    } catch (err) {
      console.error(err);
    }
  };

  const writeCharacteristic = async (value: string) => {
    if (!characteristicGlobal.current) {
      console.error("Characteristic is not available.");
      return;
    }
    try {
      const encoder = new TextEncoder();
      await characteristicGlobal.current.writeValue(encoder.encode(value));
      console.log("Value written to the characteristic:", value);
    } catch (error) {
      console.error("Failed to write value", error);
    }
  };

  const handleScanClick = () => {
    connectToDevice({
      bleService: "12345678-1234-1234-1234-123456789abc",
      bleCharacteristic: "87654321-4321-4321-4321-cba987654321",
    });
  };

  return (
    <div className="flex flex-col text-gray-1 text-[1rem] w-[15.25rem] justify-center items-center gap-[1.2rem]">
      <p>워치랑 연결하고 알림을 받아보세요.</p>
      <SmallButton label="연결" onClick={handleScanClick} />
      <SmallButton
        label="워치 알림 테스트"
        onClick={() => writeCharacteristic("아기가 울고 있어요.")}
      />
      {testValue != "" ? <p>변경 값: {testValue}</p> : null}
      {deviceValue != "" ? <p>초기 값: {deviceValue}</p> : null}
    </div>
  );
};

export default BleConnect;
