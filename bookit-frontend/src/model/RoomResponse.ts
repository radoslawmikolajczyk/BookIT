import { Room } from "./Room"

export class RoomResponse {
    status: string
    rooms: [Room]

    constructor(status: string, rooms: [Room]) {
        this.status = status
        this.rooms = rooms
    }
}