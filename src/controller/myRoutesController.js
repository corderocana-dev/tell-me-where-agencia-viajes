const bcrypt = require('bcryptjs'); // Bcrypt import.
const connection = require('../conexion'); // Database connection.

const getHome = (req, res) => {
    res.render('home');
};

const getRegister = (req, res) => {
    res.render('register', { mensaje: '' });
};

const getLogin = (req, res) => {
    res.render('login', { mensaje: '' });
};

const getProduct = (req, res) => {
    res.render('product');
};

const getList = (req, res) => {
    res.render('product_list');
};

/*
  The "postRegister" method will be executed every time we click the submit button on our form.
  By including "method = post" and "action = /register", it will search in "myRoutes.js" for the ".post" route derived from /register.
*/
const postRegister = async (req, res) => {
    // We call the different registration form data based on their "name" attribute.
    const { name, surname, email, tel, password, nationality } = req.body;

    // Basic validation (the browser already checks "required", but the server must check too).
    if (!name || !surname || !email || !tel || !password || !nationality) {
        return res.render('register', { mensaje: 'Rellena todos los campos.' });
    }

    // The phone is stored as a number: keep only digits.
    const telefono = String(tel).replace(/\D/g, '');
    if (telefono.length < 6 || telefono.length > 9) {
        return res.render('register', { mensaje: 'Introduce un teléfono válido (máximo 9 cifras).' });
    }

    try {
        // Do not allow two accounts with the same email.
        const [existentes] = await connection.promise().query('SELECT Id FROM usuario WHERE Email = ?', [email]);
        if (existentes.length > 0) {
            return res.render('register', { mensaje: 'Ya existe una cuenta con ese email.' });
        }

        // We encrypt the received password using the Bcryptjs module.
        const hashedPassword = await bcrypt.hash(password, 10);

        // We execute the query to insert the data using the field names we have in our "user" table in the database.
        const insertQuery = 'INSERT INTO usuario (Nombre, Apellidos, Email, Telefono, Contraseña, Nacionalidad) VALUES (?, ?, ?, ?, ?, ?)';
        await connection.promise().query(insertQuery, [name, surname, email, telefono, hashedPassword, nationality]);

        // User created: show the login page with a confirmation message.
        return res.render('login', { mensaje: 'Usuario registrado. Ya puedes iniciar sesión.' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error.message);
        return res.status(500).render('register', { mensaje: 'Error al registrar el usuario. Inténtalo de nuevo.' });
    }
};

/*
  The "postLogin" method will be executed every time we click the submit button on our form.
  By including "method = post" and "action = /login", it will search in "myRoutes.js" for the ".post" route derived from /login.
*/
const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { mensaje: 'Introduce tu email y tu contraseña.' });
    }

    try {
        // We search our database for the provided email.
        const [results] = await connection.promise().query('SELECT * FROM usuario WHERE Email = ?', [email]);

        // If the user is not found in the database, show the register page with "Need to register".
        if (results.length === 0) {
            return res.render('register', { mensaje: 'Necesita registrarse' });
        }

        // Compare the password with the encrypted one stored in the database.
        const validPassword = await bcrypt.compare(password, results[0].Contraseña);

        if (!validPassword) {
            return res.render('login', { mensaje: 'Contraseña inválida' });
        }

        req.session.loggedIn = true; // Establishes the session as logged in.
        req.session.email = email; // Saves the user's email in the session.
        req.session.nombre = results[0].Nombre; // Name shown in the header ("Hola, ...").
        // Save the session before rendering so the header already shows the user.
        return req.session.save(() => {
            res.locals.usuario = req.session.nombre;
            res.render('login', { mensaje: 'Usuario conectado' });
        });
    } catch (error) {
        console.error('Error al autenticar usuario:', error.message);
        return res.status(500).render('login', { mensaje: 'Error al iniciar sesión. Inténtalo de nuevo.' });
    }
};

// Logout: destroys the session and goes back to the home page.
const getLogout = (req, res) => {
    req.session.destroy(() => res.redirect('/'));
};

// Declaration of the different modules to be exported.
module.exports = {
    getHome,
    getLogin,
    getRegister,
    getList,
    getProduct,
    postRegister,
    postLogin,
    getLogout,
};
