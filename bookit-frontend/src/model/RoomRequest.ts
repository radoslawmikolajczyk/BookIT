import { DateParser } from "../utils/dateParser"

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
        this.endTime = time
    }

    setTimeMin(time: string) {
        this.startTime = time
        //DateParser.parseDate
    }

    setDateMax(date: string) {
        this.endTime = date
    }

    setDateMin(date: string) {
        this.startTime = date
    }

    setFloorNumber(number: number) {
        this.floorNumber = number
    }

    setBuildingName(name: string) {
        this.buildingName = name
    }


}