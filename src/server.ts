import express from "express"
import { connect } from "./database"

const app = express()

app.use(express.json())
app.use(express.static(__dirname + "/../public"))

app.post("/usuario", async (req, res) => {
    const db = await connect()
    const { nome, email, senha } = req.body
    const { lastID } = await db.run(`INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)`, [nome, email, senha])
    res.json({ lastID })
})

app.post("/login", async (req, res) => {
    const db = await connect()
    const { email, senha } = req.body
    const usuarios = await db.get("SELECT id, email FROM usuarios WHERE email = ? and senha = ?", [email, senha])
    if (!usuarios){
        res.status(401).json({mensagem:"Acesso negado"})
        return
    } 
    res.json({token:"deu tudo certo "}) 
})

// app.post("/home", async (req, res) => {
//     const db = await connect()
//     const { nomes, gen, qtd, lan } = req.body
//     const serie = await db.get("SELECT id, nomes, gen, qtd, lan FROM serie)
// })


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/login.html")
// })

// app.get("/cadastro", (req, res) => {
//     res.sendFile(__dirname + "/public/cadastro.html")
// })

// let i = 0
// app.get("/raquel", (req, res) => {
//     console.log("oiiiiiiiiiiii")
//     res.send("abc " + i++)
// })

// app.get("/quemsou/:pessoa", (req, res) => {
//     res.send("vc é: " + req.params.pessoa)
// })

app.listen(3000, () => console.log("pronto"))