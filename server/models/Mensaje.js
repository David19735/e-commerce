import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Mensaje=db.define('mensajes',{
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default Mensaje;