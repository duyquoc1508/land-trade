import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";
import cetificationRoutes from "./cetification/cetification.route";

export default app => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/cetification", cetificationRoutes);
};
