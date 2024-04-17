import { RoomRequest } from "../model/RoomRequest";
import { RoomResponse } from "../model/RoomResponse";

export class RoomService {
    async getAllRooms() : Promise<RoomResponse>{
        const response = await fetch('http://localhost:7777/api/rooms/getAllRooms');
        return await response.json();
    }

    async createRooms(user: RoomRequest) : Promise<string>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        };
        const response = await fetch('http://localhost:7777/api/rooms/createRooms', requestOptions);
        return await response.json();
    }

    async getAvailableRooms(user: RoomRequest) : Promise<string>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        };
        const response = await fetch('http://localhost:7777/api/rooms/getAvailableRooms', requestOptions);
        return await response.json();
    }
}