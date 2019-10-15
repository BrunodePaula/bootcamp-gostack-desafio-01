const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let logs = 0;

//Middleware checar Id 
function checkId(req, res, next) {

  const { id } = req.params;

  const proj = projects.find(p => p.id == id);  

  if(!proj){
    return res.status(400).json({ error: 'Id does not exists'});
  }

  return next();
}

//Middleware contagem de requisições
function qtdLogs(req, res, next) {
 
  qtd = logs++;
  qtd+= 1;
  console.log(`${qtd} Requisições feitas`);

  return next();
  
}

//Rota listagem de projetos
server.get('/projects', qtdLogs, (req, res) => {
  return res.json(projects);
});

//Rota de inserção de projetos
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

//Rota de atualização de projeto
server.put('/projects/:id', checkId, qtdLogs,  (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);

});

//Rota de exclusão de projeto
server.delete('/projects/:id', checkId, qtdLogs,  (req, res) => {

  const { id } = req.params;

  const project = projects.find(p => p.i == id);

  projects.splice(project);

  return res.send();

});

//Rota de criação de tasks do projeto
server.post('/projects/:id/tasks', checkId, qtdLogs, (req, res) => {

  const { title } = req.body;

  projects.map((item) => {
    item.tasks.push(title);
    return res.json(item);
  });

});

server.listen(3000);
