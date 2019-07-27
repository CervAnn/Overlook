import $ from 'jquery';

import './css/base.scss';

import './images/backpack.svg'
import './images/dish.svg'
import './images/door.svg'
import './images/notepad.svg'
import './images/profile.svg'

const userData = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
  .then(data => data.json())
  .then(data => console.log(data))
const roomData = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
  .then(data => data.json())
  .then(data => console.log(data))
const bookingsData = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
  .then(data => data.json())
  .then(data => console.log(data))
const roomServiceData = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices")
  .then(data => data.json())
  .then(data => console.log(data))

let currentDay = new Date();
let date = currentDay.getDate();
let month = currentDay.getMonth() + 1;
let year = currentDay.getFullYear();
if (date < 10) {date = 0 + date};
if (month < 10) {month = 0 + month};
const today = year + "/" + month + "/" + date



$(document).ready(function() {
  setTimeout(function() {
    $('.splash-page').hide()
    $('.main-page-container').removeAttr('hidden')
  }, 5000)
  availableRoomsToday()
})

function availableRoomsToday() {
  console.log(bookingsData.bookings.filter(room => room.date === today))
}