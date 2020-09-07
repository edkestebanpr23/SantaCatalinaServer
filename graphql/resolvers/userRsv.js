
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const createToken = (user, secret, expiresIn) => {
    const { id, document, rol } = user;

    const token = jwt.sign({ id, document, rol }, secret, { expiresIn });
    data = {
        name: user.name,
        telephone: user.telephone,
        rol: user.rol,
        img: user.img,
        token
    }
    /**
     * El primer parámetro es el payload, información a encriptar
     * Segundo la palabra secreta
     * Tercero, la expiración
     */
    console.log('Retornando:', data);
    return data;
};

const UserRsvQ = {
    getUsers: async (_, { }) => {
        const user = await User.find();
        console.log(user)
        return user;
    }
};

const UserRsvM = {
    createUser: async (_, { input }, ctx) => {
        const { name, document, password, telephone, rol } = input;

        // Verificar rol
        // if (rol !== 'admin' && rol !== 'user') {
        //     console.log('error 11111');
        //     throw new Error('rol');
        // }

        if (ctx.user.rol !== 'admin') {
            console.log('error 22222');
            throw new Error('not admin');
        }


        const user = await User.findOne({ document });

        console.log(user);
        // Si el usuario ya existe
        if (user) {
            console.log('error 33333');
            throw new Error('exist');
        }

        try {
            console.log('error 44444');
            // Hasheasr password
            /**
             * El salt hashea y genera una cadena muy dificil de hackear
             */
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);
            console.log('error 55555');

            const newUser = new User(input);
            newUser.save();
            console.log(newUser);
            return true;
        } catch (error) {
            console.log(error);
        }
    },
    loginUser: async (_, { input }) => {
        const { document, password } = input;
        console.log(input);

        // Revisar si el usuario existe
        const user = await User.findOne({ document });

        if (!user) {
            throw new Error('wrongData');
        }

        // Revisar si el password es correcto
        const passwordOk = await bcryptjs.compare(password, user.password); // Campara el pass traido de BD y el ingresado

        if (!passwordOk) {
            throw new Error('wrongData');
        }

        // Dar acceso a la app
        return createToken(user, process.env.SECRET, '1000 days');
    },
    updateUser: async (_, { id, input }, ctx) => {
        // Saber si la user existe o no
        let user = await User.findById(id);

        if (!user) {
            throw new Error('not exist');
        }

        // Si la persona no es el admin
        if (ctx.user.rol !== 'admin') {
            throw new Error('not permissions');
        }

        // Guardar y retornar user
        user = await User.findOneAndUpdate({ _id: id }, input, { new: true });
        return user;
    },
    deleteUser: async (_, { id }, ctx) => {
        // User no se elimina, solo se actualiza el estado a inactivo
        // Saber si la user existe o no
        let user = await User.findById(id);

        if (!user) {
            throw new Error('not exist');
        }

        // Si la persona no es el admin
        if (ctx.user.rol !== 'admin' && ctx.user.rol !== 'user') {
            throw new Error('not permissions');
        }

        // Guardar y retornar la usere
        user = await User.findOneAndUpdate({ _id: id }, { active: false }, { new: true });
        console.log(user);
        return true;
    }
}

const UserRsv = { UserRsvQ, UserRsvM };
module.exports = UserRsv;