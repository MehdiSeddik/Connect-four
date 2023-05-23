import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import { PayLoad } from './Model/PayLoadModel';

const app = express();
//initialize a simple http server
const server = http.createServer(app);

//List of clients
const users = new Map();

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket, req: any) => {
	const userId = req['headers']['sec-websocket-key'];

	ws.on('open', () => console.log('Opened!!!'));
	ws.on('close', () => {
		users.delete(userId);
		console.log('Closed!!!');
	});
	ws.on('message', message => {
		const result: PayLoad = JSON.parse(message.toString());

		switch (result.method) {
			case 'PlayGame':
				//PlayGame
				ws.send(JSON.stringify('Go PlayGame'));
				break;

			default:
				console.log(`Received message ${result}`);
				ws.send(JSON.stringify(`Hello, you sent : ${result}`));
				break;
		}
	});

	//generate a new user
	users.set(userId, ws);

	//send the user id to the user
	const payLoad: PayLoad = new PayLoad('connect', userId);
	ws.send(JSON.stringify(payLoad));
});

//start our server
server.listen(8999, () => {
	console.log(`Server running on port 8999`);
});
