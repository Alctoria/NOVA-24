const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use('/auth', require('./server/routes/auth'));
app.use('/tools', require('./server/routes/tools'));

app.get('/', (req, res) => {
    if (!req.session.user) {
        res.sendFile(path.join(__dirname, 'views/login.html'));
    } else {
        res.sendFile(path.join(__dirname, 'views/dashboard.html'));
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))