import $ from 'jquery';
import './css/base.scss';
import './images/backpack.svg'
import './images/dish.svg'
import './images/door.svg'
import './images/notepad.svg'
import './images/profile.svg'

import Hotel from './Hotel';
import Customer from './Customer';
import Booking from './Booking';
import Order from './Order'


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
    customerData = customerData
      .map(user => user = new Customer(user.id, user.name))
    bookingsData = bookingsData
      .map(booking => booking = new Booking(booking.userID, booking.date, booking.roomNumber))
    roomServicesData = roomServicesData
      .map(order => order = new Order(order.userID, order.date, order.food, order.totalCost))
    let hotel = new Hotel(customerData, bookingsData, roomData, roomServicesData, today)
    $('.splash-page').hide()
    $('.main-page-container').removeAttr('hidden')
    $('.date-today').text(`${today}`)
    $('.total-rooms_today').text(`Today, there are ${hotel.availableRoomsToday()} rooms available.`)
    $('.total-revenue_today').text(`The total hotel revenue for today is $${hotel.totalRoomAndOrderRevenueToday()}.`)
    $('.percent-rooms-occupied_today').text(`The hotel is ${hotel.percentOccupied()}% occupied today.`)
    $('.all-orders_today').text(`${hotel.allOrdersToday()}`)
    $('.most-popular-booking-day').text(`The most popular booking days are ${hotel.mostPopularBookingDate()[0]}, ${hotel.mostPopularBookingDate()[1]}, and ${hotel.mostPopularBookingDate()[2]}.`)
    $('.least-popular-booking-day').text(`The day with the most availability is ${hotel.leastPopularBookingDate()}.`)

    $('#search-all-customers').keyup((e) => {
      e.preventDefault()
      let item = $('#search-all-customers').val()
      if (item === "" || item === " ") {
        $('#dropdown_search-names').empty()
        $('#current-customer_name').empty()
        $('.current-customer').empty()
      } else if (hotel.searchCustomer(item).length === 0) {
        $('#dropdown_search-names').removeAttr('hidden')
        $('#dropdown_search-names').html(`<p id="dropdown-customers"> No customers with this name exist</p>`)
      } else {
        $('datalist').removeAttr('hidden')
        $('datalist').html(hotel.searchCustomer(item).map(user => {
          return `<option value="${user.name}" id="dropdown-customers" hidden></option>`
        }))
      }
    })

    $('#submit-query').click((e) => {
      e.preventDefault()
      let customerName = $('#search-all-customers').val()
      $('.current-customer').removeAttr('hidden')
      $('.current-customer').text(customerName)
      $('#current-customer_name').removeAttr('hidden').text(": " + customerName)
    })

    $('#room-service-orders').click((e) => {
      e.preventDefault()
      let ordersPerDate = hotel.roomServicesData.filter(item => item.date === $('#order-date_search').val().replace(/-/g, "/"))
      if (ordersPerDate.length === 0) {
        return `There are currently no orders for this date.`
      } else {
        $('.current-orders_table').removeAttr('hidden')
        $('.current-orders_added-rows').html(ordersPerDate.map(order => {
          return `
          <tr class="order-item order">
          <td class="order_userID order">${order.userID}</td>
          <td class="order_date order">${order.date}</td>
          <td class="order_food order">${order.food}</td>
          <td class="order_cost order">${order.totalCost}</td>
          </tr>`
        }))
      }
    })

    $('#vacant-rooms_search-button').click((e) => {
      e.preventDefault()
      let occupiedRoomNumPerDate = hotel.bookingsData.filter(item => item.date === $('#vacant-rooms_search').val().replace(/-/g, "/"))
        .map(room => room.roomNumber)
      let availableRooms = hotel.roomData.filter(room => !occupiedRoomNumPerDate.includes(room.number))
      if (availableRooms.length === 0) {
        return `There are no available for this date.`
      } else {
        $('.available-rooms_table').removeAttr('hidden')
        $('.available-rooms_added-row').html(availableRooms.map(room => {
          return `
          <tr class="available-rooms">
            <td class="available-rooms_room-number vacancy">${room.number}</td>
            <td class="available-rooms_room-type vacancy">${room.roomType}</td>
            <td class="available-rooms_bidet vacancy">${room.bidet}</td>
            <td class="available-rooms_num-beds vacancy">${room.numBeds}</td>
            <td class="available-rooms_cost vacancy">${room.costPerNight}</td>
        </tr>`
        }))
      }
    })


    // console.log(addCustomer())

    // function addCustomer() {
    //     let id = customerData.length + 1
    //     let annie = new Customer(customerData.length + 1, "Annie Seymour")
    //     hotel.customerData.push(annie)
    //     return hotel.customerData
    // }

    // console.log(addBooking())

    // function addBooking() {
    //     let booking = new Booking(101, today, 3)
    //     hotel.bookingsData.push(booking)
    //     return hotel.bookingsData
    // }

    // console.log(addOrder())

    // function addOrder() {
    //     let order = new Order(101, today, "McNasty Sammich", 5.00)
    //     hotel.roomServicesData.push(order)
    //     return hotel.roomServicesData
    // }

  }, 1000)  
})
