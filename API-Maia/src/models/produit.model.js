var mongoose = require('mongoose');

var ProduitSchema = mongoose.Schema({
    name: String,
    EAN: Number,
    quantite: Number
});

module.exports = mongoose.model('Produit', ProduitSchema);
