import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'viewmodels/login_viewmodel.dart';
import 'views/login_view.dart';
import 'theme.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => LoginViewModel()),
      ],
      child: const DeliveryPlusApp(),
    ),
  );
}

class DeliveryPlusApp extends StatelessWidget {
  const DeliveryPlusApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Delivery Plus',
      theme: DeliveryPlusTheme.darkTheme,
      home: LoginView(),
      debugShowCheckedModeBanner: false,
    );
  }
}
