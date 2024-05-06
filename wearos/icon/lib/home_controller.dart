// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:ble_peripheral/ble_peripheral.dart';
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  RxBool isAdvertising = false.obs;
  RxBool isBleOn = false.obs;
  RxList<String> devices = <String>[].obs;
  RxString status = 'init'.obs;

  void updateStatus(String newStatus) {
    status.value = newStatus;
    print(status.value);
  }

  String get deviceName => switch (defaultTargetPlatform) {
    TargetPlatform.android => "BleDroid",
    TargetPlatform.iOS => "BleIOS",
    TargetPlatform.macOS => "BleMac",
    TargetPlatform.windows => "BleWin",
    _ => "TestDevice"
  };

  var manufacturerData = ManufacturerData(
    manufacturerId: 0x0075,
    data: Uint8List.fromList([
      0x03, // 데이터 시작을 알리는 예시 바이트
      0x01, // 워치 활성화 상태 (예: 0x01은 활성화, 0x00은 비활성화)
    ]),
  );

  // custom Service
  String customMessage = '12345678-1234-1234-1234-123456789abc';
  String characteristicMessage = '87654321-4321-4321-4321-cba987654321';

  @override
  void onInit() {
    _initialize();

    // setup callbacks
    // BLE 상태 on/off 변경 감지
    BlePeripheral.setBleStateChangeCallback(isBleOn);

    // 광고 상태 변경 감지
    BlePeripheral.setAdvertisingStatusUpdateCallback(
            (bool advertising, String? error) {
          isAdvertising.value = advertising;
          Get.log("AdvertingStarted: $advertising, Error: $error");
        });

    // 중앙 장치의 가용성 변경 감지
    // 중앙 장치가 광고를 발견하거나 접근할 수 없게 될 때 함수 호출
    // deviceId: 중앙 장치 식별자
    // isAvailable: 장치의 가용성 상태
    BlePeripheral.setBleCentralAvailabilityCallback((deviceId, isAvailable) {
      Get.log("OnDeviceAvailabilityChange: $deviceId : $isAvailable");
      if (isAvailable) {
        if (!devices.any((element) => element == deviceId)) {
          devices.add(deviceId);
          Get.log("$deviceId adding");
        } else {
          Get.log("$deviceId already exists");
        }
      } else {
        devices.removeWhere((element) => element == deviceId);
      }
    });

    // 중앙 장치가 특정 characteristic의 값을 읽으려 할 때 호출
    // deviceId: 요청한 중앙 장치 식별자
    // characteristicId: 읽으려고 하는 특성의 식별자
    // offset: 요청된 데이터의 시작 지점
    // ReadRequestResult를 반환하여 요청한 데이터를 중앙 장치에 전달
    BlePeripheral.setReadRequestCallback(
            (deviceId, characteristicId, offset, value) {
          Get.log("ReadRequest: $deviceId $characteristicId : $offset : $value");
          return ReadRequestResult(value: utf8.encode("connect device"));
        });

    // 중앙 장치가 특정 특성에 데이터를 쓰려고 할 때 호출
    // deviceId: 요청을 보낸 중앙 장치 식별자
    // characteristicId: 데이터가 쓰여지려는 특성의 식별자
    // offset: 쓰기 요청이 시작되는 데이터의 오프셋
    // value: 쓰기 요청에 포함된 실제 데이터
    // 쓰기 요청을 처리한 후 요청의 성공 여부를 WriteRequestResult를 반환
    BlePeripheral.setWriteRequestCallback(
            (deviceId, characteristicId, offset, value) {
          String receivedData = utf8.decode(value as Uint8List);
          status.value = receivedData;  // update ui
          Get.log("WriteRequest: $deviceId $characteristicId : $offset : $value : $receivedData");
          // return WriteRequestResult(status: 144);
          // /////
          // String receivedData = utf8.decode(value as Uint8List);
          // Get.log("Received data: $receivedData");
          // updateCharacteristic(deviceId, "Response to received data");
          // return WriteRequestResult(status: BluetoothGattStatus.success.index);

          return null;
        });
    super.onInit();
  }

  void _initialize() async {
    try {
      await BlePeripheral.initialize();
    } catch (e) {
      Get.log("InitializationError: $e");
    }
  }

  // BLE peripheral 장치 광고 시작 함수
  // services된 service, localName, manufacturerData 광고 데이터
  // addManufacturerDataInScanResponse 옵션: 스캔 응답에 제조업체 데이터 포함
  // services된 서비스 UUID를 기준으로 web bluetooth api에서 requestDevice 가능
  // services된 서비스의 characteristics에 접근 가능
  void startAdvertising() async {
    Get.log("Starting Advertising");
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

  // BLE peripheral 장치 서비스 추가 함수
  // BLE 페리페럴 장치에서 서비스와 특성을 설정
  // 중앙 장치와의 상호작용을 정의
  // service에는 각 characteristics, descriptor 포함
  void addServices() async {
    try {
      var notificationControlDescriptor = BleDescriptor(
        // uuid: 해당 uuid의 descriptor 생성
        // 클라이언트의 특성 구성 디스크립터(CCCD: Client Characteristic Configuration Descriptor)
        // CCCD는 클라이언트가 해당 특성의 알림을 구독할 수 있게 함
        // 2908->2902가 올바른 cccd
        uuid: "00002902-0000-1000-8000-00805F9B34FB",
        // value: descriptor의 초기값 Uint8List로 구성
        value: Uint8List.fromList([0, 1]),
        // permissions: 권한
        // 현재 읽기와 쓰기가 가능하도록 설정
        permissions: [
          AttributePermissions.readable.index,
          AttributePermissions.writeable.index
        ],
      );

      // custom service for message
      await BlePeripheral.addService(
        BleService(
          uuid: customMessage,
          // primary: 이 서비스가 주 서비스임을 나타냄
          primary: true,
          // characteristics: 특성 정의
          characteristics: [
            BleCharacteristic(
              // 읽기와 알림 속성 존재 해당 데이터를 읽을 수 있고, 페리페럴 장치가 이 특성의 값이 변경될 때마다 중앙 장치에 알림을 보낼 수 있음을 의미
              uuid: characteristicMessage,
              properties: [
                // 중앙 장치는 이 특성의 데이터를 읽고, 쓰고, 값의 변경 사항에 대한 알림을 받을 수 있음
                CharacteristicProperties.read.index,
                CharacteristicProperties.notify.index,
                CharacteristicProperties.write.index,
              ],
              // descriptors: notificationControlDescriptor를 이 특성에 추가하여 중앙 장치가 알림을 구독할 수 있게 함
              descriptors: [notificationControlDescriptor],
              value: Uint8List.fromList(utf8.encode("Connect BLE")),
              permissions: [AttributePermissions.readable.index,
                AttributePermissions.writeable.index],
            ),
          ],
        ),
      );
      Get.log("Services added");
    } catch (e) {
      Get.log("Error: $e");
    }
  }

  // BLE peripheral 장치에서 제공하는 모든 서비스의 목록을 비동기적으로 조회
  void getAllServices() async {
    // BlePeripheral.getServices() 메서드를 호출하여 비동기적으로
    // BLE 주변 장치에서 제공하는 모든 서비스의 UUID 목록을 List<String> 형태로 받아옴
    List<String> services = await BlePeripheral.getServices();
    Get.log(services.toString());
  }

  // BLE peripheral 장치에서 모든 서비스 제거 함수
  void removeServices() async {
    // BlePeripheral.clearServices() 메서드를 호출하여 BLE 주변 장치에서 모든 서비스 제거
    // BLE 장치는 더 이상 어떠한 서비스도 제공하지 않음
    await BlePeripheral.clearServices();
    Get.log("Services removed");
  }

  // 특정 characteristic의 값을 업데이트하여
  // 이에 구독(subscribed)중인 모든 장치들에게 변화된 값을 전달하는 기능 수행
  // 특정 데이터를 전달하거나 상태를 업데이트할 필요가 있을 때 사용
  // 예를 들어, 센서 값을 업데이트하거나 애플리케이션의 상태 변화를 BLE 장치들과 공유할 때 유용
  // 실시간으로 데이터를 공유하고자 할 때 중요한 역할
  /// Update characteristic value, to all the devices which are subscribed to it
  void updateCharacteristic(String deviceId) async {
    try {
      // BlePeripheral.updateCharacteristic()로 특정 characteristic의 값 업데이트
      await BlePeripheral.updateCharacteristic(
        // 업데이트할 characteristic의 식별자
        // characteristicId: characteristicBatteryLevel,
        characteristicId: characteristicMessage,
        // 전달할 데이터로 사용
        value: utf8.encode("reset"),
        // 업데이트할 대상 장치의 식별자
        deviceId: deviceId,
      );
      Get.log('update susscess $deviceId');
    } catch (e) {
      Get.log("UpdateCharacteristicError: $e");
    }
  }
}