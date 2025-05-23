const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

server.get('/articles', (req, res) => {
    try {
        const { page=1, offset=5 } = req.query;

        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { articles = [] } = db;

        const startPos = (Number(page)-1)*Number(offset);
        const endPos = startPos+Number(offset);
        const upData = articles.slice(startPos, endPos);

        if (upData) {
            return res.json({ articles: upData, page, offset, total: articles.length});
        }

        return res.status(403).json({ articles: [], message: 'articles not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ articles: [], message: e.message });
    }
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
// server.use((req, res, next) => {
//     if (!req.headers.authorization) {
//         return res.status(403).json({ message: 'AUTH ERROR' });
//     }

//     next();
// });

server.use(router);

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
