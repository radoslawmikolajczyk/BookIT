import { Group } from "./Group"
import { Reservation } from "./Reservation"

export class User {
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
    group: Group
    reservations: [Reservation]
    
    create(firstName: string, lastName: string, email: string, password: string) : User {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        return this
    }
}