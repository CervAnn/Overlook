import Customer from './Customer'
import domUpdates from './domUpdates'
// import Booking from './Booking'
// import Order from './Order'

class Hotel {
  constructor(customerData, bookingsData, roomData, roomServicesData, today) {
    this.customerData = customerData;
    this.bookingsData = bookingsData;
    this.roomData = roomData;
    this.roomServicesData = roomServicesData;
    this.today = today;
    this.currentCustomer;
  }

  availableRoomsToday() {
    let numOccupiedRooms = this.bookingsData.filter(item => item.date === this.today);
    return this.roomData.length - numOccupiedRooms.length
  }

  totalRoomRevenueToday() {
    let occupiedRooms = this.bookingsData.filter(item => item.date === this.today).map(booking => booking.roomNumber)      
    return occupiedRooms.reduce((acc, num) => {
      this.roomData.forEach(room => {
        if (num === room.number) {
          acc += room.costPerNight
        }
      })   
      return Math.round(100 * acc) / 100
    }, 0) 
  }
  
  totalOrderRevenueToday() {
    let ordersToday = this.roomServicesData.filter(item => item.date === this.today)
    return ordersToday.reduce((acc, item) => {
      acc += item.totalCost
      return Math.round(100 * acc) / 100
    }, 0)
  }

  totalRoomAndOrderRevenueToday() {
    return (this.totalRoomRevenueToday() + this.totalOrderRevenueToday())
  }

  percentOccupied() {
    return (this.bookingsData.filter(item => item.date === this.today).length / this.roomData.length) * 100
  }

  mostPopularBookingDate() {
    let bookingDateFrequency = this.bookingsData.reduce((acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = 1
      }
      acc[item.date]++
      return acc
    }, {})
    let valuesArray = Object.values(bookingDateFrequency).sort((a, b) => b - a);
    return Object.keys(bookingDateFrequency).filter(date => bookingDateFrequency[date] === valuesArray[0]) 
  }

  leastPopularBookingDate() {
    let bookingDateFrequency = this.bookingsData.reduce((acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = 1
      }
      acc[item.date]++
      return acc
    }, {})
    let valuesArray = Object.values(bookingDateFrequency).sort((a, b) => a - b);
    return Object.keys(bookingDateFrequency).filter(date => bookingDateFrequency[date] === valuesArray[0]) 
  }

  allOrdersToday() {
    let ordersToday = this.roomServicesData.filter(item => item.date === this.today)
    if (this.roomServicesData.filter(item => item.date === this.today).length === 0) {
      return "There are currently no room service orders."
    } else {
      return `There are currently ${ordersToday.length} orders for room service: ${ordersToday}`
    }
  }

  searchCustomer(item) {
    return this.customerData.filter(user => (user.name.toUpperCase().includes(item.toUpperCase())))
  }

  findCustomer(item) {
    return this.customerData.find(user => user.name.toUpperCase() === item.toUpperCase())
  }

  createCustomer(name) {
    let id = this.customerData.length + 1
    let newCustomer = new Customer(id, name)
    this.customerData.push(newCustomer)
    return newCustomer
  }

  // displayAllOrdersSpecificDate(date) {
  //   return this.roomServicesData.filter(item => item.date === date)
  // }

  // totalRoomServiceCustomer(customer) {
  //   this.currentCustomer = customer;
  //   let customerOrders = this.roomServiceData.filter(item => item.id === customer.id)
  //   if (customerOrders.length === 0) {
  //     return `This customer does not have any existing orders.`
  //   }
  // }

  createBooking() {

  }

  createOrder() {
    
  }
}

export default Hotel;
