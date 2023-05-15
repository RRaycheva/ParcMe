export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'UPDATE';

export class Service {
    async handleRequest(url: string, method: RequestMethod = 'GET', headers?: HeadersInit_, body?: string) {
		try {
			const response  = await fetch(url, {
				method,
				headers,
				body,
			});
            const jsonResponse = await response.json();
			return await jsonResponse;
		} catch (error) {
			console.error(error);
			return false;
		}
    }
}
