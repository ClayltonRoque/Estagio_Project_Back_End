import { openDb } from "../configDB.js";
// import Jwt  from "jsonwebtoken";
// import authMiddleware from ('./auth.js')

export async function selectColoboradores(req, res) {
    openDb().then(db =>{
        db.all('SELECT * FROM Coloborador')
        .then(coloboradores => res.json(coloboradores));
    })
}

export async function selectColoborador(req, res) {
    let id = req.body.id;
    openDb().then(db => {
        db.get('SELECT * FROM Coloborador WHERE id=?', [id])
        .then(coloborador => res.json(coloborador));
    })
}

export async function selectColoboradores_Login(req, res) {
    openDb().then(db =>{
        db.all('SELECT * FROM Coloborador_Login')
        .then(coloboradores_login => res.json(coloboradores_login));
    })
}

export async function insertColoborador(req, res) {
    let coloborador = req.body;
    openDb().then(db => {
        db.run('INSERT INTO Coloborador (nome, admissão, função, tipo_sanguineo) VALUES (?,?,?,?)', 
        [coloborador.nome, coloborador.admissão, coloborador.função, coloborador.tipo_sanguineo])
    })
    res.json({
        "statusCode": 200
    })
}

export async function insertColoborador_Login(req, res) {
    let coloborador = req.body;
    openDb().then(db => {
        db.run(`SELECT * FROM Coloborador_Login WHERE nome=? AND senha=? VALUES (?,?)`, 
        [coloborador.nome, coloborador.senha])
    })
    res.json({
        "statusCode": 200
    })
}

export async function coloborador_Authenticate(req, res) {
    let coloborador = req.body;
    openDb().then(db => {
        db.run('INSERT INTO Coloborador_Login (nome, senha) VALUES (?,?)', 
        [coloborador.nome, coloborador.senha])
    })
    res.json({
        "statusCode": 200
    })
}

export async function updateColoborador(req, res) {
    let coloborador = req.body;
    openDb().then(db => {
        db.run('UPDATE Coloborador SET nome=?, admissão=?, função=?, tipo_sanguineo=? WHERE id=?', 
        [coloborador.nome, coloborador.admissão, coloborador.função, coloborador.tipo_sanguineo, coloborador.id])
    })
    res.json({
        "statusCode": 200
    })
}

export async function deleteColoborador(req, res) {
    let id = req.body.id;
    openDb().then(db =>{
        db.get('DELETE FROM Coloborador WHERE id=?', [id])
        .then(res => res)
    })
    res.json({
        "statusCode": 200
    })
} 
