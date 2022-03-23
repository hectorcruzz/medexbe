const res = require('express/lib/response');
const  {ObjectId} = require('mongodb');
const getDb = require('../mongodb');
let db = null;
class Pacientes {
  collection = null;
  constructor() {
    getDb()
    .then( (database) => {
      db = database;
      this.collection = db.collection('Pacientes');
      if (process.env.MIGRATE === 'true') {
        /*const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellidos TEXT, email TEXT, telefono TEXT);';
        db.run(createStatement);*/
      }
    })
    .catch((err) => { console.error(err)});
  }

  async new ( nombres, apellidos, identidad, telefono, correo) {
    /*return new Promise( (accept, reject)=> {
      db.run(
        'INSERT INTO pacientes (identidad, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?);',
        [identidad, nombres, apellidos, correo, telefono],
        (err, rslt)=>{
          if(err) {
            console.error(err);
            reject(err);
          }
          accept(rslt);
        }
      );
    });*/

    const newPaciente = {
      nombres,
      apellidos,
      identidad,
      telefono,
      correo
    };
    const rslt = await this.collection.insertOne(newPaciente);
    return rslt
  }

  async getAll () {
    /*return new Promise ( (accept, reject) => {
      /*db.all('SELECT * from pacientes;', (err, rows) => {
        if(err){
          console.error(err);
          reject(err);
        } else {
          accept(rows);
        }
      });
    });*/

    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
  }

  async getById(id) {
    /*return new Promise((accept, reject) => {
      db.get(
        'SELECT * from pacientes where id=?;',
        [id],
        (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          accept(row);
        }
      });
    });*/

    const _id = new ObjectId(id);
    const filter = {_id};
    const myDocument= this.collection.findOne(filter);
    return myDocument;
  }

  async updateOne (id, nombres, apellidos, identidad, telefono, correo) {
   /* return new Promise( (accept, reject) =>{
      const sqlUpdate = 'UPDATE pacientes set nombre = ?,apellidos = ?, telefono = ?, identidad = ?, email = ? where id = ?';
      db.run(
        sqlUpdate,
        [nombre, apellidos, telefono, identidad, correo, id],
        function (err) {
          if(err){
            reject(err);
          }
          else{
            accept(this);
          }
        }
      );
    });*/

    const filter = {_id: new ObjectId(id)};
    const updateCmd = {
      '$set':{
        nombres,
        apellidos,
        identidad,
        telefono,
        correo
      }
    };
    const rslt = await this.collection.updateOne(filter, updateCmd);
  }

  async updateAddTagg(id, tagEntry){
    const updateCmd = {
      "$push":{
        tags: tagEntry
      }
    }
    const filter = {_id: new ObjectId(id)};
    return await this.collection.updateOne(filter, updateCmd);
  }

  async updateAddTagSet(id, tagEntry){
    const updateCmd = {
      "$addToSet":{
        tags: tagEntry
      }
    }
    const filter = { _id: new ObjectId(id) };
    return await this.collection.updateOne(filter, updateCmd);
  }

  async updatePopTag(id, tagEntry){
    const updateCmd = {
      "$pop":{
        tags: tagEntry
      }
    }
    const filter = {_id: new ObjectId(id)};
    return await this.collection.updateOne(filter, updateCmd);
  }

  async deleteOne (id) {
    
  }

  async getFaceted(page, items, filter={}){
    const cursor = this.collection.find(filter);
    const totalItems = await cursor.count();
    cursor.skip((page-1)*items);
    cursor.limit(items);

    const resultados = await cursor.toArray();
    return {resultados, totalItems,page,items, totalPages: (Math.ceil(totalItems/items))};
  }
}

module.exports = Pacientes;