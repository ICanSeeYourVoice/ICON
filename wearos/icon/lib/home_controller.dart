// ignore_for_file: non_constant_identifier_names
import 'dart:convert';
import 'package:ble_peripheral/ble_peripheral.dart';
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';
import 'package:vibration/vibration.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:restart_app/restart_app.dart';

class HomeController extends GetxController {
  RxBool isAdvertising = false.obs; // 블루투스 광고 상태
  RxBool isBleOn = false.obs; // 블루투스 허용 상태
  RxList<String> devices = <String>[].obs; // 연결된 모든 장치 id
  RxString devicesId = ''.obs; // 캐릭터리스틱 업데이트를 위한 장치 id
  RxString status = ''.obs; // 현재 상태
  RxString getDeviceName = ''.obs; // 장치 모델 이름
  RxString fcm_token = ''.obs;
  // 현재 상태 업데이트
  void updateStatus(String newStatus) {
    status.value = newStatus; // 상태 업데이트
    // 초기 화면/기본 화면이 아닌 경우 진동 알림
    if (newStatus != 'init' && newStatus != 'normal') {
      Vibration.vibrate(
          // duration: 3000, pattern: [100, 50, 200, 30, 1000, 2000]);
          pattern: [500, 500, 500, 500, 500, 500, 500, 500]);
    }
    print("updateStatus: ${status.value}");
  }

  // 현재 연결된 장치 모델 이름 추출
  DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
  void getDeviceInfo() async {
    final info = await deviceInfo.androidInfo;
    getDeviceName.value = info.model;
  }

  // 블루투스 광고 시 게시 이름
  String get deviceName => switch (defaultTargetPlatform) {
        TargetPlatform.android => getDeviceName.value,
        TargetPlatform.iOS => "BleIOS",
        TargetPlatform.macOS => "BleMac",
        TargetPlatform.windows => "BleWin",
        _ => "TestDevice"
      };

  // 블루투스 광고 시 제조사 정보
  var manufacturerData = ManufacturerData(
    manufacturerId: 0x0075,
    data: Uint8List.fromList([
      0x03,
      0x01,
    ]),
  );

  // 블루투스 custom Service, characteristic uuid
  String customMessage = '12345678-1234-1234-1234-123456789abc';
  String characteristicMessage = '87654321-4321-4321-4321-cba987654321';

  @override
  void onInit() {
    _initialize();
    getDeviceInfo();
    // setup callbacks
    BlePeripheral.setBleStateChangeCallback(isBleOn);

    BlePeripheral.setAdvertisingStatusUpdateCallback(
        (bool advertising, String? error) {
      isAdvertising.value = advertising;
      if (error == 'Already started') {
        BlePeripheral.stopAdvertising();
        Get.log("Already started error stopAdvertising()");
      }
      Get.log("AdvertingStarted: $advertising, Error: $error");
    });

    BlePeripheral.setCharacteristicSubscriptionChangeCallback(
        (String deviceId, String characteristicId, bool isSubscribed) {
      Get.log(
        "onCharacteristicSubscriptionChange: $deviceId : $characteristicId $isSubscribed",
      );
      if (isSubscribed) {
        if (!devices.any((element) => element == deviceId)) {
          devices.add(deviceId);
          devicesId.value = deviceId;

          Get.log("$deviceId adding");
        } else {
          Get.log("$deviceId already exists");
        }
      } else {
        devices.removeWhere((element) => element == deviceId);
        // updateStatus("init");
        updateStatus('normal'); // fcm token
      }
    });

    BlePeripheral.setReadRequestCallback(
        (deviceId, characteristicId, offset, value) {
      Get.log("ReadRequest: $deviceId $characteristicId : $offset : $value");
      return ReadRequestResult(value: utf8.encode("$fcm_token"));
    });

    BlePeripheral.setWriteRequestCallback(
        (deviceId, characteristicId, offset, value) {
      String receivedData = utf8.decode(value as Uint8List);
      updateStatus(receivedData); // update status
      Get.log(
          "WriteRequest: $deviceId $characteristicId : $offset : $value : $receivedData");
      // return WriteRequestResult(status: 144);
      return null;
    });

    // Android only
    BlePeripheral.setBondStateChangeCallback((deviceId, bondState) {
      Get.log("OnBondState: $deviceId $bondState");
    });

    // 권한 요청
    initializeBluetooth();
    super.onInit();
  }

  void _initialize() async {
    try {
      await BlePeripheral.initialize();
    } catch (e) {
      Get.log("InitializationError: $e");
    }
  }

  void initializeBluetooth() async {
    await checkPermission();
  }

  Future<void> checkPermission() async {
    bool permissionGranted = await BlePeripheral.askBlePermission();
    if (!permissionGranted) {
      Get.log("Bluetooth permission not granted, retrying...");
      bool check = await BlePeripheral.askBlePermission();
      if (check)
        Restart.restartApp();
      else
        await checkPermission();
    } else {
      isBleOn.value = true;
      // updateStatus('init');
      updateStatus('normal'); // fcm token
    }
  }

  void checkStartAdvertising() async {
    if (!isBleOn.value) {
      await checkPermission();
    } else {
      // await checkPermission();
      startAdvertising();
      await checkAddServices();
    }
  }

  Future<void> checkAddServices() async {
    List<String> services = await BlePeripheral.getServices();
    bool serviceExists = services.contains(characteristicMessage);
    if (!serviceExists) {
      addServices();
    }
  }

  void startAdvertising() async {
    Get.log("Starting Advertising");
    Get.log("deviceName ${deviceName}");
    if (isBleOn.value == false) {
      bool permissionGranted = await BlePeripheral.askBlePermission();
      if (!permissionGranted) {
        Get.log("Bluetooth permission not granted");
        return;
      } else {
        isBleOn.value = true;
      }
    }

    await BlePeripheral.startAdvertising(
      services: [customMessage],
      localName: deviceName,
      manufacturerData: manufacturerData,
      addManufacturerDataInScanResponse: true,
    );
  }

  void addServices() async {
    try {
      var notificationControlDescriptor = BleDescriptor(
        uuid: "00002902-0000-1000-8000-00805F9B34FB",
        value: Uint8List.fromList([0, 1]),
        permissions: [
          AttributePermissions.readable.index,
          AttributePermissions.writeable.index
        ],
      );

      // custom service for message
      await BlePeripheral.addService(
        BleService(
          uuid: customMessage,
          primary: true,
          characteristics: [
            BleCharacteristic(
              uuid: characteristicMessage,
              properties: [
                CharacteristicProperties.read.index,
                CharacteristicProperties.notify.index,
                CharacteristicProperties.write.index,
              ],
              descriptors: [notificationControlDescriptor],
              value: Uint8List.fromList(utf8.encode("Connect BLE")),
              permissions: [
                AttributePermissions.readable.index,
                AttributePermissions.writeable.index
              ],
            ),
          ],
        ),
      );
      Get.log("Services added");
    } catch (e) {
      Get.log("Error: $e");
    }
  }

  void getAllServices() async {
    List<String> services = await BlePeripheral.getServices();
    Get.log(services.toString());
  }

  void removeServices() async {
    await BlePeripheral.clearServices();
    Get.log("Services removed");
  }

  /// Update characteristic value, to all the devices which are subscribed to it
  void updateCharacteristic(String deviceId) async {
    try {
      await BlePeripheral.updateCharacteristic(
        characteristicId: characteristicMessage,
        value: utf8.encode("reset"),
        deviceId: deviceId,
      );
      Get.log('update susscess $deviceId');
    } catch (e) {
      Get.log("UpdateCharacteristicError: $e");
    }
  }
}
