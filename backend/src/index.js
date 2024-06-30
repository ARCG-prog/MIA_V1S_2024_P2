const app = require('./app');
require('dotenv').config();

const {
    BACKEND_PORT,
    IP
} = process.env;

//const PORT = process.env.BACKEND_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://${IP}:${BACKEND_PORT}`)
})

