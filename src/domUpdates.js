import $ from 'jquery'
import Hotel from './Hotel'

const domUpdates = {

  searchVacantRooms(date, data) {
    if (data.length === 0) {
      return `There are no availability for this ${date}.`
    } else {
      $('.available-rooms_table').removeAttr('hidden')
      $('.available-rooms_added-row').html(data.map(room => {
        return `
          <tr>
            <td>${room.number}</td>
            <td>${room.roomType}</td>
            <td>${room.bidet}</td>
            <td>${room.numBeds}</td>
            <td>${room.costPerNight}</td>
        </tr>`
      }))
    }
  },

  displayAllOrdersToday(date, data) {
    let ordersToday = data.filter(item => item.date === date)
    if (ordersToday.length === 0) {
      $(".all-orders_today").text("There are currently no room service orders.")
    } else {
      $(".all-orders_today").text(`There are currently ${ordersToday.length} orders for room service:`)
      $('.display-current-orders_added-rows').html(ordersToday.map(order => {
        return `
        <tr>
          <td>${order.userID}</td>
          <td>${order.date}</td>
          <td>${order.food}</td>
          <td>${order.totalCost}</td>
        </tr>`
      }))
    }
  },

  displayAllOrdersSpecificDate(data) {
    if (data.length === 0) {
      $('.room-service-orders-all').text("There are no orders listed for this date.")
      $('.current-orders_table').prop("hidden", true)
    } else {
      $('.room-service-orders-all').text("")
      $('.current-orders_table').removeAttr('hidden')
      $('.current-orders_added-rows').html(data.map(order => {
        return `
        <tr>
          <td>${order.userID}</td>
          <td>${order.date}</td>
          <td>${order.food}</td>
          <td>${order.totalCost}</td>
        </tr>`
      }))
    }
  },

  displayAllOrdersCustomer(customer, data) {
    if (data.length === 0) {
      $('#cost-breakdown_customer').text(`${customer.name} does not have any existing orders for this date.`)
      $('.customer-orders_table').prop("hidden", true)
    } else {
      $('#cost-breakdown_customer').text("")
      $('.customer-orders_table').removeAttr('hidden')
      $('.customer-order-ledger').text(`Room Service Ledge for ${customer.name}`)
      $('.customer-orders_added-rows').html(data.map(order => {
        return `
          <tr>
            <td>${order.date}</td>
            <td>${order.food}</td>
            <td>${order.totalCost}</td>
          </tr>`
      }))
      this.totalLedgerCustomer(customer, data)
    }
  },

  displayAllBookingsCustomer(customer, data, date) {
    if (data.length === 0) {
      $('#all-bookings_customer').text(`${customer.name} has no recorded bookings.`)
      $('.summary_article').prop("hidden", true)
    } else {
      $('.summary_article').removeAttr('hidden')
      $("#booking-ledger").text(`Booking Ledger for ${customer.name}`)
      $('#all-bookings_customer').text(`${customer.name} has ${data.length} recorded booking(s)`)
      $('.booking-summary_added-row').html(data.map(booking => {
        return `
            <tr>
              <td>${booking.date}</td>
              <td>${booking.roomNumber}</td>
            </tr>`
      }))
    }
    if (data.length === 0 || !data.find(item => item.date === date)) {
      $("#make-booking_customer_today")
        .text(`${customer.name} does not have a booking for today. Would you like to make one?`)
      $("#make-booking_button").removeAttr('hidden')
    }
  },

  filterByRoomType(data) {
    $(".summary_article").prop("hidden", true)
    $('.filtered_rooms').removeAttr('hidden')
    $('.filtered-rooms_added-row').html(data.map(room => {
      return `
        <tr>
          <td>${room.number}</td>
          <td>${room.roomType}</td>
          <td>${room.bidet}</td>
          <td>${room.bedSize}</td>
          <td>${room.numBeds}</td>
          <td>${room.costPerNight}</td>
          <td><form id="button-container"><button type="button" id="${room.number}" form="button-container" class="book-room_button"></button></td>
        </tr>`
    }))
  },

  totalLedgerCustomer(customer, data) {
    let totalSpent = data.filter(user => user.userID === customer.id)
      .reduce((acc, item) => {
        acc += item.totalCost
        return Math.round(100 * acc) / 100
      }, 0)
    $('.total-spent').text(`${totalSpent}`)
  }

}

export default domUpdates;