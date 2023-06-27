import { useState, createContext } from "react";
import propTypes from "prop-types";

export const BookingContext = createContext();

const BookingContextProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    decreaseRoomQuantity(booking.room);
    setBookings([...bookings, booking]);
  };

  const deleteBooking = (bookedRoom) => {
    setBookings(bookings.filter((booking) => booking.id !== bookedRoom.id));
    increaseRoomQuantity(bookedRoom.room);
  };

  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Single Room",
      capacity: 1,
      price: 1000,
      quantity: 10,
    },
    {
      id: 2,
      name: "Double Room",
      capacity: 2,
      price: 2000,
      quantity: 8,
    },
    {
      id: 3,
      name: "Deluxe Room",
      capacity: 4,
      price: 4000,
      quantity: 6,
    },
    {
      id: 4,
      name: "Suite",
      capacity: 4,
      price: 6000,
      quantity: 4,
    },
    {
      id: 5,
      name: "Penthouse",
      capacity: 6,
      price: 8000,
      quantity: 2,
    },
  ]);

  const decreaseRoomQuantity = (roomName) => {
    setRooms(
      rooms.map((room) =>
        room.name === roomName ? { ...room, quantity: room.quantity - 1 } : room
      )
    );
  };

  const increaseRoomQuantity = (roomName) => {
    setRooms(
      rooms.map((room) =>
        room.name === roomName ? { ...room, quantity: room.quantity + 1 } : room
      )
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        deleteBooking,
        rooms,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;

BookingContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};
