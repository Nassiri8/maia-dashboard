module.exports = function(app) {

    const produit = require('../controllers/produit.controller.js');

    app.get('/produits', produit.findAll);
    app.post('/produit', produit.create);
    app.get('/produit/:name/:code', produit.findByName);
    app.put('/produits/:name', produit.updateProduit);

}
