import 'package:ble_peripheral/ble_peripheral.dart';
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
                      case 'tired':
                        return _buildTiredScreen();
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
          style: ButtonStyle(
              backgroundColor:
                  MaterialStateProperty.all(Color.fromRGBO(123, 183, 247, 1)),
              foregroundColor: MaterialStateProperty.all(Colors.white)),
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
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        const Text(
          '연결 버튼을 눌러주세요.\n아이콘>설정>워치연결에서\n연결해주세요.',
          style: TextStyle(color: Colors.white),
          textAlign: TextAlign.center,
        ),
        Obx(() => controller.isAdvertising.value
            ? ElevatedButton(
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(
                      Color.fromRGBO(123, 183, 247, 1)),
                  foregroundColor: MaterialStateProperty.all(Colors.white),
                ),
                onPressed: BlePeripheral.stopAdvertising,
                child: const Text('연결 해제'))
            : ElevatedButton(
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(
                      Color.fromRGBO(123, 183, 247, 1)),
                  foregroundColor: MaterialStateProperty.all(Colors.white),
                ),
                onPressed: controller.checkStartAdvertising,
                child: const Text('연결 하기'))),
        SizedBox(
          height: 40,
          width: 100,
          child: TextButton(
            child: Text('닫기'),
            onPressed: () async {
              controller.updateStatus('normal');
            },
            style: TextButton.styleFrom(
              foregroundColor: Colors.white,
            ),
          ),
        ),
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
            width: 200,
            height: 200,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/nomal-large.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 10,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('연결 설정'),
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
            width: 200,
            height: 200,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/hungry-large.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 10,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              onPressed: () async {
                // controller.updateCharacteristic(controller.devices[0]);
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
            width: 200,
            height: 200,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/danger-large.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 10,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              style: TextButton.styleFrom(foregroundColor: Colors.black),
              onPressed: () async {
                // controller.updateCharacteristic(controller.devices[0]);
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
            width: 200,
            height: 200,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/discomfort-large.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 10,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              style: TextButton.styleFrom(foregroundColor: Colors.white),
              onPressed: () async {
                // controller.updateCharacteristic(controller.devices[0]);
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
            width: 200,
            height: 200,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/pain-large.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 10,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              style: TextButton.styleFrom(foregroundColor: Colors.white),
              onPressed: () async {
                // controller.updateCharacteristic(controller.devices[0]);
                controller.updateStatus('normal');
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTiredScreen() {
    return Center(
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 200,
            height: 200,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(32.5),
              child: const Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/tired-large.png'),
              ),
            ),
          ),
          Positioned(
            bottom: 10,
            left: 0,
            right: 0,
            child: TextButton(
              child: Text('닫기'),
              style: TextButton.styleFrom(foregroundColor: Colors.white),
              onPressed: () async {
                // controller.updateCharacteristic(controller.devices[0]);
                controller.updateStatus('normal');
              },
            ),
          ),
        ],
      ),
    );
  }
}
