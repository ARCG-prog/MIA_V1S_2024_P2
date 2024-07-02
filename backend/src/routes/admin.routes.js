const { Router } = require('express');
const { check } = require('express-validator');

const validate = require('../middlewares/validateAtributes');
const adminController = require('../controllers/admin.controller');

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json(
        {
            msg: 'Hola mundo de administrador'
        });
});

router.get('/ciclo_for/:numero', adminController.ciclo_for);

router.post('/registro',
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('apellido', 'El apellido es obligatorio').notEmpty(),
        check('usuario', 'El usuario es obligatorio').notEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        validate
    ], 
    adminController.registro
);


router.post('/registroVuelo',
    [
        check('nombreAgencia', 'El nombre es obligatorio').notEmpty(),
        check('ciudadOrigen', 'El apellido es obligatorio').notEmpty(),
        check('ciudadDestino', 'El usuario es obligatorio').notEmpty(),
        check('diasDeVuelo', 'El correo es obligatorio').notEmpty(),
        check('precioDeVuelo', 'El password es obligatorio').notEmpty(),
        validate
    ], 
    adminController.registroVuelo
);


router.post('/registroAuto',
    [
        check('nombreAgencia', 'El nombre es obligatorio').notEmpty(),
        check('marca', 'El apellido es obligatorio').notEmpty(),
        check('placa', 'El usuario es obligatorio').notEmpty(),
        check('modelo', 'El correo es obligatorio').notEmpty(),
        check('precio', 'El password es obligatorio').notEmpty(),
        check('ciudad', 'El password es obligatorio').notEmpty(),
        validate
    ],
    adminController.registroAuto
);

router.get('/getUsuarios', adminController.getUsuarios);

router.post('/deleteUsuario', adminController.deleteUsuario);

router.get('/getVuelos', adminController.getVuelos);

router.post('/deleteVuelo', adminController.deleteVuelo);

router.get('/getAutos', adminController.getAutos);

router.post('/deleteAuto', adminController.deleteAuto);

module.exports = router;