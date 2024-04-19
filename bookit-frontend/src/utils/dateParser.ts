export class DateParser {
    static parseDate(date: string) : string {
        var pieces = date.split(/T|Z/)
        return pieces.join(" ").slice(0,-4)
    }
}