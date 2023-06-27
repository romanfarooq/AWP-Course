import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";

const Customer = () => {
  const { bookings, addBooking } = useContext(BookingContext);
  const [guestName, setGuestName] = useState("");

  const handleBookNow = (room) => {
    const booking = {
      id: Date.now(),
      room,
      guestName,
    };

    addBooking(booking);
  };

  const rooms = [
    {
      id: 1,
      name: "Single Room",
      capacity: 1,
      price: 1000,
    },
    {
      id: 2,
      name: "Double Room",
      capacity: 2,
      price: 2000,
    },
    {
      id: 3,
      name: "Deluxe Room",
      capacity: 4,
      price: 4000,
    },
    {
      id: 4,
      name: "Suite",
      capacity: 4,
      price: 6000,
    },
    {
      id: 5,
      name: "Penthouse",
      capacity: 6,
      price: 8000,
    },
  ];

  return (
    <div className="h-screen m-10">
      <h1 className="text-2xl font-bold text-center mb-4">Hotel Management System</h1>
      <h2 className="text-lg font-bold mb-2">Available Rooms</h2>
      <input
        type="text"
        placeholder="Enter your name to book a room"
        className="border p-2 rounded mb-2 w-full"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        required
      />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Room</th>
            <th className="px-4 py-2">Capacity</th>
            <th className="px-4 py-2">Price per Night</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="border px-4 py-2">{room.name}</td>
              <td className="border px-4 py-2">{room.capacity}</td>
              <td className="border px-4 py-2">{room.price}</td>
              <td className="border px-4 py-2">
                {bookings.some((booking) => booking.room === room.name) ? (
                  <button className="bg-gray-400 text-white px-2 py-1 rounded cursor-not-allowed">
                    Not Available
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    disabled={!guestName}
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