import { RequestResponse } from "../model/RequestResponse";
import { User } from "../model/User";

export class UserService {

    async getUserById(id: string) : Promise<RequestResponse>{
        const response = await fetch('http://localhost:7777/api/users/'+id);
        return await response.json();
    }

    async getUserByEmail(email: string) : Promise<RequestResponse>{
        const response = await fetch('http://localhost:7777/api/users/getByEmail/'+email);
        return await response.json();
    }

    async createUser(user: User) : Promise<RequestResponse>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        };
        const response = await fetch('http://localhost:7777/api/users/register', requestOptions);
        return await response.json();
    }

    async login(user: User) : Promise<RequestResponse>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        };
        const response = await fetch('http://localhost:7777/api/users/login', requestOptions);
        return await response.json();
    }
}