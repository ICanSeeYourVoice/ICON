import { create } from "zustand";
import { useDetectionStore } from "./detection";

interface BleStore {
  isConnected: boolean;
  isChange: boolean;
  device: BluetoothDevice | null;
  server: BluetoothRemoteGATTServer | undefined;
  service: BluetoothRemoteGATTService | undefined;
  characteristic: BluetoothRemoteGATTCharacteristic | null;
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

const useBleStore = create<BleStore>((set, get) => ({
  isConnected: false,
  isChange: false,
  device: null,
  server: undefined,
  service: undefined,
  characteristic: null,
  deviceValue: "",
  changeValue: "",
  setDevice: (device: BluetoothDevice) => set({ device }),
  setServer: (server: BluetoothRemoteGATTServer | undefined) => set({ server }),
  setService: (service: BluetoothRemoteGATTService | undefined) =>
    set({ service }),
  setCharacteristic: (
    characteristic: BluetoothRemoteGATTCharacteristic | undefined
  ) => {
    set({ characteristic });
    if (characteristic) {
      characteristic.startNotifications().then(
        () => {
          console.log("Notifications started");
          characteristic.addEventListener(
            "characteristicvaluechanged",
            (event: Event) => {
              const changedCharacteristic =
                event.target as BluetoothRemoteGATTCharacteristic;
              const value = new TextDecoder().decode(
                changedCharacteristic.value
              );
              console.log("New value", value);
              if (value == "reset") {
                set({ isChange: true });
                useDetectionStore.setState({ isBabyCry: false, cryingType: 0 });
              }
              set({ changeValue: value });
            }
          );
        },
        (error) => {
          console.error("Failed to start notifications", error);
        }
      );
    }
  },
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  setDeviceValue: (value: string) => set({ deviceValue: value }),
  setChangeValue: (value: string) => set({ changeValue: value }),
  writeCharacteristic: async (value: string) => {
    const { characteristic } = get();
    if (!characteristic) {
      console.error("Characteristic is not available.");
      return;
    }
    try {
      const encoder = new TextEncoder();
      await characteristic.writeValue(encoder.encode(value));
      console.log("Value written to the characteristic:", value);
    } catch (error) {
      console.error("Failed to write value", error);
    }
  },
}));

export default useBleStore;
