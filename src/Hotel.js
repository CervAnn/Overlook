class Hotel {
  constructor(customerData, bookingsData, roomData, roomServicesData, today) {
    this.customerData = customerData;
    this.bookingsData = bookingsData;
    this.roomData = roomData;
    this.roomServicesData = roomServicesData;
    this.today = today;
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
      return acc
    }, 0) 
  }
  
  totalOrderRevenueToday() {
    let ordersToday = this.roomServicesData.filter(item => item.date === this.today)
    return ordersToday.reduce((acc, item) => acc += item.totalCost, 0)
  }

  totalRoomAndOrderRevenueToday() {
    return Number.parseFloat(this.totalRoomRevenueToday() + this.totalOrderRevenueToday()).toFixed(2)
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

  searchCustomer() {

  }

  createCustomer() {

  }

  createBooking() {

  }

  createOrder() {
    
  }
}

export default Hotel;
