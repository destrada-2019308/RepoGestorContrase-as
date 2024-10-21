import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import userRoutes from "../src/user/user.routes.js";
import passwordRoutes from "../src/passwordControl/password.routes.js";

const app = express();
config(); 
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //Aceptar o denegar solicitudes de diferentes orígenes (local, remoto) / políticas de acceso
app.use(helmet()) //Aplica capa de seguridad básica al servidor
app.use(morgan('dev')) //Logs de solicitudes al servidor HTTP

app.use('/user', userRoutes);
app.use('/password', passwordRoutes);

export const initServer = () => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}