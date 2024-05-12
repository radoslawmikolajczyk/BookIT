import { ref } from "vue";
import { Reservation } from '../model/Reservation'
import { Section } from '../enums/section'
import { User } from '../model/User'
import { RoomRequest } from '../model/RoomRequest' 
import dayjs from "dayjs";
import { Room } from "../model/Room";

const roomsRequest = ref<RoomRequest | null>(null)
const rooms = ref<Room[] | null>(null)
const roomsBuldings = ref<Set<string> | null>(null)
const roomsFloorsNumbers = ref<Set<number> | null>(null)
const roomsNumbers = ref<Set<string> | null>(null)
const myCurrentBookingsEmpty = ref(true)
const authorizedUser = ref<User | null>(null)
const openSection = ref(Section.MAINPAGE)
const openCreateGroupSection = ref(false)
const searchField = ref("")
const dateSelected = ref(dayjs());
const reservationsSchedule = ref<Reservation[]>()
const reservationsScheduleBackup = ref<Reservation[]>()
const today = ref(dayjs().format("YYYY-MM-DD"));
const floorSelected = ref(0)
const buildingSelected = ref("")
const roomNumberSelected = ref("")
const userReservationsChecked = ref(false)
const isCreateReservationButtonBlocked = ref(true)
const reservationTimeMax = ref("")
const reservationTimeMin = ref("")
const displayedReservation = ref<Reservation>()
const mostRecentReservation = ref<Reservation>()
const openMenu = ref(false)

const stateManager = () => {
  return {
    // Global

    // MainPage
    roomsRequest,

    // Filters
    rooms,
    roomsNumbers,
    roomsBuldings,
    roomsFloorsNumbers,
    floorSelected, 
    buildingSelected, 
    roomNumberSelected, 
    userReservationsChecked,
    reservationTimeMin,
    reservationTimeMax,
    // Others
    myCurrentBookingsEmpty,
    authorizedUser,
    openSection,
    openCreateGroupSection,
    searchField,

    // Schedule
    dateSelected,
    reservationsSchedule,
    reservationsScheduleBackup,
    isCreateReservationButtonBlocked,
    today,
    displayedReservation,

    mostRecentReservation,
    openMenu
  };
};



export default stateManager;