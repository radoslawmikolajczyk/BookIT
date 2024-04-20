import { createStore } from 'vuex'
import { Reservation } from '../model/Reservation'

export default createStore({
  state: {
    reservationSearched: [Reservation],
    myBookingsEmpty: Boolean,
    authorized: Boolean
  },
  mutations: {
    increment() {
      this.state.reservationSearched
    }
  }
})