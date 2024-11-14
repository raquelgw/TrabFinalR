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
        )    
    `)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS serie (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nomes TEXT,
            gen TEXT, 
            qtd TEXT,
            lan TEXT
        )    
    `)
    
    instance = db
    return db
}