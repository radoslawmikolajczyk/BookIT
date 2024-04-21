import { createStore } from 'vuex'
import { Reservation } from '../model/Reservation'
import { Tabs } from '../enums/tabs'

export default createStore({
  state: {
    reservationsSearched: [Reservation],
    reservationsOwned: [Reservation],
    myCurrentBookingsEmpty: Boolean,
    myHistoryBookingsEmpty: Boolean,
    authorized: Boolean,
    openTab: Tabs.CURRENT
  },
  mutations: {
    increment() {
      //this.state.reservationSearched
    }
  }
})