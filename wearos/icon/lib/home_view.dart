import 'package:ble_peripheral/ble_peripheral.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:wear/wear.dart';
import 'home_controller.dart';
import 'package:permission_handler/permission_handler.dart';
class HomeView extends GetView<HomeController> {
  const HomeView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.black),
            borderRadius: const BorderRadius.all(Radius.circular(40)),
            color: Colors.black,
          ),
          child: _buildUI(),
        ),
    );
  }
  Widget _buildUI() {
    return WatchShape(
      builder: (BuildContext context, WearShape shape, Widget? child) {
        return Center(
          child: SingleChildScrollView(
            child:
            Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Obx(() {
                        switch (controller.status.value) {
                        case 'init':
                          return _buildInitialScreen();
                        case 'advertising':
                          return _buildAdvertisingScreen();
                        case 'bleOn':
                          return _buildBleOnScreen();
                        case 'danger':
                          return _buildDangerScreen();
                        case 'discomfort':
                          return _buildDiscomfortScreen();
                        case 'hungry':
                          return _buildHungryScreen();
                        case 'normal':
                          return _buildDefaultScreen();
                        case 'pain':
                          return _buildPainScreen();
                        case 'sleep':
                          return _buildSleepScreen();
                        default:
                          return _buildDefaultScreen();
                        }
                      }),

                      // const Divider(),
                      //       const ElevatedButton(
                      //         onPressed: BlePeripheral.askBlePermission,
                      //         child: Text('Ask Permission'),
                      //       ),
                      //       ElevatedButton(
                      //         onPressed: controller.addServices,
                      //         child: const Text('Add Services'),
                      //       ),
                      //       ElevatedButton(
                      //         onPressed: controller.getAllServices,
                      //         child: const Text('Get Services'),
                      //       ),
                      //       ElevatedButton(
                      //         onPressed: controller.removeServices,
                      //         child: const Text('Remove Services'),
                      //       ),
                      //       ElevatedButton(
                      //         onPressed: controller.startAdvertising,
                      //         child: const Text('Start Advertising'),
                      //       ),
                      //       ElevatedButton(
                      //         onPressed: () async {
                      //           await BlePeripheral.stopAdvertising();
                      //           controller.isAdvertising.value = false;
                      //         },
                      //         child: const Text('Stop Advertising'),
                      //       ),
                      //       ElevatedButton(
                      //         onPressed: () async {
                      //           controller.updateCharacteristic(controller.devices[0]);
                      //         },
                      //         child: const Text('Update Characteristic value'),
                      //       ),
                      // const Divider(),
                      // const Center(child: Text("Devices")),
                      // Padding(
                      //   padding: const EdgeInsets.all(8.0),
                      //   child: Obx(() => SizedBox(
                      //     height: 200,
                      //     child: ListView.builder(
                      //     itemCount: controller.devices.length,
                      //     itemBuilder: (BuildContext context, int index) {
                      //       return Card(
                      //         child: ListTile(
                      //           title: Text(controller.devices[index]),
                      //         ),
                      //       );
                      //     },
                      //   ),
                      //   ),
                      // )),
                  //   ],
                  // ),
                // )
                ],
              ),
          ),
        );
      },
    );
  }

  void startAdv() async {
    controller.startAdvertising;
    controller.addServices;
  }
  void requestBluetoothPermission() async {
    var status = await Permission.bluetoothConnect.status;
    if (!status.isGranted) {
      await Permission.bluetoothConnect.request();
    }
  }
  void setStatus(String status) {
    controller.status.value = status;

    if(status == 'init') {
      requestBluetoothPermission();
      if(controller.isAdvertising.value == false) {
        controller.startAdvertising();
        controller.addServices();
      }
      controller.getAllServices();
    }
  }

  Widget _buildInitialScreen() {
    // 초기 화면 UI 구성
    return Center(child: Column(
      children: [
        Text('초기 화면', style: TextStyle(color: Colors.white),),
        Obx(() =>
            Text("Advertising: ${controller.isAdvertising.value}", style: TextStyle(color: Colors.white),)),
        Obx(() => Text("BleOn: ${controller.isBleOn.value}", style: TextStyle(color: Colors.white),)),
        Obx(() => Text("status: ${controller.status.value}", style: TextStyle(color: Colors.white),)),
        const ElevatedButton(
          onPressed: BlePeripheral.askBlePermission,
          child: Text('Ask Permission'),
        ),
        ElevatedButton(
          onPressed: controller.addServices,
          child: const Text('Add Services'),
        ),
        ElevatedButton(
          onPressed: controller.startAdvertising,
          child: const Text('Start Advertising'),
        ),
        ElevatedButton(
            onPressed: () {
              setStatus('normal');
            },
            child: const Text('switc main'),
          ),
      ],
    ));
  }

  Widget _buildAdvertisingScreen() {
    // 연결 화면 UI 구성 [TEST 코드-수정예정]
    return Center(
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 150,
            height: 150,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/hungry.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              onPressed: () {setStatus('normal');},
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBleOnScreen() {
    // BLE가 켜져있을 때의 화면 UI 구성
    return Center(child: Text('BLE is On'));
  }

  Widget _buildDefaultScreen() {
    // 기본 화면 UI 구성
    return Center(
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 150,
            height: 150,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/nomal.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('재연결'),
              style: TextButton.styleFrom(foregroundColor: Colors.white),
              onPressed: () {setStatus('init');},
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHungryScreen() {
    return Center(
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 150,
            height: 150,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/hungry.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              onPressed: () async {
                controller.updateCharacteristic(controller.devices[0]);
                setStatus('normal');
              },
              style: TextButton.styleFrom(foregroundColor: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDangerScreen() {
    return Center(
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 150,
            height: 150,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/danger.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              onPressed: () async {
                controller.updateCharacteristic(controller.devices[0]);
                setStatus('normal');
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDiscomfortScreen() {
    return Center(
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 150,
            height: 150,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/discomfort.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              onPressed: () async {
                controller.updateCharacteristic(controller.devices[0]);
                setStatus('normal');
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPainScreen() {
    return Center(
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 150,
            height: 150,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/pain.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              onPressed: () async {
                controller.updateCharacteristic(controller.devices[0]);
                setStatus('normal');
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSleepScreen() {
    return Center(
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 150,
            height: 150,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/sleep.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              onPressed: () async {
                controller.updateCharacteristic(controller.devices[0]);
                setStatus('normal');
              },
            ),
          ),
        ],
      ),
    );
  }
}