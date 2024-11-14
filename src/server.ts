import express from "express"
import { connect } from "./database"
import { sign } from "./util/jwt"

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
    const usuario = await db.get("SELECT id FROM usuarios WHERE email = ? and senha = ? LIMIT 1", [email, senha])
    if (!usuario){
        res.status(401).json({mensagem:"Acesso negado"})
        return
    } 
    const { id } = usuario
    const token = await sign({ id, email })
    res.json({ token }) 
})

app.post("/serie", async (req, res) => {
    const db = await connect()
    const { nomes, genero, quantidade_ep, lancamento } = req.body

    if (nomes.trim() == "") {
        res.status(400).json({ message: "nome da serie não pode ser vazio" });
        return
    }

    if (genero.trim() == "") {
        res.status(400).json({ message: "genero não pode ser vazio" });
        return
    }

    if (quantidade_ep.trim() == "") {
        res.status(400).json({ message: "quantidade de episodios não pode ser vazio" });
        return
    }

    if (lancamento.trim() == "") {
        res.status(400).json({ message: "ano de lançamento não pode ser vazio" });
        return
    }

    const serie = await db.run("INSERT INTO serie (nomes, genero, quantidade_ep, lancamento) VALUES (?, ?, ?, ?)",  [nomes, genero, quantidade_ep, lancamento])
    res.json("deu certo")
})


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