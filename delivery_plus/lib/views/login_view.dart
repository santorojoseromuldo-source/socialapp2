import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../viewmodels/login_viewmodel.dart';
import 'dashboard_user.dart';
import 'dashboard_business.dart';
import 'dashboard_delivery.dart';

class LoginView extends StatelessWidget {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<LoginViewModel>(context);

    return Scaffold(
      backgroundColor: Colors.black,
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Delivery Plus',
              style: TextStyle(color: Colors.blueAccent, fontSize: 32, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 40),
            TextField(
              controller: _emailController,
              style: const TextStyle(color: Colors.white),
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _passwordController,
              obscureText: true,
              style: const TextStyle(color: Colors.white),
              decoration: const InputDecoration(labelText: 'Password'),
            ),
            const SizedBox(height: 40),
            viewModel.isLoading
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: () async {
                      bool success = await viewModel.login(_emailController.text, _passwordController.text);
                      if (success && context.mounted) {
                        Widget next;
                        switch (viewModel.user?.role) {
                          case 'business': next = const DashboardBusiness(); break;
                          case 'delivery': next = const DashboardDelivery(); break;
                          default: next = const DashboardUser();
                        }
                        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => next));
                      }
                    },
                    child: const Text('Entrar'),
                  ),
          ],
        ),
      ),
    );
  }
}
