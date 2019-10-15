const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let logs = 0;

function checkId(req, res, next) {

  const { id } = req.params;

  const proj = projects.find(p => p.id == id);  

  if(!proj){
    return res.status(400).json({ error: 'Id does not exists'});
  }

  return next();
}

function qtdLogs(req, res, next) {
 
  qtd = logs++;
  qtd+= 1;
  console.log(`${qtd} Requisições feitas`);

  return next();
  
}

server.get('/projects', qtdLogs, (req, res) => {
  return res.json(projects);
});

server.post('/projects', qtdLogs, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(project);
});

server.put('/projects/:id', checkId, qtdLogs,  (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);

});

server.delete('/projects/:id', checkId, qtdLogs,  (req, res) => {

  const { id } = req.params;

  const project = projects.find(p => p.i == id);

  projects.splice(project);

  return res.send();

});

server.post('/projects/:id/tasks', checkId, qtdLogs, (req, res) => {

  const { title } = req.body;

  projects.map((item) => {
    item.tasks.push(title);
    return res.json(item);
  });

});

server.listen(3000);
