import { createUser } from "../controllers/users";
import * as auth from "./../controllers/auth";

const authRoutes = async (fastify: any, options: any) => {
  fastify.get("/getotp/:phoneNumber", auth.generateOtp);

  fastify.post(
    "/register/:phoneNumber",
    { preHandler: [auth.verifyOtp] },
    createUser
  );

  fastify.post("/login/:userId", { preHandler: [auth.verifyOtp] }, auth.login);
};

export default authRoutes;
