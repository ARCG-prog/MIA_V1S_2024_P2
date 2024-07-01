const app = require('./app');
require('dotenv').config();

const {
    BACKEND_PORT,
    IP
} = process.env;
//const PORT = BACKEND_PORT || 3000;

app.listen(BACKEND_PORT, () => {
    console.log(`Servidor corriendo en http://${IP}:${BACKEND_PORT}`)
})

