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
      $('#cost-breakdown_customer').text(`${customer.name} does not have any existing orders.`)
      $('.customer-orders_table').prop("hidden", true)
    } else {
      $('#cost-breakdown_customer').text("")
      $('.customer-orders_table').removeAttr('hidden')
      $('.customer-orders_added-rows').html(data.map(order => {
        return `
          <tr>
            <td>${order.date}</td>
            <td>${order.food}</td>
            <td>${order.totalCost}</td>
          </tr>`
      }))
    }
  },

  totalByDayCustomer(customer, date, data) {
    let allOrders = data.filter(user => user.userID === customer.id && date === date.date);
    domUpdates.displayAllOrdersCustomer(customer, allOrders)
    let totalSpent = allOrders.reduce((acc, item) => {
      acc += item.totalCost
      return Math.round(100 * acc) / 100
    }, 0)
    $('.customer-orders_added-rows').after(`
        <tfoot>
            <tr>
                <td colspan="2">TOTAL</td>
                <td id="total-spent">${totalSpent}</td>
            </td>
        </tr>
      </tfoot>`
    )
  }

}

export default domUpdates;