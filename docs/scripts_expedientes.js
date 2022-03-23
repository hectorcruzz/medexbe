require('dotenv').config();
const getDb = require('../dao/mongodb');

const names = [
    'Fulanito',
    'Menganito',
    'Sutanito',
    'Lulu',
    'Paco',
    'Hugo',
    'Luis',
    'Donald'
];

const surnames = [
    'McQuack',
    'Rico',
    'Dito',
    'De la santa cruz',
    'Melgar',
    'Cabildo',
    'Che'
];

const pacientes=50;
const pacientesArr = [];

for (var i = 0; i < pacientes; i++) {
    const anio = ((new Date().getTime() %2 ) ===0) ? 1980 + Math.floor(Math.random * 20) : 2000 + Math.floor(Math.random() * 23);
    const secuencia = String(Math.ceil(Math.random()*99999)).padStart(5,'0');
    const nombres= names[Math.floor(Math.random()*8)];
    const apellidos=surnames[Math.floor(Math.random()*8)];
    const correo = (`${nombres}.${apellidos}@unmail.com`).toLowerCase();
    const telefono = `${(200000000 + Math.floor(Math.random() * 100000000))}`;
    const doc = {
        nombres,
        apellidos ,
        identidad: `0703${anio}${secuencia}`,
        telefono,
        correo
    }
    pacientesArr.push(doc);
}
getDb().then(
    (db)=>{
        const pacientes = db.collection('Pacientes');
        pacientes.insertMany(pacientesArr, (err, rslts)=>{
            if(err){
                console.log(err);
                return;
            }else{
                console.log(rslts);
                return;
            }
        });
    }
);