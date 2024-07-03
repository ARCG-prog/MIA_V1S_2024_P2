const { insertData, getData, deleteData, reservarData, autorizarData } = require('../config/db.mongo');
const { uploadFile2 } = require('../config/bucket');
// const { bcrypt } = require('bcryptjs');

const {
    BUCKET_PATH
} = process.env;


const ciclo_for = async (req, res) =>  {
    
    // Recibir el parametro numero desde la URL
    const { numero } = req.params; // Obtenemos el valor desde la ruta URL
    
    // Manipulacion de datos
    let respuesta = '';
    for (let i = 0; i < numero; i++) {
        respuesta += `Iteracion ${i + 1} `;
    };

    //console.log('Respuesta a enviar', respuesta);

    // Respuesta
    res.status(200).json(
        {
            msg: respuesta
        });
};


const registro = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { path, imagen, nombre, apellido, usuario, correo, password, tipoUsuario } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombre, apellido, usuario, correo, password, tipoUsuario);

    // const p_2 = await bcrypt.hash(password, 10);
    await uploadFile2(path, imagen);

    const ruta_aws = `${BUCKET_PATH}/${path}`;

    console.log('Ruta AWS', ruta_aws);
    const result = await insertData('Usuarios', {
        imagen: ruta_aws,
        nombre,
        apellido,
        usuario,
        correo,
        password,
        tipoUsuario
    });


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar usuario',
                data: result,
                image: ruta_aws
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Registro exitoso',
        data: result,
        image: ruta_aws
    });
};

const registroVuelo = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { nombreAgencia, ciudadOrigen, ciudadDestino, diasDeVuelo, precioDeVuelo } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombreAgencia, ciudadOrigen, ciudadDestino, diasDeVuelo, precioDeVuelo);


    const result = await insertData('Vuelos', {
        nombreAgencia,
        ciudadOrigen,
        ciudadDestino,
        diasDeVuelo,
        precioDeVuelo,

        reservado: false,
        reservadoPor: '',
	    autorizado: false
    });


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar vuelo',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Registro exitoso',
        data: result
    });
};

const registroAuto = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { nombreAgencia, marca, placa, modelo, precio, ciudad } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombreAgencia, marca, placa, modelo, precio, ciudad);


    const result = await insertData('Autos', {
        nombreAgencia,
        marca,
        placa,
        modelo,
        precio,
        ciudad,

        reservado: false,
        reservadoPor: '',
	    autorizado: false
    });


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar auto',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Registro exitoso',
        data: result
    });
};


const getUsuarios = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const result = await getData('Usuarios');

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al obtener datos usuarios',
                data: result
            });
    };

    // Respuesta
    console.log('Datos de usuarios obtenidos:', result);
    return res.status(200).json({
        status: true,
        msg: 'Datos Usuarios obtenidos',
        data: result
    });
};


const deleteUsuario = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id } = req.body;
    const result = await deleteData('Usuarios', id);


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al eliminar usuario',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};

const getAutos = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const result = await getData('Autos');

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al obtener datos Autos',
                data: result
            });
    };

    // Respuesta
    console.log('Datos de Autos obtenidos:', result);
    return res.status(200).json({
        status: true,
        msg: 'Datos Autos obtenidos',
        data: result
    });
};


const deleteAuto= async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id } = req.body;
    const result = await deleteData('Autos', id);


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al eliminar Autos',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};

const getVuelos = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const result = await getData('Vuelos');

    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al obtener datos vuelos',
                data: result
            });
    };

    // Respuesta
    console.log('Datos de vuelos obtenidos:', result);
    return res.status(200).json({
        status: true,
        msg: 'Datos Vuelos obtenidos',
        data: result
    });
};


const deleteVuelo = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id } = req.body;
    const result = await deleteData('Vuelos', id);


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al eliminar vuelo',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};

const reservarVuelo = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id, usuario } = req.body;
    const result = await reservarData('Vuelos', id, usuario);


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al reservar vuelo',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};

const reservarAuto = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id, usuario } = req.body;
    const result = await reservarData('Autos', id, usuario);


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al reservar auto',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};

const autorizarVuelo = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id } = req.body;
    const result = await autorizarData('Vuelos', id);


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al reservar vuelo',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};

const autorizarAuto = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    
    const { id } = req.body;
    const result = await autorizarData('Autos', id);


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al reservar auto',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json({
        status: true,
        msg: 'Eliminacion exitoso',
        data: result
    });
};


module.exports = {
    ciclo_for,
    registro,
    registroVuelo,
    registroAuto,
    getUsuarios,
    deleteUsuario,
    getVuelos,
    deleteVuelo,
    getAutos,
    deleteAuto,
    reservarVuelo,
    reservarAuto,
    autorizarVuelo,
    autorizarAuto
};