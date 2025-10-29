import express from "express";
// import { loadEnvFile } from "node:process";
import todosRoutes from "./routes/todos.routes";
import usersRoutes from "./routes/users.routes";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv  from 'dotenv'
// loadEnvFile(); // cargar las variables de entorno
dotenv.config()

const app = express();
app.use(express.json())// middleware, parsea el body de las peticiones a JSON

app.get("/", (req, res) => {
  res.send("TODO APP API");
});

// un middleware para definir las rutas
app.use("/todos", todosRoutes);
app.use("/users", usersRoutes);

app.use(errorHandler) // middleware propio para manejar errores

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
