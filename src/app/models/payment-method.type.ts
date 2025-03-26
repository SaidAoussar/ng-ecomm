export interface PaymentMethod {
  type: "creditCard" | "paypal" | "applePay" | "googlePay";
  cardNumber?: string;
  nameOnCard?: string;
  expirationDate?: string;
  cvv?: string;
}
