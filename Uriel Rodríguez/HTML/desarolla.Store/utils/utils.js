//Importar nuestro modelo de datos
const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');

module.exports = {
    isAdmin: async function( req, res ){
        //Extrae la cookie SESSIONID
        var sessionID = req.cookies["SESSIONID"];
        
        //Si no existe la cookie de sesión, indicar que debe iniciar sesión
        if(!sessionID) {
            res.status(400).send({
                message: "Debe iniciar sesión para utilizar estos recursos"
            });
            return false;
        }

        var user = await User.findOne({ nickname: sessionID });
        if(user.userType === 'admin') {
            return true;
        }

        res.status(403).send({
            error: "El usuario no tiene privilegios para realizar esta operación"
        });
        return false;
    },
    genOrderID: function(){
        return Date.now();
    },
    genCartID: function() {
        var epoch = Date.now() + '' + Date.now() + '' + Date.now();
        epoch = Buffer.from(epoch).toString('base64');
        return epoch;
    },
    validateCart: async function(carrito) {
        /*var carrito = await Cart.findOne({
            id: cartID
        });*/
    
        var cart_issues = [];
        //Ejecuta 1 por 1 a la vez
        //Es más lento
        for (var i = 0; i < carrito.products.length; i++) {
            const product = carrito.products[i];
    
            //Comprobar que el producto existe... No se puede comprar algo que ya se quitó
            var productDB = await Product.findOne({
                sku: product.sku
            });
    
            //No encontró el producto en la DB. Lo eliminamos
            if (!productDB) {
                cart_issues.push({
                    product: {
                        sku: product.sku,
                        name: product.name
                    },
                    issue: "Este producto ha sido dado de baja del catálogo"
                });
    
                //Elimina el elemento a partir de la posición i, y lo va a hacer n veces
                carrito.products.splice(i, 1);
                i--;
                continue;
            } else {
                if (productDB.stock <= 0) {
                    cart_issues.push({
                        product: {
                            sku: product.sku,
                            name: product.name
                        },
                        issue: "Este producto no tiene stock por el momento"
                    });
    
                    carrito.products.splice(i, 1);
                    i--;
                    continue;
                } else if (productDB.stock < product.qty) {
                    product.qty = productDB.stock;
                    cart_issues.push({
                        product: {
                            sku: product.sku,
                            name: product.name
                        },
                        issue: "Este producto no tiene suficiente stock. Se le ha modificado al máximo existente"
                    });
                }
            }
    
            product.name = productDB.name;
            product.description = productDB.description;
            product.unit_price = productDB.price;
            product.images = productDB.images;
        }
    
        carrito.quantity = 0;
        carrito.total = 0;
        for (var i = 0; i < carrito.products.length; i++) {
            const product = carrito.products[i];
            carrito.quantity += product.qty;
            carrito.total += product.qty * product.unit_price;
        }
    
        carrito.markModified('products');
        await carrito.save();

        //console.log('El nuevo carrito: ');
        //console.log(cart_issues);
    
        return { cart: carrito, cart_issues: cart_issues };
    
    }
};