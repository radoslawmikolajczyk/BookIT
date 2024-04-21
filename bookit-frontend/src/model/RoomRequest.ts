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

    setTimeMax(time: string) {
        // dodać parsowanie
    }

    setTimeMin(time: string) {
        // dodać parsowanie
    }

    setDateMax(date: string) {
        // dodać parsowanie
    }

    setDateMin(date: string) {
        // dodać parsowanie
    }

    setFloorNumber(number: number) {
        this.floorNumber = number
    }

    setBuildingName(name: string) {
        this.buildingName = name
    }
}