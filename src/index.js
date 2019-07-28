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
// let today = year + "/" + month + "/" + date
let today = "2019/10/28"



$(document).ready(function() {
  setTimeout(function() {
    $('.splash-page').hide()
    $('.main-page-container').removeAttr('hidden')
    $('.date-today').text(`${today}`)
    $('.total-rooms_today').text(`Today, there are ${availableRoomsToday()} rooms available.`)
    $('.date-today').text(`${today}`)
    $('.total-revenue_today').text(`The total hotel revenue for today is $${totalRevenueToday()}.`)
    $('.percent-rooms-occupied_today').text(`The hotel is ${percentOccupied()}% occupied today.`)
    $('.all-orders_today').text(`${allOrdersToday()}`)
    $('.most-popular-booking-day').text(`The most popular booking days are ${mostPopularBookingDate()[0]}, ${mostPopularBookingDate()[1]}, and ${mostPopularBookingDate()[2]}.`)
    $('.least-popular-booking-day').text(`The day with the most availability is ${leastPopularBookingDate()}.`)
    console.log(mostPopularOrderingDate())

    $('#room-service-orders').click((e) => {
      e.preventDefault()
      let ordersPerDate = roomServicesData.filter(item => item.date === $('#order-date_search').val().replace(/-/g, "/"))
      console.log(ordersPerDate)
      if (ordersPerDate.length === 0) {
        return `There are currently no orders for this date.`
      } else {
        $('.displayed-room-service-orders').removeAttr('hidden')
        $('.displayed-room-service-orders').html(ordersPerDate.map(order => {
          return `<p>UserID: ${order.userID}, Date: ${order.date}, Food: ${order.food}, Cost: ${order.totalCost}</p>`
        }))
      }
    })

    function availableRoomsToday() {
      let numOccupiedRooms = bookingsData.filter(item => item.date === today);
      return roomData.length - numOccupiedRooms.length
    }

    function totalRevenueToday() {
      let occupiedRooms = bookingsData.filter(item => item.date === today)
        .map(booking => booking.roomNumber)      
      let totalRoomEarnings = occupiedRooms.reduce((acc, num) => {
        roomData.forEach(room => {
          if (num === room.number) {
            acc += room.costPerNight
          }
        })   
        return acc
      }, 0)
      let ordersToday = roomServicesData.filter(item => item.date === today)
      let totalOrderEarningsToday = ordersToday.reduce((acc, item) => {
        acc += item.totalCost
        return acc
      }, 0)
      return Number.parseFloat(totalRoomEarnings + totalOrderEarningsToday).toFixed(2)
    }

    function percentOccupied() {
      return (bookingsData.filter(item => item.date === today).length / roomData.length) * 100
    }

    function allOrdersToday() {
      let ordersToday = roomServicesData.filter(item => item.date === today)
      if (roomServicesData.filter(item => item.date === today).length === 0) {
        return "There are currently no room service orders."
      } else {
        return `There are currently ${ordersToday.length} orders for room service: ${ordersToday}`
      }
    }

    function mostPopularBookingDate() {
      let bookingDateFrequency = bookingsData.reduce((acc, item) => {
        if (!acc[item.date]) {
          acc[item.date] = 1
        }
        acc[item.date]++
        return acc
      }, {})
      let valuesArray = Object.values(bookingDateFrequency).sort((a,b) => b - a);
      return Object.keys(bookingDateFrequency).filter(date => bookingDateFrequency[date] === valuesArray[0]) 
    }

    function leastPopularBookingDate() {
      let bookingDateFrequency = bookingsData.reduce((acc, item) => {
        if (!acc[item.date]) {
          acc[item.date] = 1
        }
        acc[item.date]++
        return acc
      }, {})
      let valuesArray = Object.values(bookingDateFrequency).sort((a, b) => a - b);
      return Object.keys(bookingDateFrequency).filter(date => bookingDateFrequency[date] === valuesArray[0]) 
    }

    function mostPopularOrderingDate() {
      let orderDateFrequency = roomServicesData.reduce((acc, item) => {
        if (!acc[item.date]) {
          acc[item.date] = 1
        }
        acc[item.date]++
        return acc
      }, {})
      let ordersArray = Object.values(orderDateFrequency).sort((a, b) => b - a);
      console.log(orderDateFrequency)
      return Object.keys(orderDateFrequency).filter(date => orderDateFrequency[date] === ordersArray[0]) 
    }












  }, 3000)  
})
