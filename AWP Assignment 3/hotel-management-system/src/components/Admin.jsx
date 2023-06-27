import { useContext } from "react";
import { Link } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";

const Admin = () => {
  const { bookings, deleteBooking } = useContext(BookingContext);

  const handleDelete = (bookingId) => {
    deleteBooking(bookingId);
  };

  return (
    <div className="h-screen m-10">
      <h1 className="text-2xl text-center font-bold mb-4">Admin Dashboard</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Room</th>
            <th className="px-4 py-2">Guest Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="3" className="border px-4 py-2 text-center">
                There are no bookings yet.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border px-4 py-2">{booking.room}</td>
                <td className="border px-4 py-2">{booking.guestName}</td>
                <td className="border px-4 py-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between">
        <Link to="/" className="text-blue-500">
          Go Back
        </Link>
        <Link to="/customer" className="text-blue-500">
          Customer Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Admin;
