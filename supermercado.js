const mongoose = require('mongoose')
const conextion_Url = 'mongodb+srv://oscar-z:mongodb@mdb-akne0.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(conextion_Url, {useNewUrlParser: true}, err => {
    if (!err) console.log('Exito puto');  
})

const schema = mongoose.Schema

//** Schema DB */

const articulosSchema = new schema(
    {
        articulos: mongoose.Schema.ObjectId,
        nombre: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        existencias: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true}
)

const ticketSchema = new schema(
    {
        tickets: mongoose.Schema.ObjectId,
        
        subtotal:{
            type: Number,
            default: 1
        },
        IVA: {
            type: Number,
            default: 1
        },
        total: {
            type: Number
        },
        articulos: 
        [{ type: mongoose.Schema.ObjectId, ref: 'Articulos' }]}
)

//** Model DB */

const articulos = mongoose.model('Articulos', articulosSchema)

const tickets = mongoose.model('Tickets', ticketSchema)

//** Export */

module.exports = {
    articulos, tickets
}
// module.exports = {
//     tickets
// }