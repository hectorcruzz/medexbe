require('dotenv').config();
const getDb = require('../dao/mongodb');
console.log(process.env.MONGOURI);

const dates = [
    '01/03/2022',
    '02/03/2022',
    '03/03/2022',
    '04/03/2022',
    '05/03/2022',
    '06/03/2022',
    '07/03/2022',
    '08/03/2022',
    '09/03/2022',
    '10/03/2022',
];

const descriptions = [
    'Estado leve',
    'Estado grave',
    'Estado de emergencia',
    'Intoxicacion',
    'Gripe comun',
    'Fractura',
    'Esguince',
    'Coronavirus',
    'Migraña',
    'Contusion'
];

const observations =[
    'Puede mejorar',
    'Necesita medicamento',
    'Emergencia urgente',
    'No es delicado',
    'Es poco complejo',
    'Necesita observacion',
    'Tratamiento inmediato',
    'Solo necesita un medicamento',
    'Repetir examenes',
    'Puede complicarse'
];

const records = [
    '#1',
    '#2',
    '#3',
    '#4',
    '#5',
    '#6',
    '#7',
    '#8',
    '#9',
    '#10',
];

const lastDates = [
    '01/01/2022',
    '02/01/2022',
    '03/01/2022',
    '04/01/2022',
    '05/01/2022',
    '06/01/2022',
    '07/01/2022',
    '08/01/2022',
    '09/01/2022',
    '10/01/2022',
];

const expedientes = 50;
const expedintesArr = [];

for (var i = 0; i< expedientes; i++){
    const anio = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20) : 2000 + Math.floor(Math.random() * 23);
    const secuencia = String(Math.ceil(Math.random() * 99999)).padStart(5,'0');
    const fechas = dates[Math.floor(Math.random() * 8)];
    const descripciones = descriptions[Math.floor(Math.random() * 8)];
    const observaciones = observations[Math.floor(Math.random() * 8)];
    const registros = records[Math.floor(Math.random() * 8)];
    const ultimafecha = lastDates[Math.floor(Math.random() * 8)];
    const doc = {
        identidad: `0703${anio}${secuencia}`,
        fechas,
        descripciones,
        observaciones,
        registros,
        ultimafecha
    }
    expedintesArr.push(doc);
}

getDb().then(
    (db)=>{
        const expedientes = db.collection('Expedientes');
        expedientes.insertMany(expedintesArr, (err, rslts)=>{
            if(err){
                console.log(err);
                return;
            }
            else{
                console.log(rslts);
                return;
            }
        });
    }
);