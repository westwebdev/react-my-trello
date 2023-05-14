const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middleWares = jsonServer.defaults();
const dataBase = router.db;
server.use(middleWares);
server.use(jsonServer.bodyParser);


const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router(dataBase);

const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()


server.use(middlewares);
server.use(jsonServer.bodyParser)


// server.use((req, res, next) => {
//   if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE' || req.method === 'PATCH') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

// server.use((req, res, next) => {
//   if (req.method && (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')) {
//     res.sendStatus(403);
//   } else {
//     next();
//   }
// // });

// server.get('/getTasksStatus', (req, res) => {
//     res.jsonp(req.query)
//   })

server.get('/getTasks', (req, res) => {
    const tasks = router.db.get('tasks').value();
    res.json({
        success: true,
        data: tasks
    });
});

server.post('/addTask', (req, res) => {
    const { tasksInCol } = req.body;
    const colId = Object.keys(tasksInCol)[0];
    

    try {
        router.db.read();
        router.db.set(`tasks.${colId}`, tasksInCol[colId]).write();
        // const tasksDB = router.db.get('tasks').value();
        // const colId = Object.keys(newTask)[0];

        // tasksDB[colId] = tasksInCol;


        // const taskStatusDB = router.db.set('taskStatus', [...router.db.get('taskStatus'), newTask])

        // taskStatusDB.write();

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
        router.db.read();
        Object.keys(data).map((colId) => router.db.set(`tasks.${colId}`, data[colId]).write() )

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


// server.post('/change', (req, res) => {
//     res.
// })

// server.post('/addTask', (req, res) => {
//     const tasks = router.db.get('tasks').value();
//     res.json(tasks);
//   });

server.get('/getTasksStatus', (req, res) => {
    const taskStatuses = router.db.get('taskStatus').value();
    res.json({
        success: true,
        data: taskStatuses
    });
});

server.post('/addTasksStatus', (req, res) => {
    const { status: newTaskStatus } = req.body;

    try {
        router.db.read();
        const taskStatusDB = router.db.set('taskStatus', [...router.db.get('taskStatus'), newTaskStatus])

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
    const taskStatuses = router.db.get('taskStatus');
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
