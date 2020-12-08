import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.listen(8081);

app.get('/status', (req,res) =>{
    res.send({message: "Yah, it's working!"});
});
app.post('/register', (req,res) =>{
    res.send({message: 'user registered.' + req.body.email});
});
