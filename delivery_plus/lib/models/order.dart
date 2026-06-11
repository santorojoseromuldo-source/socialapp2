class Order {
  final int id;
  final int customerId;
  final int businessId;
  final int? deliveryId;
  final String status;
  final double total;

  Order({required this.id, required this.customerId, required this.businessId, this.deliveryId, required this.status, required this.total});

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      customerId: json['customer_id'],
      businessId: json['business_id'],
      deliveryId: json['delivery_id'],
      status: json['status'],
      total: json['total'].toDouble(),
    );
  }
}
