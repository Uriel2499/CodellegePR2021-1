//Referencia del servidor de express
const express = require('express');

//Crear un enrutador para este micro-servicio
const router = express.Router();

//Importar nuestro modelo de datos
const User = require('../models/user');

//Importar el módulo de validate
const Validate = require('../validation/validate');

//Importar el módulo de utilities
const Utils = require('../utils/utils');

router.get('/getSession', async (req, res) => {
    const nickname = req.cookies["SESSIONID"];
    var user = await User.findOne({
        nickname: nickname
    });

    if(user) {
        return res.send({
            session: true
        });
    }

    res.clearCookie("SESSIONID");
    return res.send({
        session: false
    });
});

router.get('/all', async (req, res) => {

    var userIsAdmin = await Utils.isAdmin(req, res);
    if (!userIsAdmin) {
        return;
    }

    var users = await User.find({}, {
        __v: 0,
        _id: 0
    });

    res.send(users);
});

router.get('/profile', async (req, res) => {

    var nickname = req.cookies["SESSIONID"];

    var user = await User.findOne({
        nickname: nickname
    }, {
        __v: 0,
        _id: 0,
        password: 0
    });
    //findOne puede regresar null o el usuario
    if (!user) {
        //User no existe
        return res.status(404).send({
            message: "El usuario: " + nickname + " no existe"
        });
    }

    return res.send(user);
});

router.post('/register', async (req, res) => {
    //El parámetro 'req' contiene toda la información que se envía para generar esta petición
    //O sea, aquí vienen los datos
    var datosUsuario = req.body;

    //Validamos que la información necesaria se haya provisto de manera correcta
    const {
        error
    } = Validate.registration(datosUsuario);
    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        });
    }

    //OR en el query de Mongo
    var userExists = await User.findOne({
        $or: [{
            nickname: datosUsuario.nickname
        }, {
            email: datosUsuario.email
        }]
    });

    if (userExists) {
        return res.status(401).send({
            error: "El usuario con este nickname/correo ya existe"
        });
    }

    var usuarioRegistrado = new User(datosUsuario);

    await usuarioRegistrado.save();
    res.send({
        message: 'Usuario registrado correctamente'
    });
});

router.put('/:nickname', async (req, res) => {
    const nickname = req.params.nickname;
    const usuarioActual = req.cookies["SESSIONID"];
    const userData = req.body;
    var userIsAdmin = false;

    if (nickname !== usuarioActual) {
        userIsAdmin = await Utils.isAdmin(req, res);
        if (!userIsAdmin) {
            return;
        }
    }

    var user = await User.findOne({
        nickname: nickname
    });

    //findOne puede regresar null o el usuario
    if (!user) {
        //User no existe
        return res.status(404).send({
            message: "El usuario: " + nickname + " no existe"
        });
    }

    //Los objetos en JS también se les conoce como Key-Value Pair
    //{ key: value }
    //key es único
    //{ name: "abc" }
    var propiedades = Object.keys(userData);
    //Regresa un array [Strings]
    //['name', 'OtraPropiedad', 'lastName']
    //Esto funcionará porque puedo acceder a una propiedad de un objeto
    //de manera tipo Hashing: userData["name"] -> userData.name

    for (var i = 0; i < propiedades.length; i++) {
        const propiedad = propiedades[i];

        switch (propiedad) {
            case "name":
                user.name = userData.name
                break;

            case "nickname":
                var newNickname = userData.nickname;
                var userExists = await User.findOne({
                    nickname: newNickname
                });

                if (userExists) {
                    res.status(403).send({
                        error: "El nickname: " + newNickname + " ya está ligado a otro usuario"
                    });
                    return;
                }

                user.nickname = newNickname;
                break;

            case "email":
                var newEmail = userData.email;
                var userExists = await User.findOne({
                    email: newEmail
                });

                if (userExists) {
                    res.status(403).send({
                        error: "El email: " + newEmail + " ya está ligado a otro usuario"
                    });
                    return;
                }

                user.email = newEmail;
                break;

            case "lastName":
                user.lastName = userData.lastName
                break;

            case "phone":
                user.phone = userData.phone
                break;

            case "password":
                user.password = userData.password
                break;

            case "address":
                user.address = userData.address
                break;

            case "userType":
                if (userIsAdmin) {
                    user.userType = userData.userType;
                }
                break;
        }
    }

    await user.save();

    res.send({
        message: "Se actualizó el usuario correctamente"
    });

});

router.delete('/:nickname', async (req, res) => {

    var userIsAdmin = await Utils.isAdmin(req, res);
    if (!userIsAdmin) {
        return;
    }

    var parametros = req.params;
    var nickname = parametros.nickname;

    /*var user = await User.findOne({ nickname: nickname });
    if(!user) {
        res.send({
            message: "El usuario: " + nickname + " no existe"
        });
        return;
    }*/

    var usuarioBorrado = await User.deleteOne({
        nickname: nickname
    });

    if(usuarioBorrado.deletedCount === 0) {
        res.status(404).send({
            message: "El usuario: " + nickname + " no existe"
        });
        return;
    }

    res.send({
        message: "Se ha borrado el usuario: " + nickname
    });

});

//Sesiones
//Regularmente se mantienen a través de algo llamado Cookie
router.post('/login', async (req, res) => {
    var datosLogin = req.body;

    const {
        error
    } = Validate.login(datosLogin);
    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        });
    }

    if (!datosLogin.nickname && !datosLogin.email) {
        return res.status(403).send({
            error: "Necesita especificar un nickname o correo para iniciar sesión"
        });
    }

    var usuario = await User.findOne({
        $or: [{
            nickname: datosLogin.nickname
        }, {
            email: datosLogin.email
        }],
        password: datosLogin.password
    });

    if (!usuario) {
        return res.status(404).send({
            error: "Datos incorrectos de inicio de sesión. Verifique el user/password"
        });
    }

    //Crea la cookie SESSIONID
    res.cookie('SESSIONID', usuario.nickname);
    res.send({
        message: "Se ha iniciado sesión correctamente"
    });

});

//Logout
router.post('/logout', async (req, res) => {
    //Borra la cookie SESSIONID
    res.clearCookie('SESSIONID');

    res.send({
        message: "Se ha desloggeado y se ha borrado la sesión"
    });
});

//Exportar o generar el módulo users.js
//Para ello debemos exportar aquello que contenga a toda la información
module.exports = router;