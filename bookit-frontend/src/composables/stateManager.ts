import { ref, watch } from "vue";
import { Reservation } from '../model/Reservation'
import { Section } from '../enums/section'
import { User } from '../model/User'
import { RoomRequest } from '../model/RoomRequest' 
import dayjs from "dayjs";
import { Room } from "../model/Room";
import { Group } from "../model/Group";

const roomsRequest = ref<RoomRequest | null>(null)
const rooms = ref<Room[] | null>(null)
const roomsBackup = ref<Room[] | null>(null)
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
const filterMessage = ref("")
const assignedGroup = ref<Group | null>(null)

const stateManager = () => {
  return {
    // Global
    assignedGroup,
    // MainPage
    roomsRequest,

    // Filters
    rooms,
    roomsBackup,
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
    openMenu,
    filterMessage
  };
};

watch(stateManager, () => {
  updateStateURL()
  },
  { deep: true }
)

function updateStateURL() {

  // addHashToLocation(params) {
  //   history.pushState(
  //     {},
  //     null,
  //     this.$route.path + '#' + encodeURIComponent(params)
  //   )
  // }

  // var state = {}

  // switch(openSection.value) {
  //   case Section.BOOKINGS_CALENDAR:
  //     state = {
  //       searchField: searchField
  //     }
  //     break;
  //   case Section.BOOKINGS_SCHEDULE:
  //     // code block
  //     break;
  //   case Section.GROUPS:
  //     state = {
  //       searchField: searchField
  //     }
  //     break;
  //   case Section.BOOKINGS_CALENDAR:
  //   // code block
  //     break;
  //   default:
  //     // code block
  // }

  // const state = {
  //   // roomsRequest: roomsRequest,
  //   // rooms:rooms,

  //   // floorSelected:floorSelected, 
  //   // buildingSelected:buildingSelected, 
  //   // roomNumberSelected:roomNumberSelected, 

  //   // userReservationsChecked:userReservationsChecked,
  //   // reservationTimeMin:reservationTimeMin,
  //   // reservationTimeMax:reservationTimeMax,
  //   // dateSelected:dateSelected,
  //   // reservationsSchedule:reservationsSchedule,
  //   // reservationsScheduleBackup:reservationsScheduleBackup,
  //   // isCreateReservationButtonBlocked:isCreateReservationButtonBlocked,
  //   // today:today,
  //   // mostRecentReservation:mostRecentReservation,
  //   // openMenu:openMenu
  // };

  // const link = `${window.location.origin}/groups#${encodeURIComponent(JSON.stringify(state))}`;
  // console.log(link)
}

export default stateManager;