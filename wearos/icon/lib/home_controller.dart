// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:ble_peripheral/ble_peripheral.dart';
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  RxBool isAdvertising = false.obs;
  RxBool isBleOn = false.obs;
  RxList<String> devices = <String>[].obs;

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
      // 0x64, // 심박수 예시 (예: 100 bpm)
      // 0x02, // 펌웨어 버전 (예: 버전 2)
    ]),
  );

  // Battery Service
  // String serviceBattery = "0000180F-0000-1000-8000-00805F9B34FB";
  // String characteristicBatteryLevel = "00002A19-0000-1000-8000-00805F9B34FB";
  // String serviceBattery = "00001800-0000-1000-8000-00805f9b34fb";
  // String characteristicBatteryLevel = "00002a00-0000-1000-8000-00805f9b34fb";
  String serviceBattery = "00001811-0000-1000-8000-00805F9B34FB";
  String characteristicBatteryLevel = "00002A46-0000-1000-8000-00805F9B34FB";

  // custom Service
  String customMessage = '12345678-1234-1234-1234-123456789abc';
  String characteristicMessage = '87654321-4321-4321-4321-cba987654321';

  // Test service
  // String serviceTest = "180D-0000-1000-8000-00805F9B34FB";
  // String characteristicTest = "00002A18-0000-1000-8000-00805F9B34FB";
  // 장치 정보 uuid 0000180A-0000-1000-8000-00805F9B34FB
  // 모델 특성 정보 00002A24-0000-1000-8000-00805F9B34FB
  String serviceTest = "1811-0000-1000-8000-00805F9B34FB";
  String characteristicTest = "00002A46-0000-1000-8000-00805F9B34FB";
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
          return ReadRequestResult(value: utf8.encode("Hello World"));
        });

    // 중앙 장치가 특정 특성에 데이터를 쓰려고 할 때 호출
    // deviceId: 요청을 보낸 중앙 장치 식별자
    // characteristicId: 데이터가 쓰여지려는 특성의 식별자
    // offset: 쓰기 요청이 시작되는 데이터의 오프셋
    // value: 쓰기 요청에 포함된 실제 데이터
    // 쓰기 요청을 처리한 후 요청의 성공 여부를 WriteRequestResult를 반환한다.
    BlePeripheral.setWriteRequestCallback(
            (deviceId, characteristicId, offset, value) {
          String receivedData = utf8.decode(value as Uint8List);
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
      // services: [serviceBattery, serviceTest],
      services: [customMessage],
      localName: deviceName,
      manufacturerData: manufacturerData,
      addManufacturerDataInScanResponse: true,
    );
  }

  // BLE peripheral 장치 서비스 추가 함수
  // BLE 페리페럴 장치에서 서비스와 특성을 설정하고
  // 중앙 장치와의 상호작용을 정의한다.
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

      // await BlePeripheral.addService(
      //   BleService(
      //     uuid: serviceBattery,
      //     // primary: 이 서비스가 주 서비스임을 나타냄
      //     primary: true,
      //     // characteristics: 특성 정의
      //     characteristics: [
      //       BleCharacteristic(
      //         // 읽기와 알림 속성 존재
      //         // 해당 데이터를 읽을 수 있고,
      //         // 페리페럴 장치가 이 특성의 값이 변경될 때마다
      //         // 중앙 장치에 알림을 보낼 수 있음을 의미
      //         uuid: characteristicBatteryLevel,
      //         properties: [
      //           CharacteristicProperties.read.index,
      //           CharacteristicProperties.notify.index
      //         ],
      //         value: null,
      //         permissions: [AttributePermissions.readable.index],
      //       ),
      //     ],
      //   ),
      // );
      //
      // await BlePeripheral.addService(
      //   BleService(
      //     uuid: serviceTest,
      //     primary: true,
      //     characteristics: [
      //       BleCharacteristic(
      //         uuid: characteristicTest,
      //         properties: [
      //           // 읽기, 쓰기, 알림 속성을 가지고
      //           // 중앙 장치는 이 특성의 데이터를 읽고, 쓰고, 값의 변경 사항에 대한 알림을 받을 수 있음
      //           CharacteristicProperties.read.index,
      //           CharacteristicProperties.notify.index,
      //           CharacteristicProperties.write.index,
      //         ],
      //         // descriptors: notificationControlDescriptor를 이 특성에 추가하여,
      //         // 중앙 장치가 알림을 구독할 수 있게 함
      //         descriptors: [notificationControlDescriptor],
      //         value: null,
      //         permissions: [
      //           AttributePermissions.readable.index,
      //           AttributePermissions.writeable.index
      //         ],
      //       ),
      //     ],
      //   ),
      // );

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
  // 조회된 서비스 목록을 로그로 출력함
  // BLE 장치에서 어떤서비스들이 사용 가능한지 확인하는데 사용
  // BLE 주변 장치와 통신하는 애플리케이션 개발 과정에서,
  // 주변 장치가 제공하는 서비스를 파악하거나 디버깅할 때 유용하게 사용될 수 있습
  //
  // 특정 서비스에 대한 접근이 필요한 경우 먼저 getAllServices() 함수를 사용하여
  // 해당 서비스가 장치에 존재하는지 확인한 후 필요한 작업 진행 가능
  // BLE 기반 애플리케이션에서 BLE 주변 장치와의 상호작용을 위한 기본적인 정보 조회 기능 중 하나로,
  // BLE 통신 과정에서 필수적인 사전 조사 작업을 수행하는 데 도움
  void getAllServices() async {
    // BlePeripheral.getServices() 메서드를 호출하여 비동기적으로
    // BLE 주변 장치에서 제공하는 모든 서비스의 UUID 목록을 List<String> 형태로 받아옴
    List<String> services = await BlePeripheral.getServices();
    Get.log(services.toString());
  }

  // BLE peripheral 장치에서 모든 서비스 제거 함수
  // 기기의 서비스 구성을 초기화하거나 변경해야 할 때 사용
  // 서비스 구성 변경: BLE 장치의 서비스 구성을 변경하고자 할 때 기존에 등록된 서비스를 모두 제거한 후 새로운 서비스를 추가할 수 있습니다.
  // 디버깅 및 테스트: 애플리케이션 개발 과정에서 서비스의 추가 및 제거 작업을 반복적으로 수행하여 서비스 구성을 테스트하고 디버깅할 수 있습니다.
  // 장치 초기화: 특정 상황에서 BLE 장치의 서비스 구성을 초기 상태로 되돌리고자 할 때 사용됩니다.
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
        value: utf8.encode("Test Data"),
        // 업데이트할 대상 장치의 식별자
        deviceId: deviceId,
      );
      Get.log('update susscess $deviceId');
    } catch (e) {
      Get.log("UpdateCharacteristicError: $e");
    }
  }
}