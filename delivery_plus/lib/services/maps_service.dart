import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapsService {
  Future<LatLng> getCurrentLocation() async {
    // Mock location for initialization
    return const LatLng(-34.6037, -58.3816);
  }
}
