export class RoomRequest {
    startTime: string
    endTime: string
    buildingName: string
    floorNumber: number

    constructor(startTime: string, endTime: string, buildingName: string, floorNumber: number) {
        this.buildingName = buildingName
        this.floorNumber = floorNumber
        this.endTime = endTime
        this.startTime = startTime
    }
}