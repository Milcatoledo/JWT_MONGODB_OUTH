const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
    dni: { 
        type: String, 
        required: [true, 'El DNI es obligatorio.'], 
        unique: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: 'El DNI debe contener exactamente 10 dígitos numéricos.'
        }
    },
    nombres: { 
        type: String, 
        required: [true, 'El campo Nombres es obligatorio.'],
        validate: {
            validator: function(v) {
                return /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(v);
            },
            message: 'Los nombres solo deben contener letras y espacios, con un mínimo de 2 caracteres.'
        }
    },
    apellidos: { 
        type: String, 
        required: [true, 'El campo Apellidos es obligatorio.'],
        validate: {
            validator: function(v) {
                return /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(v);
            },
            message: 'Los apellidos solo deben contener letras y espacios, con un mínimo de 2 caracteres.'
        }
    },
    fechaNacimiento: { 
        type: Date, 
        required: [true, 'La Fecha de Nacimiento es obligatoria.'],
        validate: {
            validator: function(v) {
                const fecha = new Date(v);
                const hoy = new Date();
                return fecha <= hoy;
            },
            message: 'La fecha de nacimiento no puede ser futura.'
        }
    },
});

const Persona = mongoose.model('Persona', personaSchema);
module.exports = Persona;
