var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {

  try{
    const todo =  await global.db.getAllTasks();
    res.render('index', { title: "Atividades para a semana", todo});
  } catch (err){
    next(err);
  }
});

router.get('/new', (req, res, next) => {
  res.render('new', { title: "Nova atividade", docs: {"task":"", "desc":"" }, action: "/new" });
});

router.post('/new', async(req, res, next) => {
  const task = req.body.task;
  const desc = req.body.desc;

  try{
    if(!req.body.task || typeof req.body.task == undefined || req.body.task == null){  // Checks if the task is empty
      console.log("Por favor, preencha o campo Tarefa");                               // If it is, it will show a msg in console
      let desc = req.body.desc;                                                        // after that clean the description field and render again the page
      desc = "";
      res.render('new', { title: "Nova atividade", docs: {"task":task, "desc":desc }, action: "/new" });
    } else{
    const result = await global.db.newTask({task, desc});
    res.redirect('/');}
  } catch(err){
    next(err);
  }
});

router.get('/edit/:id', async(req, res, next) => {
  const id = req.params.id;                                     // GET For update the tasks

  try{
    const docs = await global.db.getTask(id);
    res.render('new', { title: "Editar atividade", docs, action: '/edit/' + docs._id});
  }catch(err){
    next(err);
  }
});

router.post('/edit/:id', async(req, res) => {
  const id = req.params.id;                     // POST For update the tasks
  const task = req.body.task;
  const desc = req.body.desc;

  try{
    const result = await global.db.updateTask(id, {task, desc});
    res.redirect('/');
  } catch (err){
    next(err);
  }
});

router.get('/delete/:id', async(req, res, next) => {
  const id = req.params.id;

  try{                                                    // delete tasks
    const result = await global.db.deleteTask(id);
    res.redirect('/');
  } catch(err){
    next(err);
  }
});

router.get('/about', (req, res, next) => {
  res.render('about', { title: "Um pouco sobre este projeto" });
});


module.exports = router;
