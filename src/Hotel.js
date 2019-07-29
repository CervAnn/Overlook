class Hotel {
  constructor(customerData, bookingsData, roomData, roomServicesData) {
    this.customerData = customerData;
    this.bookingsData = bookingsData;
    this.roomData = roomData;
    this.roomServicesData = roomServicesData;
  }

  availableRoomsToday(today) {
    let numOccupiedRooms = this.bookingsData.filter(item => item.date === today);
    return this.roomData.length - numOccupiedRooms.length
  }

  totalRoomRevenueToday(today) {
    let occupiedRooms = this.bookingsData.filter(item => item.date === today).map(booking => booking.roomNumber)      
    return occupiedRooms.reduce((acc, num) => {
      this.roomData.forEach(room => {
        if (num === room.number) {
          acc += room.costPerNight
        }
      })   
      return acc
    }, 0) 
  }
  
  totalRoomOrderRevenueToday(today) {
    let ordersToday = this.roomServicesData.filter(item => item.date === today)
    let totalOrderEarningsToday = ordersToday.reduce((acc, item) => acc += item.totalCost, 0)
    return Number.parseFloat(this.totalRoomRevenueToday(today) + totalOrderEarningsToday).toFixed(2)
  }

  percentOccupied(today) {
    return (this.bookingsData.filter(item => item.date === today).length / this.roomData.length) * 100
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

  allOrdersToday(today) {
    let ordersToday = this.roomServicesData.filter(item => item.date === today)
    if (this.roomServicesData.filter(item => item.date === today).length === 0) {
      return "There are currently no room service orders."
    } else {
      return `There are currently ${ordersToday.length} orders for room service: ${ordersToday}`
    }
  }

  // searchCustomer(name) {
  // let inputName = name.toLowerCase();
  // return customerData.users.find(user => user.name === inputName);
  // }

  createCustomer() {}

  createBooking() {}

  createOrder() {}
}

export default Hotel;
