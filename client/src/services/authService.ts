import { Service } from "./baseService";
import {PARCK_ME_SERVER} from "@env"

class AuthService extends Service {
    private defaultEndpoint = PARCK_ME_SERVER
	async register(name, email, password) {
		const headers = { 'Content-Type': 'application/json' }
        const user = JSON.stringify({"name": name, "email": email, "password": password})
		return await this.handleRequest(`${this.defaultEndpoint}/auth/register`, 'POST', headers, user);
	}
    async login(email, password) {
		const headers = { 'Content-Type': 'application/json' }
        const user = JSON.stringify({"email": email, "password": password})
		return await this.handleRequest(`${this.defaultEndpoint}/auth/login`, 'POST', headers, user);
	}
}

export default new AuthService();