var express = require('express');

var avlRouter = express.Router();

const AVLs = [
  { uuid: 1, mdmid: 1, name: "avls 1" },
  { uuid: 2, mdmid: 2, name: "avls 2" },
  { uuid: 3, mdmid: 3, name: "avls 3" },
  { uuid: 4, mdmid: 4, name: "avls 4" },
  { uuid: 5, mdmid: 5, name: "avls 5" },
]

// middleware that is specific to this avlRouter
avlRouter.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  console.info(`Request from ${req.ip} : ${req.headers['user-agent']}`);
  next();
});

// define avls route
avlRouter.get('/', function (req, res) {
  res
    .status(200)
    .send({ avls: AVLs });
});

// define avl route
avlRouter.get('/:id', function (req, res) {
  let AVL = AVLs.find(avl => avl.uuid == req.params.id);
  let result = [];
  let status = 404; //NO existe el índice buscado 
  if (AVL) {
    result.push(AVL);
    status = 200;
  }
  res
    .status(status)
    .send({ avls: result });
});

// define avl search route
avlRouter.get('/search/:str', function (req, res) {
  var avls = AVLs.filter(function (avl) {
    return (avl.mdmid.toString().indexOf(req.params.str) > -1 ) || (avl.name.indexOf(req.params.str) > -1);
  });

  let status = 404; //NO existe el índice buscado 
  if (avls.length > 0) {
    status = 200;
  }
  res
    .status(status)
    .send({ avls: avls });
});

avlRouter.get((req, res) => {
  res.
    status(404).
    send({ mensaje: "URL no encontrada" });
})

module.exports = avlRouter;