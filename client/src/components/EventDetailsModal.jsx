import { FaArrowLeft } from 'react-icons/fa';

export default function EventDetailsModal({ event, onClose, onBook }) {
    if (!event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 font-bold text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                {/* Event Image */}
                {event.image && (
                    <img src={event.image} alt={event.name} className="w-1/2 mx-auto rounded-xl mb-4" />
                )}

                {/* Event Info */}
                <h1 className="text-3xl font-bold">{event.name}</h1>
                <p className="mt-2 text-gray-700">{event.description}</p>

                <div className="mt-4 grid gap-2 text-sm text-gray-600">
                    <p><strong>Category:</strong> {event.category}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p><strong>Price:</strong> ${event.price}</p>
                </div>

                <button
                    onClick={onBook}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
}
