export class PayLoad {
	constructor(method: string, userId: string) {
		this.method = method;
		this.userId = userId;
	}

	method: string;
	userId: string;
}
