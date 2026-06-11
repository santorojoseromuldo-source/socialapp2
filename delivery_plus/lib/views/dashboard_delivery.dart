import 'package:flutter/material.dart';

class DashboardDelivery extends StatelessWidget {
  const DashboardDelivery({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Repartidor Dashboard')),
      body: const Center(child: Text('Panel de Repartidor')),
    );
  }
}
