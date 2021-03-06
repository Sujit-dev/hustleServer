import Fastify from "fastify";
import "dotenv/config";
import fastifyCors from "@fastify/cors";
import mongoose, { ConnectOptions } from "mongoose";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import hustlerRoutes from "./routes/hustlerRoutes";

const fastify = Fastify();
fastify.get('/', function(req,res){
  res.send('Working')
})
fastify.register(fastifyCors);
fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(userRoutes, { prefix: "/users" });
fastify.register(hustlerRoutes, { prefix: "/hustlers" });

const CONNECTION_URL = process.env.CONNECTION_URL || "";
const PORT = process.env.PORT;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(async () => {
    console.log("connected to database");
    const serverPort = parseInt(process.env.PORT || "");
    const port = Number.isInteger(serverPort) ? serverPort : 3000;
    await fastify.listen({port: port},function (err, address) {
      if (err) {
        console.log(err)
      }else{
        console.log(address)
      }
    });
    console.log(`Server started at port ${port}`);
  })
  .catch((err) => {
    console.log(err);
    
  });
