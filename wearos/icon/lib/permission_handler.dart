import 'package:permission_handler/permission_handler.dart';

@pragma('vm:entry-point')
Future<void> getPermissionHandler() async {
  await getNotificationPermission();
}

Future<void> getNotificationPermission() async {
  if (await Permission.notification.isDenied) {
    print("알림이 거부되어있습니다. 다시 권한을 요청합니다");
    await Permission.notification.request();
  } else {
    print("알림이 허용되어있습니다.");
  }
}
