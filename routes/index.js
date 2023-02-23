var express = require('express');
var router = express.Router();

/* GET default route, main page*/
router.get('/', async(req, res, next) => {

  try{
    const todo =  await global.db.getAllTasks();
    res.render('index', { title: "Daily Tasks", todo});
  } catch (err){
    next(err);
  }
});

router.get('/new', (req, res, next) => { // Renders the new task page
  res.render('new', { title: "New task", docs: {"task":"", "desc":"" }, action: "/new" });
});

router.post('/new', async(req, res, next) => {
  const task = req.body.task;                   // POST route to create new tasks
  const desc = req.body.desc;

  try{
    if(!req.body.task || typeof req.body.task == undefined || req.body.task == null){  // Checks if the task is empty
      let desc = req.body.desc;                                                        // after that clean the description field and render again the page
      desc = "";
      res.render('new', { title: "New task", docs: {"task":task, "desc":desc }, action: "/new" });
    } else{
    const result = await global.db.newTask({task, desc}); // Inserts data into the database
    res.redirect('/');}
  } catch(err){
    next(err);
  }
});

router.get('/edit/:id', async(req, res, next) => {
  const id = req.params.id;                                     // GET For update the tasks

  try{
    const docs = await global.db.getTask(id);
    res.render('new', { title: "Update", docs, action: '/edit/' + docs._id});
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

module.exports = router;
