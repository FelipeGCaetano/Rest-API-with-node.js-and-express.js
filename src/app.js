import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js";
import routes from "./routes/index.js";

// Conexão com o banco
db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
});

//Instancia express
const app = express();
app.use(express.json())
routes(app);

export default app