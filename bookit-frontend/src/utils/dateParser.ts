export class DateParser {
   static parseDate(date: string) : string {
        var pieces = date.split(/T|Z/)
        return pieces.join(" ").slice(0,-4)
    }

    //yyyy-MM-dd
    static getOnlyDate(originalDate: string) : string {
        var parsedOriginal = this.parseDate(originalDate)
        var pieces = parsedOriginal.split(" ")
        return pieces[0]
    }

    //HH:mm
    static getOnlyTime(originalDate: string) : string {
        var parsedOriginal = this.parseDate(originalDate)
        var pieces = parsedOriginal.split(" ")
        return pieces[1]
    }

    //yyyy-MM-dd
    static setOnlyDate(originalDate: string) : string {
        var parsedOriginal = this.parseDate(originalDate)
        var pieces = parsedOriginal.split(" ")
        return pieces[0]
    }

    //HH:mm
    static setOnlyTime(time: string, originalDate: string) : string {
        var parsedOriginal = this.parseDate(originalDate)
        var pieces = parsedOriginal.split(" ")
        return pieces[0] + " " + time
    }

    //yyyy-MM-dd HH:mm
}