export class Room {
    buildingName: string
    floorNumber: number
    roomName: string
    description: string
    imageUrl: string

    constructor(buildingName: string, floorNumber: number, roomName: string, description: string, imageUrl: string) {
        this.buildingName = buildingName
        this.floorNumber = floorNumber
        this.roomName = roomName
        this.description = description
        this.imageUrl = imageUrl
    }
}