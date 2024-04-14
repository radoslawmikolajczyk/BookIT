export class Reservation {
    roomId: number
    userId: number
    startTime: string
    endTime: string

    constructor(roomId: number, userId: number, startTime: string, endTime: string) {
        this.roomId = roomId
        this.userId = userId
        this.startTime = startTime
        this.endTime = endTime
    }
}