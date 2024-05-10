import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:wear/wear.dart';
import 'home_controller.dart';

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
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Obx(() {
                  if (controller.isBleOn.value == false) {
                    return _buildBleScreen();
                  } else {
                    switch (controller.status.value) {
                      case 'init':
                        return _buildConnectionScreen();
                      case 'normal':
                        return _buildDefaultScreen();
                      case 'danger':
                        return _buildDangerScreen();
                      case 'discomfort':
                        return _buildDiscomfortScreen();
                      case 'hungry':
                        return _buildHungryScreen();
                      case 'pain':
                        return _buildPainScreen();
                      case 'sleep':
                        return _buildSleepScreen();
                      default:
                        return _buildConnectionScreen();
                    }
                  }
                }),
              ],
            ),
          ),
        );
      },
    );
  }

  // 권한이 승인 안된 상태
  Widget _buildBleScreen() {
    return Center(
        child: Column(
      children: [
        Text(
          '블루투스 권한을 승인해주세요.',
          style: TextStyle(color: Colors.white),
        ),
        ElevatedButton(
          onPressed: controller.checkPermission,
          child: Text('권한 요청'),
        ),
      ],
    ));
  }

  // 연결 화면
  Widget _buildConnectionScreen() {
    // 초기 화면 UI 구성
    return Center(
        child: Column(
      children: [
        const Text(
          '연결 버튼을\n눌러주세요.\n아이콘>설정>워치연결에서\n연결해주세요.',
          style: TextStyle(color: Colors.white),
          textAlign: TextAlign.center,
        ),
        Obx(() => Text(
              "Advertising: ${controller.isAdvertising.value}",
              style: TextStyle(color: Colors.white),
            )),
        ElevatedButton(
            onPressed: controller.checkStartAdvertising,
            child: const Text('연결')),
      ],
    ));
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
              onPressed: () {
                controller.updateStatus('init');
              },
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
                // print("devices list: ${controller.devices[0]}");
                // print("device id: ${controller.devicesId.value}");
                controller.updateCharacteristic(controller.devicesId.value);
                controller.updateStatus('normal');
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
                controller.updateCharacteristic(controller.devicesId.value);
                controller.updateStatus('normal');
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
                controller.updateCharacteristic(controller.devicesId.value);
                controller.updateStatus('normal');
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
                controller.updateCharacteristic(controller.devicesId.value);
                controller.updateStatus('normal');
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
                controller.updateCharacteristic(controller.devicesId.value);
                controller.updateStatus('normal');
              },
            ),
          ),
        ],
      ),
    );
  }
}
