import { useEffect } from "react";
import toast from "react-hot-toast";
import SmallButton from "../../../components/common/button/GradientButton";
import useBleStore from "../../../stores/bluetooth";
import BleImage from "../../../components/main/setting/ble/BleImage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppToken, GetCheckToken } from "../../../apis/Bluetooth";
import { PulseLoader } from "react-spinners";

type DeviceOptions = {
  bleService: BluetoothServiceUUID;
  bleCharacteristic: BluetoothCharacteristicUUID;
};

interface BleStore {
  isConnected: boolean;
  device: BluetoothDevice | null;
  deviceValue: string;
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
    setDeviceValue,
    setDevice,
    setServer,
    setService,
    setCharacteristic,
    writeCharacteristic,
  } = useBleStore() as BleStore;
  const queryClient = useQueryClient();
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
  const { data: checkToken, isLoading: isLoadingCheckToken } = useQuery({
    queryFn: GetCheckToken,
    queryKey: ["checkToken"],
    retry: 1,
  });
  const { mutate } = useMutation({
    mutationFn: AppToken,
    onSuccess: () => {
      toast.success("블루투스 연결에 성공했어요.", { duration: 800 });
      queryClient.invalidateQueries({
        queryKey: ["checkToken"],
      });
    },
    onError: () => {
      toast.error("앱 토큰 등록에 실패했어요.", { duration: 800 });
    },
  });

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
      const tokenDataView = await characteristic?.readValue();
      const fcmToken = new TextDecoder().decode(tokenDataView);
      console.log(fcmToken);
      if (fcmToken.length < 1) {
        alert("FCM 토큰을 가져올 수 없습니다.");
        throw new Error("FCM 토큰을 가져올 수 없습니다.");
      }
      useBleStore.setState({ isConnected: true });
      setDeviceValue(fcmToken);
      mutate({ token: fcmToken, isApp: true });
      writeCharacteristic("normal");
      device.gatt?.disconnect();
    } catch (err) {
      toast.error("블루투스 연결에 실패했어요😢\n다시 시도해주세요.", {
        duration: 5000,
      });
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
    // if (!device) {
    //   toast.error("연결된 디바이스가 없어요.");
    //   return;
    // }
    // if (device.gatt?.connected) {
    //   device.gatt.disconnect();

    //   useBleStore.setState({
    //     isConnected: false,
    //     device: null,
    //     server: undefined,
    //     service: undefined,
    //     characteristic: undefined,
    //   });
    // }
    mutate({ token: null, isApp: true });
  };

  return (
    <div className="flex flex-col items-center mb-[1rem] gap-[1rem]">
      {isLoadingCheckToken ? (
        <PulseLoader />
      ) : (
        <>
          <p>워치랑 연결하고 알림을 받아보세요.</p>
          <BleImage />
          {checkToken == null ? (
            <SmallButton label="연결" onClick={handleScanClick} />
          ) : (
            <div>
              {/* <SmallButton
                label="테스트버튼"
                onClick={() => writeCharacteristic("hungry")}
              /> */}
              <SmallButton label="연결해제" onClick={handleDisconnectClick} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BleConnect;
