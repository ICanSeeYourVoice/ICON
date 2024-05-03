import 'package:ble_peripheral/ble_peripheral.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:wear/wear.dart';
import 'home_controller.dart';
import 'package:permission_handler/permission_handler.dart';
class HomeView extends GetView<HomeController> {
  const HomeView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(HomeController());  // build 아래 선언

    return Scaffold(
        body: Container(
          decoration: BoxDecoration(
            border: Border.all(color: Theme.of(context).colorScheme.background),
            borderRadius: const BorderRadius.all(Radius.circular(40)),
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
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    children: [
                      const SizedBox(height: 20),
                          Obx(() =>
                              Text("Advertising: ${controller.isAdvertising.value}")),
                      Obx(() => Text("BleOn: ${controller.isBleOn.value}")),
                      Obx(() => Text("status: ${controller.status.value}")),
                      const Divider(),
                            const ElevatedButton(
                              onPressed: BlePeripheral.askBlePermission,
                              child: Text('Ask Permission'),
                            ),
                            ElevatedButton(
                              onPressed: controller.addServices,
                              child: const Text('Add Services'),
                            ),
                            ElevatedButton(
                              onPressed: controller.getAllServices,
                              child: const Text('Get Services'),
                            ),
                            ElevatedButton(
                              onPressed: controller.removeServices,
                              child: const Text('Remove Services'),
                            ),
                            ElevatedButton(
                              onPressed: controller.startAdvertising,
                              child: const Text('Start Advertising'),
                            ),
                            ElevatedButton(
                              onPressed: () async {
                                await BlePeripheral.stopAdvertising();
                                controller.isAdvertising.value = false;
                              },
                              child: const Text('Stop Advertising'),
                            ),
                            ElevatedButton(
                              onPressed: () async {
                                controller.updateCharacteristic(controller.devices[0]);
                              },
                              child: const Text('Update Characteristic value'),
                            ),
                      const Divider(),
                      const Center(child: Text("Devices")),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Obx(() => SizedBox(
                          height: 200,
                          child: ListView.builder(
                          itemCount: controller.devices.length,
                          itemBuilder: (BuildContext context, int index) {
                            return Card(
                              child: ListTile(
                                title: Text(controller.devices[index]),
                              ),
                            );
                          },
                        ),
                        ),
                      )),
                    ],
                  ),
                )
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}