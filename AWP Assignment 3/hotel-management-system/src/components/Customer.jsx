import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";

const Customer = () => {
  const { bookings, addBooking, rooms } = useContext(BookingContext);
  const [guestName, setGuestName] = useState("");

  const handleBookNow = (room) => {
    if (guestName.length === 0) {
      alert("Please enter your name to book a room");
    } else {
      const booking = {
        id: Date.now(),
        room,
        guestName,
      };
      addBooking(booking);
      setGuestName("");
    }
  };

  return (
    <div className="h-screen m-10">
      <h1 className="text-2xl font-bold text-center mb-4">
        Hotel Management System
      </h1>
      <h2 className="text-lg font-bold mb-2">Available Rooms</h2>
      <input
        type="text"
        placeholder="Enter your name to book a room"
        className="border p-2 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Room Type</th>
            <th className="px-4 py-2">Room Available</th>
            <th className="px-4 py-2">Capacity</th>
            <th className="px-4 py-2">Price per Night</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="border px-4 py-2 text-left">{room.name}</td>
              <td className="border px-4 py-2 text-center">{room.quantity}</td>
              <td className="border px-4 py-2 text-center">{room.capacity}</td>
              <td className="border px-4 py-2 text-center">{room.price}</td>
              <td className="border px-4 py-2 text-center">
                {room.quantity === 0 ? (
                  <button className="bg-gray-400 text-white px-2 py-1 rounded cursor-not-allowed">
                    Not Available
                  </button>
                ) : bookings.some((booking) =>
                      booking.guestName === guestName &&
                      booking.room === room.name
                  ) ? (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded transition duration-500 ease-in-out hover:bg-blue-600"
                    onClick={() => handleBookNow(room.name)}
                  >
                    Book Another
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded transition duration-500 ease-in-out hover:bg-green-600"
                    onClick={() => handleBookNow(room.name)}
                  >
                    Book Now
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="mt-4 text-blue-500">
        Back to Home
      </Link>
    </div>
  );
};

export default Customer;
