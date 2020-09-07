const Eucharist = require('../../models/Eucharist');

const EucharistRsvQ = {
    getEucharists: async (_, { }) => {
        const eucharists = await Eucharist.find({ active: true });
        console.log('Retornando Todas las Ventas');
        return eucharists;
    }
};

const EucharistRsvM = {
    createEucharist: async (_, { input }, ctx) => {
        try {
            // console.log(products);
            // input.user = ctx.user.id;
            // input.user = input.user;
            const newEucharist = new Eucharist(input);
            newEucharist.save();
            console.log(newEucharist);
            return true;
        } catch (error) {
            console.log(error);
        }
    },
    updateEucharist: async (_, { id, input, products, payments }, ctx) => {
        // Saber si la eucharist existe o no
        let eucharist = await Eucharist.findById(id);

        if (!eucharist) {
            throw new Error('not exist');
        }

        // Si la persona es el creador
        if (ctx.user.rol !== 'admin' && ctx.user.rol !== 'user') {
            throw new Error('not permissions');
        }

        // Actualizando productos y abonos
        input.products = products;
        input.payments = payments;

        // Guardar y retornar la euchariste
        try {
            eucharist = await Eucharist.findOneAndUpdate({ _id: id }, input, { new: true });
            console.log(eucharist);
            return eucharist;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    deleteEucharist: async (_, { id }, ctx) => {
        // El euchariste no se elimina, el euchariste solo se actualiza el estado a inactivo
        // Saber si la eucharist existe o no
        console.log('Eliminando ', id);
        let eucharist = await Eucharist.findById(id);

        if (!eucharist) {
            throw new Error('not exist');
        }

        // Si la persona es el creador
        if (ctx.user.rol !== 'admin') {
            throw new Error('not permissions');
        }

        // Eliminar Eucharist
        try {
            eucharist = await Eucharist.findOneAndUpdate({ _id: id }, { "$set": { active: false } }, { new: true });
            console.log("Eliminado", eucharist);
            return eucharist.id;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
    updatePayment: async (_, { id, payment }) => {
        // Saber si la eucharist existe o no
        console.log('Añadiendo pago', id);
        console.log(payment);
        let eucharist = await Eucharist.findById(id);

        if (!eucharist) {
            throw new Error('not exist');
        }

        // Guardar y retornar la euchariste
        try {
            eucharist = await Eucharist.findOneAndUpdate({ _id: id }, { $push: { payments: payment } }, { new: true });
            console.log('Payment agregado:', payment);
            console.log(eucharist);
            return eucharist;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
};

const EucharistRsv = { EucharistRsvQ, EucharistRsvM };

module.exports = EucharistRsv;