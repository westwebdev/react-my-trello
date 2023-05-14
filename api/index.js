// const dataBase = require('../db')();
// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router(dataBase);
// // const router = jsonServer.router('../db.json');
// const middleWares = jsonServer.defaults();

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middleWares = jsonServer.defaults();
const dataBase = router.db;
server.use(middleWares);
server.use(jsonServer.bodyParser);

server.get('/getBoards', (req, res) => {
    const boards = dataBase.get('boards').value();

    res.json({
        success: true,
        data: boards
    });
});

server.post('/addBoard', (req, res) => {
    const newBoard = req.body;

    try {
        const boards = dataBase.get('boards');

        dataBase.set(`boards`, [newBoard, ...boards]).write();

        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errMsg: err.message
        });
    }
});

server.delete('/removeBoard', (req, res) => {
    const { id } = req.body.board;
    const boards = dataBase.get('boards');
    const board = boards.find({ id: id }).value();

    if (!board) {
        res.json({
            success: false,
            errMsg: `Board wasn't found!`
        });

        return;
    }

    boards.remove({ id: id }).write();
    res.status(200).json({
        success: true
    });
});

server.get('/getTasksStatus', (req, res) => {
    const taskStatuses = dataBase.get('taskStatus').value();

    res.json({
        success: true,
        data: taskStatuses
    });
});

server.post('/addTasksStatus', (req, res) => {
    const { status: newTaskStatus, boardId} = req.body;

    try {
        const taskStatuses = dataBase.get(`taskStatus.${boardId}`);

        dataBase.set(`taskStatus.${boardId}`, [...taskStatuses, newTaskStatus]).write();

        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errMsg: err.message
        });
    }
});

server.delete('/removeTasksStatus', (req, res) => {
    const {colId, boardId} = req.body;
    const taskStatuses = dataBase.get(`taskStatus.${boardId}`);
    const taskStatus = taskStatuses.find({ id: colId }).value();

    if (!taskStatus) {
        res.json({
            success: false,
            errMsg: `Task status wasn't found!`
        });

        return;
    }

    taskStatuses.remove({ id: colId }).write();
    res.json({
        success: true
    });
});

server.get('/getTasks', (req, res) => {
    const tasks = dataBase.get('tasks').value();

    res.json({
        success: true,
        data: tasks
    });
});

server.post('/addTask', (req, res) => {
    const { boardId, colId, task } = req.body;

    try {
        const tasksInCol = dataBase.get(`tasks.${boardId}.${colId}`).value() || [];
        tasksInCol.push(task)
        dataBase.set(`tasks.${boardId}.${colId}`, tasksInCol).write();

        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errMsg: err.message
        });
    }
});

server.delete('/removeTask', (req, res) => {
    const {id, colId, boardId} = req.body;
    const taskCol = dataBase.get(`tasks.${boardId}.${colId}`);
    const task = taskCol.find({ id: id }).value();

    if (!task) {
        res.json({
            success: false,
            errMsg: `Task wasn't found!`
        });

        return;
    }

    taskCol.remove({ id: id }).write();
    res.json({
        success: true
    });
});

server.put('/changeTasksStatus', (req, res) => {
    const { boardId, columns } = req.body;

    try {
        dataBase.read();
        Object.keys(columns).map((colId) => dataBase.set(`tasks.${boardId}.${colId}`, columns[colId]).write() )

        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errMsg: err.message
        });
    }
});

server.get('/getUser', (req, res) => {
    const user = dataBase.get('user').value();

    res.json({
        success: true,
        data: user
    });
});

server.post('/setUser', (req, res) => {
    const user = req.body;

    try {
        dataBase.set('user', user).write();

        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errMsg: err.message
        });
    }
});

server.put('/logOutUser', (req, res) => {
    const user = req.body;

    try {
        dataBase.set('user', user).write();

        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errMsg: err.message
        });
    }

    res.json({
        success: true,
        data: user
    });
});


server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running');
});
