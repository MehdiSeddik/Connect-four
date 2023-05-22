import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import { User } from './Model/UserModel';
import { PayLoad } from './Model/PayLoadModel';

const app = express();
//initialize a simple http server
const server = http.createServer(app);

//List of clients
const users: User[] = [];

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
	ws.on('open', () => console.log('Opened!!!'));
	ws.on('close', () => console.log('Closed!!!'));
	ws.on('message', (message: string) => {
		console.log(`Received message ${message}`);

		const response = JSON.parse(message);
		console.log(`Received message ${response}`);
		ws.send(`Hello, you sent : ${response}`);
	});

	//generate a new user
	const client: User = new User(ws);
	client.userName = 'User' + users.length;
	users.push(client);

	//send the user id to the user
	const payLoad: PayLoad = new PayLoad('connect', client.id);
	ws.send(JSON.stringify(payLoad));
});

//start our server
server.listen(8999, () => {
	console.log(`Server running on port 8999`);
});
