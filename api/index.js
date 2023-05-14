const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults()
const dataBase = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser)

server.get('/getTasks', (req, res) => {
    const tasks = dataBase.get('tasks').value();
    res.json({
        success: true,
        data: tasks
    });
});

server.post('/addTask', (req, res) => {
    const { tasksInCol } = req.body;
    const colId = Object.keys(tasksInCol)[0];

    try {
        dataBase.read();
        dataBase.set(`tasks.${colId}`, tasksInCol[colId]).write();

        res.status(200).json({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
})

server.put('/changeTasksStatus', (req, res) => {
    const data = req.body;
    try {
        dataBase.read();
        Object.keys(data).map((colId) => dataBase.set(`tasks.${colId}`, data[colId]).write() )

        res.status(200).json({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
})

server.get('/getTasksStatus', (req, res) => {
    const taskStatuses = dataBase.get('taskStatus').value();
    res.json({
        success: true,
        data: taskStatuses
    });
});

server.post('/addTasksStatus', (req, res) => {
    const { status: newTaskStatus } = req.body;

    try {
        dataBase.read();
        const taskStatusDB = dataBase.set('taskStatus', [...dataBase.get('taskStatus'), newTaskStatus])

        taskStatusDB.write();

        res.status(200).json({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});


// server.delete('/removeTasksStatus/:id', (req, res) => {
server.delete('/removeTasksStatus', (req, res) => {
    const taskId = req.body.id;
    const taskStatuses = dataBase.get('taskStatus');
    const taskStatus = taskStatuses.find({ id: taskId }).value();

    if (!taskStatus) {
        res.json({
            success: false,
            errMsg: `Task status wasn't found!`
        });

        return;
    }

    taskStatuses.remove({ id: taskId }).write();
    res.json({
        success: true
    });
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
