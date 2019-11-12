//** Libraries */
const express = require('express')
const bodyParser = require('body-parser')
const { articulos } = require('./supermercado')
const { tickets } = require('./supermercado')
//** Port setup */
const PORT = 3000
//** init express */
const app = express()
//** bodyParser Setup */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//** Post */

app.post("/add/articulo/", (req, res) =>{
    console.log(req.body)
    const { nombre, precio, existencias } = req.body
    const newArticulo = articulos({
        nombre,
        precio,
        existencias
    })
    newArticulo.save((err, articulos) => {
        !err 
        ? res.status(201).send(articulos)
        : res.status(400).send(err)
    })
})

app.post('/add/ticket', (req, res) => {
    console.log(req.body);
    const { subtotal, IVA, total, articulos } = req.body
    const newTicket = tickets ({
        subtotal,
        IVA,
        total,
        articulos
    })
    newTicket.save((err, tickets) => {
        !err
        ? res.status(201).send(tickets)
        : res.status(400).send(err)
    })
})

app.get('./all/tickets', (req, res) => {
    tickets.find()
    .populate()
    .exec()
    .then(tickets => {
        req.status(201).send(tickets)
    })
    .catch(err => res.status(404).send(err))
})

app.get('/all/articles', (req, res) => {
    articulos.find()
    .exec()
    .then(articulos => {
         req.status(201).send(articulos)
    })
    .catch(err => res.status(404).send(err))
})



//** listen */
app.listen(PORT, () =>{
    console.log(`El servidor se esta escuchando en el puerto ${PORT}`)    
})