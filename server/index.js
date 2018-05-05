import express from 'express';
import morgan from 'morgan';
import {
    SERVER_PORT
} from 'config/config';
import mongoose from 'mongoose';
import api from 'modules/api';
import bodyParser from 'body-parser';
import { pullmessage, getMessages } from 'modules/web';

const system = express();

system.use(bodyParser.json());
system.use(bodyParser.urlencoded({
    extended: true
}));
system.use('/api', api);
system.get('/', pullmessage);
system.get('/messages', getMessages);

system.use(morgan('dev'));
system.listen(SERVER_PORT, () => console.log(`Server listen to :${SERVER_PORT}`));
