import { Room } from "./Room"
import { User } from "./User"

export class Reservation {
    room: Room
    user: User
    startTime: string
    endTime: string
}