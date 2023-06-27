import { useState, createContext } from "react";
import propTypes from "prop-types";

export const BookingContext = createContext();

const BookingContextProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings([...bookings, booking]);
  };

  const deleteBooking = (bookingId) => {
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;

BookingContextProvider.propTypes = {
    children: propTypes.node.isRequired,
};