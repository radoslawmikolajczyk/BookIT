export class UserService {

    async getUserById(id: string) : Promise<string>{
        const response = await fetch('http://localhost:7777/api/users/'+id);
        return await response.json();
    }

    async getUserByEmail(email: string) : Promise<string>{
        const response = await fetch('http://localhost:7777/api/users/getByEmail/'+email);
        return await response.json();
    }

    async createUser(id: string) : Promise<string>{
        const response = await fetch('http://localhost:7777/api/users/register');
        return await response.json();
    }

    async login(id: string) : Promise<string>{
        const response = await fetch('http://localhost:7777/api/users/login');
        return await response.json();
    }

}