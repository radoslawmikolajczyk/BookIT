export class DateParser {
    static parseDate(date: string) : string {
        var pieces = date.split(/T|Z/)
        return pieces.join(" ").slice(0,-4)
    }

    //yyyy-MM-dd
    static setOnlyDate(date: string, originalDate: string) : string {
        var parsedOriginal = this.parseDate(originalDate)
        var pieces = parsedOriginal.split(" ")
        return date + " " + pieces[1]
    }

    //HH:mm
    static setOnlyTime(time: string, originalDate: string) : string {
        var parsedOriginal = this.parseDate(originalDate)
        var pieces = parsedOriginal.split(" ")
        return pieces[0] + " " + time
    }

    //yyyy-MM-dd HH:mm
}