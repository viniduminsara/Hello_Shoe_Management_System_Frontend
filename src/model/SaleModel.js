class SaleModel{
    constructor(customerId,totalPrice,purchaseDate,paymentMethod,addedPoints,userId,orderItems) {
        this.customerId = customerId;
        this.totalPrice = totalPrice;
        this.purchaseDate = purchaseDate;
        this.paymentMethod = paymentMethod;
        this.addedPoints = addedPoints;
        this.userId = userId;
        this.orderItems = orderItems;
    }
}

export default SaleModel;