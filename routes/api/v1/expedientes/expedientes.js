const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedientesModel = new Expedientes();

router.get('/', (req, res) => {
  res.status(200).json(
    {
      endpoint: 'Expedientes',
      updates: new Date(2022,0,29,18,41,00)
    }
  );
}); 

router.get('/all', async (req, res) => {
  try {
    const rows = await expedientesModel.getAll();
    res.status(200).json({status:'ok', expedientes: rows});
  } catch (ex) {
    console.log(ex);
    res.status(500).json({status:'failed'});
  }
} );

router.get('/byid/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const row = await expedientesModel.getById(id);
    res.status(200).json({ status: 'ok', expediente: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

const allowedItemsNumber = [10, 15, 20];

router.get('/facet/:page/:items', async (req, res) => {
  const page = parseInt(req.params.page, 10);
  const items = parseInt(req.params.items, 10);
  if (allowedItemsNumber.includes(items)) {
    try {
      const expediente = await expedientesModel.getFaceted(page, items);
      res.status(200).json({docs:expediente});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  } else {
    return res.status(403).json({status:'error', msg:'Not a valid item value (10,15,20)'});
  }

});

router.post('/new', async (req, res) => {
  const { identidad, fecha, descripcion,observacion, registros, ultimaActualizacion } = req.body;
  try {
    rslt = await expedientesModel.new(identidad, fecha, descripcion,observacion, registros, ultimaActualizacion);
    res.status(200).json(
      {
        status: 'ok',
        result: rslt
      });
  } catch (ex) {
    console.log(ex);
    res.status(500).json(
      {
        status: 'failed',
        result: {}
      });
  }
}); 

router.put('/update/:id', async (req, res) =>{
  try {
    const { identidad, fecha, descripcion,observacion, registros, ultimaActualizacion } = req.body;
    const {id} = req.params;
    const result = await expedientesModel.updateOne(id, identidad, fecha, descripcion,observacion, registros, ultimaActualizacion);
    res.status(200).json({
      status: 'ok',
      result
    })
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

router.delete('/delete/:id', async (req, res) =>{
  try {
    const {id} = req.params;
    const result = await expedientesModel.deleteOne(id);
    res.status(200).json({
      status: 'ok',
      result
    })
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});


module.exports = router;
