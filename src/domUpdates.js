import $ from 'jquery'
import Hotel from './Hotel'

const domUpdates = {

  searchVacantRooms(date, data) {
    if (data.length === 0) {
      return `There are no available for this ${date}.`
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

  displayAllOrdersSpecificDate(date, data) {
    if (data.length === 0) {
      $('cost-breakdown_customer').text(`There are currently no orders for ${date}.`)
    } else {
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
    let allOrders = data.filter(user => user.userID === customer.id);
    if (allOrders.length === 0) {
      $('#cost-breakdown_customer').text(`${customer.name} does not have any existing orders.`)
    } else {
      $('.customer-orders_table').removeAttr('hidden')
      $('.customer-orders_table').html(allOrders.map(order => {
        return `
          <tr>
            <td>${order.date}</td>
            <td>${order.food}</td>
            <td>${order.totalCost}</td>
          </tr>`
      }))
    }
  },

  ordersByDayCustomer(customer, date, data) {
    let allOrders = data.filter(user => user.userID === customer.id && date === date.date);
    domUpdates.displayAllOrdersCustomer(customer, allOrders)
    let orderTotal = allOrders.reduce((acc, item) => {
      acc += item.totalCost
      return Math.round(100 * acc) / 100
    }, 0)
    $('#total-spent-orders_customer_date')
      .text(`On ${date}, ${customer.name} spent $${orderTotal} on room service.`)
  }

}

export default domUpdates;