import $ from 'jquery';
import './css/base.scss';
import './images/backpack.svg'
import './images/dish.svg'
import './images/door.svg'
import './images/notepad.svg'
import './images/profile.svg'

import Hotel from './Hotel'

let customerData;
let bookingsData;
let roomData;
let roomServicesData;

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
  .then(response => response.json())
  .then(data => customerData = data.users)
fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
  .then(response => response.json())
  .then(data => bookingsData = data.bookings)
fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
  .then(response => response.json())
  .then(data => roomData = data.rooms)
fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices")
  .then(response => response.json())
  .then(data => roomServicesData = data.roomServices)

let currentDay = new Date();
let date = currentDay.getDate();
let month = currentDay.getMonth() + 1;
let year = currentDay.getFullYear();
if (date < 10) {date = "0" + date}
if (month < 10) {month = "0" + month}
let today = year + "/" + month + "/" + date



$(document).ready(function() {
  setTimeout(function() {
    $('.splash-page').hide()
    $('.main-page-container').removeAttr('hidden')
    availableRoomsToday()

    function availableRoomsToday() {
      let numOccupiedRooms = bookingsData.filter(item => item.date === today);
      console.log(roomData.length - numOccupiedRooms.length)
    }

    function totalRevenueToday() {
    
    }













}, 3000)  
})
