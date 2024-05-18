import 'package:flutter/material.dart';
import 'package:icon/home_controller.dart';
import 'package:icon/home_view.dart';
import 'package:get/get.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

// background message
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  print('background message ${message.notification!.body}');
}

void getMyDeviceToken() async {
  final token = await FirebaseMessaging.instance.getToken();
  print("fcm Token::: $token");
  var homeController = Get.find<HomeController>();
  homeController.fcm_token.value = token!;
}

void initializeNotification() async {
  // background message notification
  getMyDeviceToken();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  final flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();
  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(const AndroidNotificationChannel(
          'high_importance_channel', 'high_importance_notification',
          importance: Importance.max));

  await flutterLocalNotificationsPlugin.initialize(const InitializationSettings(
    android: AndroidInitializationSettings("@mipmap/ic_launcher"),
  ));

  await FirebaseMessaging.instance.setForegroundNotificationPresentationOptions(
    alert: true,
    badge: true,
    sound: true,
  );
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  initializeNotification();
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    RemoteNotification? notification = message.notification;

    if (notification != null) {
      FlutterLocalNotificationsPlugin().show(
        notification.hashCode,
        notification.title,
        notification.body,
        const NotificationDetails(
            android: AndroidNotificationDetails(
          'high_importance_channel',
          'high_importance_notification',
          importance: Importance.max,
        )),
      );
      String messageString = message.notification!.body!;
      print('Foreground 메시지 수신: $messageString');

      // 메세지별 화면 상태
      var homeController = Get.find<HomeController>();
      if (messageString == '아기가 아파요!') {
        homeController.updateStatus('pain');
      } else if (messageString == '아기가 졸려요!') {
        homeController.updateStatus('tired');
      } else if (messageString == '아기가 배고파요!') {
        homeController.updateStatus('hungry');
      } else if (messageString == '아기가 불편해요!') {
        homeController.updateStatus('discomfort');
      } else if (messageString == '아기가 엎드려있어요!') {
        homeController.updateStatus('danger');
      }
    }
  });
  Get.put(HomeController());
  runApp(GetMaterialApp(
    debugShowCheckedModeBanner: false,
    theme: ThemeData(fontFamily: 'NPSfont'),
    home: HomeView(),
  ));
}
