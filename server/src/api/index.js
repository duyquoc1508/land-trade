import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";
import certificationRoutes from "./certification/certification.route";
import uploadRoutes from "./upload/upload.route";
import notificationRoutes from "./notification/notification.route";
import transactionRoutes from "./transaction/transaction.route";
import onlinePaymentRoutes from "./onlinePayment/onlinePayment.route";
import pdfRoutes from "./pdf/pdf.route";
import exchangeRateRoutes from "./exchangeRate/exchangeRate.route";
import otpRoutes from "./otp/otp.route";

export default (app) => {
  app.use("/api/v1/upload", uploadRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/certification", certificationRoutes);
  app.use("/api/v1/notification", notificationRoutes);
  app.use("/api/v1/transaction", transactionRoutes);
  app.use("/api/v1/online_payment", onlinePaymentRoutes);
  app.use("/api/v1/pdf", pdfRoutes);
  app.use("/api/v1/exchange_rate", exchangeRateRoutes);
  app.use("/api/v1/otp", otpRoutes);
};
