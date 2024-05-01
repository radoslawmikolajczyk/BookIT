import { ref } from "vue";
import { Reservation } from '../model/Reservation'
import { Tabs } from '../enums/tabs'
import { User } from '../model/User'
import { RoomRequest } from '../model/RoomRequest' 

const reservationsSearched = ref<[Reservation] | null>(null)
const reservationsOwned = ref<[Reservation] | null>(null)
const roomsRequest = ref<RoomRequest | null>(null)

const roomsBuldings = ref<Set<string> | null>(null)
const roomsFloorsNumbers = ref<Set<number> | null>(null)

const myCurrentBookingsEmpty = ref(true)
const myHistoryBookingsEmpty = ref(true)

const authorizedUser = ref<User | null>(null)

const openTab = ref(Tabs.CURRENT)
const openCreateGroupSection = ref(false)

const searchField = ref("")

const stateManager = () => {
  return {
    reservationsSearched,
    reservationsOwned,
    roomsRequest,
    roomsBuldings,
    roomsFloorsNumbers,
    myCurrentBookingsEmpty,
    myHistoryBookingsEmpty,
    authorizedUser,
    openTab,
    openCreateGroupSection,
    searchField
  };
};
 
export default stateManager;