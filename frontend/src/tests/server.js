
const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname,'db.json'))
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)

server.post('/api/auth/register', (req, res) => {
    if (req.method === 'POST') {
        let firstName = req.body['firstName'];
        let uuid = 0;
        if (firstName != null) {
            let result = db.register.find(user => {
                uuid = user.uid;
                return user.firstName == firstName;
            })
       
            if (result) {
                res.status(200).jsonp({
                    error: false,
                    errMsg: "",
                    uid: uuid
                });
            } else {
                res.status(400).jsonp({
                    error: true,
                    errMsg: "Invalid uid",
                    uid: 0
                });
            }
        } else {
            res.status(400).jsonp({
                error: true,
                errMsg: "Unable to find user",
                uid: 0
            });
        }
    }
});

server.post('/api/auth/login', (req, res) => {
    if (req.method === 'POST') {
        let email = req.body['email'];
        let uuid = 0;
        if (email != null) {
            let result = db.login.find(user => {
                uuid = user.uid;
                return user.email == email;
            })
       
            if (result) {
                res.status(200).jsonp({
                    error: false,
                    errMsg: "",
                    uid: uuid
                });
            } else {
                res.status(400).jsonp({
                    error: true,
                    errMsg: "Invalid uid",
                    uid: 0
                });
            }
        } else {
            res.status(400).jsonp({
                error: true,
                errMsg: "Unable to find user",
                uid: 0
            });
        }
    }
});

server.post('/api/auth/forgot', (req, res) => {
    if (req.method === 'POST') {
        let email = req.body['email'];
        if (email != null) {
            let result = db.login.find(user => {
                return user.email == email;
            })
       
            if (result) {
                res.status(200).jsonp({
                    error: false,
                    errMsg: ""
                });
            } else {
                res.status(400).jsonp({
                    error: true,
                    errMsg: "Invalid email"
                });
            }
        } else {
            res.status(400).jsonp({
                error: true,
                errMsg: "Unable to find user"
            });
        }
    }
});

server.post('/api/auth/reset', (req, res) => {
    if (req.method === 'POST') {
        let email = req.body['email'];
        if (email != null) {
            let result = db.login.find(user => {
                return user.email == email;
            })
       
            if (result) {
                res.status(200).jsonp({
                    error: false,
                    errMsg: "",
                });
            } else {
                res.status(400).jsonp({
                    error: true,
                    errMsg: "Invalid email",
                });
            }
        } else {
            res.status(400).jsonp({
                error: true,
                errMsg: "Unable to find user",
            });
        }
    }
});

server.post('/api/profile/edit', (req, res) => {
    if (req.method === 'POST') {
        let email = req.body['email'];
        if (email != null) {
            let result = db.login.find(user => {
                return user.email == email;
            })
       
            if (result) {
                res.status(200).jsonp({
                    error: false,
                    errMsg: "",
                });
            } else {
                res.status(400).jsonp({
                    error: true,
                    errMsg: "Invalid uid",
                });
            }
        } else {
            res.status(400).jsonp({
                error: true,
                errMsg: "Unable to find user",
            });
        }
    }
});

server.post('/api/message/add', (req, res) => {
    if (req.method === 'POST') {
        let uuid = req.body['from'];
        if (uuid != null) {
            let result = db.login.find(user => {
                return user.uid == uuid;
            })
       
            if (result) {
                res.status(200).jsonp({
                    error: false,
                    errMsg: "",
                });
            } else {
                res.status(400).jsonp({
                    error: true,
                    errMsg: "Invalid message",
                });
            }
        } else {
            res.status(400).jsonp({
                error: true,
                errMsg: "Unable to find user sending message",
            });
        }
    }
});

server.post('/api/message/add', (req, res) => {
    if (req.method === 'POST') {
        let uuid = req.body['uid1'];
        if (uuid != null) {
            let result = db.login.find(user => {
                return user.uid == uuid;
            })
       
            if (result) {
                res.status(200).jsonp({
                    error: false,
                    errMsg: "",
                });
            } else {
                res.status(400).jsonp({
                    error: true,
                    errMsg: "Invalid message",
                });
            }
        } else {
            res.status(400).jsonp({
                error: true,
                errMsg: "Unable to find user sending message",
            });
        }
    }
});

server.use(middlewares)
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})