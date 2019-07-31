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
import domUpdates from './domUpdates'


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
let currentCustomer;

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
    domUpdates.displayAllOrdersToday(today, hotel.roomServicesData)
    $('.most-popular-booking-day').text(`The most popular booking days are ${hotel.mostPopularBookingDate()[0]}, ${hotel.mostPopularBookingDate()[1]}, and ${hotel.mostPopularBookingDate()[2]}.`)
    $('.least-popular-booking-day').text(`The day with the most availability is ${hotel.leastPopularBookingDate()}.`)

    $('#search-customers_input').keyup((e) => {
      e.preventDefault()
      let item = $('#search-customers_input').val()
      if (hotel.searchCustomer(item).length === 0) {
        $('#dropdown_search-names').removeAttr('hidden').html(`<p id="dropdown-customers"> No customers with this name exist</p>`)
      } else {
        $('datalist').removeAttr('hidden').html(hotel.searchCustomer(item).map(user => {
          return `<option value="${user.name}" id="dropdown-customers" hidden></option>`
        }))
      }
      if (hotel.findCustomer(item) !== undefined) {
        currentCustomer = hotel.findCustomer(item)
        $('#search-customers_button').removeAttr('disabled')
      }
    })

    $('#create-customer_button').click((e) => {
      e.preventDefault()
      let name = $('#create-customer_input').val()
      currentCustomer = hotel.createCustomer(name)
      let allOrders = hotel.roomServicesData.filter(user => user.userID === currentCustomer.id)
      let allBookings = hotel.bookingsData.filter(user => user.userID === currentCustomer.id)
      domUpdates.displayAllOrdersCustomer(currentCustomer, allOrders)
      domUpdates.displayAllBookingsCustomer(currentCustomer, allBookings, today)
      $('#current-customer_name').removeAttr('hidden').text(": " + name)
      $('.orders-tab, .rooms-tab').hide()
      $('.orders-tab_customer, .rooms-tab_customer').removeAttr('hidden')
      $('.customer').val("")
    })

    $('#search-customers_button').click((e) => {
      e.preventDefault()
      let name = $('#search-customers_input').val()
      let allOrders = hotel.roomServicesData.filter(user => user.userID === currentCustomer.id)
      let allBookings = hotel.bookingsData.filter(user => user.userID === currentCustomer.id)
      domUpdates.displayAllOrdersCustomer(currentCustomer, allOrders)
      domUpdates.displayAllBookingsCustomer(currentCustomer, allBookings, today)
      $('#current-customer_name').removeAttr('hidden').text(": " + name)
      $('.orders-tab, .rooms-tab').hide()
      $('.orders-tab_customer, .rooms-tab_customer').removeAttr('hidden')
      $('.customer').val("")
    })

    $('#room-service-orders_button').click((e) => {
      e.preventDefault()
      let date = $('#order-date_input').val().replace(/-/g, "/")
      let allOrdersByDate = hotel.roomServicesData.filter(item => item.date === date)
      domUpdates.displayAllOrdersSpecificDate(allOrdersByDate)
    })

    $('#vacant-rooms_search-button').click((e) => {
      e.preventDefault()
      let date = $('#vacant-rooms_search').val().replace(/-/g, "/")
      let occupiedRoomNumPerDate = hotel.bookingsData.filter(item => item.date === date)
        .map(room => room.roomNumber)
      let availableRooms = hotel.roomData.filter(room => !occupiedRoomNumPerDate.includes(room.number))
      domUpdates.searchVacantRooms(date, availableRooms)
    })

    $('#customer-orders_button').click((e) => {
      e.preventDefault()
      let date = $("#customer-order-date_input").val().replace(/-/g, "/")
      let allOrders = roomServicesData.filter(user => user.userID === currentCustomer.id && date === user.date);
      domUpdates.displayAllOrdersCustomer(currentCustomer, allOrders)
    })

    $("#make-booking_button").click((e) => {
      e.preventDefault()
      $("#make-booking_button").prop("hidden", true)
      $("#filter-booking_search").removeAttr('hidden')
    })

    $("#junior-suite_option").click((e) => {
      e.preventDefault()
      let occupiedRoomNumPerDate = hotel.bookingsData.filter(item => item.date === today)
        .map(room => room.roomNumber)
      let availableRooms = hotel.roomData
        .filter(room => !occupiedRoomNumPerDate.includes(room.number) && room.roomType === "junior suite")
      availableRooms.length !== 0 ? domUpdates.filterByRoomType(availableRooms) : `This room type is not available.`
    })

    $("#suite_option").click((e) => {
      e.preventDefault()
      let occupiedRoomNumPerDate = hotel.bookingsData.filter(item => item.date === today)
        .map(room => room.roomNumber)
      let availableRooms = hotel.roomData
        .filter(room => !occupiedRoomNumPerDate.includes(room.number) && room.roomType === "suite")
      availableRooms.length !== 0 ? domUpdates.filterByRoomType(availableRooms) : `This room type is not available.`
    })

    $("#residential-suite_option").click((e) => {
      e.preventDefault()
      let occupiedRoomNumPerDate = hotel.bookingsData.filter(item => item.date === today)
        .map(room => room.roomNumber)
      let availableRooms = hotel.roomData
        .filter(room => !occupiedRoomNumPerDate.includes(room.number) && room.roomType === "residential suite")
      availableRooms.length !== 0 ? domUpdates.filterByRoomType(availableRooms) : `This room type is not available.`
    })

    $("#single-room_option").click((e) => {
      e.preventDefault()
      let occupiedRoomNumPerDate = hotel.bookingsData.filter(item => item.date === today)
        .map(room => room.roomNumber)
      let availableRooms = hotel.roomData
        .filter(room => !occupiedRoomNumPerDate.includes(room.number) && room.roomType === "single room")
      availableRooms.length !== 0 ? domUpdates.filterByRoomType(availableRooms) : `This room type is not available.`
    })

    $("#all-room_options").click((e) => {
      e.preventDefault()
      let occupiedRoomNumPerDate = hotel.bookingsData.filter(item => item.date === today)
        .map(room => room.roomNumber)
      let availableRooms = hotel.roomData
        .filter(room => !occupiedRoomNumPerDate.includes(room.number))
      availableRooms.length !== 0 ? domUpdates.filterByRoomType(availableRooms) : `There are no rooms available.`
    })

    $(document).on('click', '#book-room_button', function(e) {
      e.preventDefault()
      console.log("hey1")
      let roomNum = e.target.id;
      let id = currentCustomer.id;
      let booking = new Booking(id, today, roomNum);
      hotel.bookingsData.push(booking)
    })

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
