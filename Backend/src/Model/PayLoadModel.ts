import { User } from './UserModel';

export class PayLoad {
	constructor(method: string, clientId: string) {
		this.method = method;
		this.clientId = clientId;
	}

	method: string;
	clientId: string;
}
