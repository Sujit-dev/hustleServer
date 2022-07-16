import * as users from "./../controllers/users";

const userRoutes = async (fastify: any, options: any) => {
  fastify.get("/", users.getAllUsers);

  fastify.get("/:userId", users.getUser);

  fastify.post("/:phoneNumber", users.createUser);

  fastify.patch("/:userId", users.updateUser);

  fastify.delete("/:userId", users.deleteUser);
};

export default userRoutes;
