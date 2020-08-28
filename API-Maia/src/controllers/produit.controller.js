var Produit = require('../models/produit.model.js');

//afficher tout les produits
exports.findAll = function(req, res) {
    Produit.find({ quantite :{$gt: 0}}, function(err, produit) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving produits." });
        } else {
            res.send(produit);
        }
    });
};

//ajouter un produit
exports.create = function(req, res) {

    if (!req.body.name && !req.body.code && !req.body.quantite) {
        return res.status(400).send({ message: "veuillez remplir tout les champs" });
    }
    
    var produit = new Produit({ name: req.body.name, EAN: req.body.code, quantite: req.body.quantite});
    
    produit.save(function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error with save product" });
        } else {
            res.send(data);
        }
    });
};

//afficher un produit By ...
exports.findByName = function(req, res) {

    Produit.find({ 'name': req.params.name, 'EAN': req.params.code }, function (err, prod) {
        if (err) {
            console.log(err);
            return res.send({ message: "Bad Name or EAN !" });
        } else {
            res.send(prod);
        }
      });
};

//modifier un user
exports.updateProduit = function(req, res) {

    const conditions = { name: req.params.name };

    Produit.update(conditions, { $set: { quantite: req.body.quantite }}, function(err) {
        if(err) {
            console.log(err);
            return res.send({ message: "Bad Name." });
        } 
        
        res.send("modification done");
    });
}