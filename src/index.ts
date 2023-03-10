import express from "express";
import { config } from "dotenv"
/* import { pool } from "./database"; */
import { connection } from "./database";
const app = express()
app.use(express.json())

config()

app.post("/create-user", (req: any, res: any) => {
    const { name, idade } = req.body
    connection.query(
        'INSERT INTO users (name, idade) VALUES (?,?)',
        [name, idade],
        (error, results, fields)=>{
            connection.end()
            if(error){return res.status(400).json(error)}
            return res.status(200).json({ message: "Usuario criado com sucesso" })
        }
    )
})

app.listen(4000, () => { console.log("Servidor Rodando") })

connection.connect(err=>{
    if(err){
        console.log("Erro ao conectar com o banco de dados:")
        console.log(err)
        return
    }
    console.log("AWS RDS Conectado")
})