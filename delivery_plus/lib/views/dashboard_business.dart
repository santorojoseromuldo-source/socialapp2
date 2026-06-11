import 'package:flutter/material.dart';

class DashboardBusiness extends StatelessWidget {
  const DashboardBusiness({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Negocio Dashboard')),
      body: const Center(child: Text('Panel de Negocio')),
    );
  }
}
