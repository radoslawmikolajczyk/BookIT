import { createStore } from 'vuex'
import { Reservation } from '../model/Reservation'
import { Tabs } from '../enums/tabs'
import { User } from '../model/User'
import { RoomRequest } from '../model/RoomRequest'

export default createStore({
  state: {
    reservationsSearched: [Reservation],
    reservationsOwned: [Reservation],
    roomsRequest: RoomRequest,
    myCurrentBookingsEmpty: Boolean,
    myHistoryBookingsEmpty: Boolean,
    authorizedUser: User,
    authorized: Boolean,
    openTab: Tabs.CURRENT
  },
  mutations: {
    increment() {
      //this.state.reservationSearched
    }
  }
})