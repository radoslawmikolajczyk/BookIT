import { Room } from "./Room"
import { User } from "./User"

export class Reservation {
    room: Room
    user: User
    startTime: string
    endTime: string

    constructor(room: Room, user: User, startTime: string, endTime: string) {
        this.room = room
        this.user = user
        this.startTime = startTime
        this.endTime = endTime
    }
}