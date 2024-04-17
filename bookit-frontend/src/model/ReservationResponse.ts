import { Reservation } from "./Reservation"

export class ReservationResponse {
    status: string
    reservations: [Reservation]

    constructor(status: string, reservations: [Reservation]) {
        this.status = status
        this.reservations = reservations
    }
}