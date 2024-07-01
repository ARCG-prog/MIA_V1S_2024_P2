const express = require('express'); // npm install express
const cors = require('cors'); // npm install cors
const morgan = require('morgan'); // npm install morgan

const bodyParser = require('body-parser');
const { authenticateUser } = require('./config/db.mongo');

const routes_admin = require('./routes/admin.routes');
const routes_usuario = require('./routes/usuario.routes');
const routes_recepcion = require('./routes/recepcion.routes');

const app = express();
app.use(bodyParser.json());
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

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authenticateUser(username, password);
    
    if (result.success) {
        res.status(200).json(result.user);
    } else {
        res.status(401).json({ message: result.message });
    }
});


app.use('/admin', routes_admin);
app.use('/usuario', routes_usuario);
app.use('/recepcion', routes_recepcion);


module.exports = app;