import express from 'express';
import path from 'path';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import { env } from 'process';
import Routes from '../Routes/Routes.js';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

//Settings
const app = express();
const PORT = env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('PORT',PORT);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"../../Views"));
app.engine('html', ejs.renderFile);

//Middlewhere Routes
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../../public')));
app.use('/',Routes);




app.listen(PORT,()=>{
    console.log("Server listen in port: "+PORT);
})