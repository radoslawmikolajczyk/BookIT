import { ReservationRequest } from "../model/ReservationRequest";
import { Reservation } from "../model/Reservation";
import { RequestResponse } from "../model/RequestResponse";

export class ReservationService {
    async getAllUserReservations(email: string) : Promise<RequestResponse>{
        const response = await fetch('http://localhost:7777/api/reservations/getAllUserReservations/' + email);
        return await response.json();
    }

    async getHistoryReservations(email: string) : Promise<{status: string, reservations:[Reservation]}>{
        const response = await fetch('http://localhost:7777/api/reservations/getHistoryReservations/' + email);
        return await response.json();
    }

    async createReservation(request: ReservationRequest) : Promise<RequestResponse>{
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
        };
        const response = await fetch('http://localhost:7777/api/reservations/createReservation', requestOptions);
        return await response.json();
    }

    async deleteReservation(request: ReservationRequest) : Promise<RequestResponse>{
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
        };
        const response = await fetch('http://localhost:7777/api/reservations/deleteReservation', requestOptions);
        return await response.json();
    }
}
