const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models/index') // eslint-disable-line no-unused-vars
const config = require('./config/dbconfig') // eslint-disable-line no-unused-vars

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
express.static.mime.define({ 'application/octet-stream': ['glb', 'gltf'] })
app.use('/products', express.static('./uploads'));

require('./passport');
require('./routes')(app);

sequelize.sync({force: false}).then(() => { //drop tables if true
// sequelize.sync().then(() => {
    app.listen(8081);
    //app.listen(config.port);
    console.log("Server started.")
});
