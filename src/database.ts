import {open, Database} from "sqlite"
import sqlite3 from 'sqlite3'

let instance: Database | null = null

export async function connect(){
    if (instance != null)
        return instance
    
    const db = await open({
        filename: "database.sqlite",
        driver: sqlite3.Database
    })

    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT, 
            senha TEXT
        );

        CREATE TABLE IF NOT EXISTS serie (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nomes TEXT,
            genero TEXT, 
            quantidade_ep TEXT,
            lancamento TEXT
        );

        CREATE TABLE IF NOT EXISTS diretor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            diretor TEXT,
            nascimento TEXT, 
            nacionalidade TEXT
        );

        CREATE TABLE IF NOT EXISTS personagem (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            personagem TEXT,
            ator TEXT, 
            descricao TEXT
        );
    `)
    
    instance = db
    return db
}