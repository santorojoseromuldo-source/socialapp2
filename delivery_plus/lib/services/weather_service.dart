import 'dart:convert';
import 'package:http/http.dart' as http;

class WeatherService {
  final String apiKey = "YOUR_API_KEY";

  Future<String> getWeather() async {
    return "25°C - Sunny";
  }
}
