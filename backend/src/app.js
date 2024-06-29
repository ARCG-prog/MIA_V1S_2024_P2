const express = require('express'); // npm install express
const cors = require('cors'); // npm install cors
const morgan = require('morgan'); // npm install morgan

const routes_admin = require('./routes/admin.routes');
const routes_usuario = require('./routes/usuario.routes');
const routes_recepcion = require('./routes/recepcion.routes');

const app = express();
app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));

// TIPO DE PETICIONES HTTP
// GET: Obtener datos
// POST: Enviar datos
// PUT: Actualizar datos
// DELETE: Eliminar datos

app.get('/', (req ,res) => {
    res.status(200).json(
        {
            mensaje: 'Hola mundo de Archivos, este mensaje fue cambiado en ejecucion',
            editado: 'Este mensaje es enviado desde ejecucion'
        });
})

app.use('/admin', routes_admin);
app.use('/usuario', routes_usuario);
app.use('/recepcion', routes_recepcion);


module.exports = app;