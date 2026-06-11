import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:delivery_plus/main.dart';

void main() {
  testWidgets('Counter increment smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const DeliveryPlusApp());
    expect(find.text('Delivery Plus'), findsOneWidget);
  });
}
