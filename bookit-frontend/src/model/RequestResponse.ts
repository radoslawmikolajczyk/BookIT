import { Group } from "./Group";
import { Reservation } from "./Reservation";
import { Room } from "./Room"
import { User } from "./User"

export class RequestResponse {
    user: User
    group: Group
    room: Room
    reservation: Reservation
    groups: [Group]
    rooms: [Room]
    reservations: [Reservation]
    message: string
    isSuccess: boolean
} 