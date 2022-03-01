var User = require('../schemas/user.schema');
var bcrypt = require('bcrypt');
var saltRounds =10;

async function addUser(req, res) {
    try {
        if (!req.body.password || !req.body.fullName || !req.body.email) return res.status(400).send({
            error: 'Falta un campo obligatorio'
        });

        req.body.password = await bcrypt.hash(req.body.password, saltRounds );
        
        

        let newUser = new User(req.body);
        // newUser.fullName = req.body.fullName;
        // newUser.email = req.body.email;
        // newUser.password = req.body.password;

        await newUser.save();
        res.send({
            usarioNuevo: newUser
        })
    } catch (error) {
        res.status(400).send(error)
    }
}
async function getUsers(req, res) {
    const usuariosDB = await User.find();
    res.send({
        users: usuariosDB
    })
}

async function getUser(req, res) {
    //Id que recibimos como query param desde el endpoint
    const userId = req.query.id;
    //Buscamos espeficamente ese id en nuestra coleccion users
    const user = await User.findById(userId);
    console.log(user)
    if (!user) return res.status(404).send('El usuario no se encuentra')
    //const id = req.params.user_id
    return res.send({
        user
    });
}

async function deleteUser(req, res) {
    const userId = req.query.id;
    const user = await User.findByIdAndDelete(userId);
    res.status(200).send(`Usuarios ${user.fullName} borrado`)
}

async function updateUser(req, res) {
    const id = req.params.id;
    const userChanges = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, userChanges, {
        new: true
    })
    if (!updatedUser) return res.status(404).send('No se encontro el ususario')
    return res.status(200).send(updatedUser)
}

async function login(req, res){
    //email: rr@RR password: alfabeta
    // buscar en la DB si existe un usuario con ese eail
    //chekear si el password coincide con el que tiene en la DB
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userDB = await User.findOne({ email: req.body.email })
        if(!userDB) return res.status(404).send({ msg:'El usuario no existe en nuestra base de datos'});

        const isValidPassword = bcrypt.compare(password, userDB.password);
        if(!isValidPassword) return res.status(401).send({ msg:'Alguno de los datos ingresados no es correcto'});
        
        // userDB.password = undefined;
        delete userDB.password

        return res.status(200).send({
            ok: true,
            msg:'Login correcto',
            user:userDB
        });
    }catch(error){
        res.status(400).send(error)
    }
    
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    login
}