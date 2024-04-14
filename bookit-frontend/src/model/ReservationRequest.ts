export class ReservationRequest {
    userEmail: string
    roomId: number
    startTime: string
    endTime: string

    constructor(userEmail: string, roomId: number, startTime: string, endTime: string) {
        this.userEmail = userEmail
        this.roomId = roomId
        this.startTime = startTime
        this.endTime = endTime
    }
}