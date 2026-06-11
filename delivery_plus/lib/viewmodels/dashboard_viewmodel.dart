import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../models/product.dart';

class DashboardViewModel extends ChangeNotifier {
  final ApiService _apiService = ApiService();

  List<Product> _products = [];
  List<Product> get products => _products;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  Future<void> loadProducts() async {
    _isLoading = true;
    notifyListeners();
    _products = await _apiService.getProducts();
    _isLoading = false;
    notifyListeners();
  }
}
