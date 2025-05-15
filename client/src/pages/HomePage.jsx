import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import EventCard from '../components/EventCard';
import { useState } from 'react';
import EventDetailsModal from '../components/EventDetailsModal';

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: user,
    isLoading: userLoading,
    isSuccess: userLoaded
  } = useQuery(['user'], () => api.get('/auth/me').then(res => res.data));

  const {
    data: events,
    isLoading: eventsLoading
  } = useQuery(['events'], () => api.get('/event').then(res => res.data), {
    enabled: userLoaded
  });

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleBooking = async () => {
    try {
      await api.post(`/event/book/${selectedEvent._id}`);
      handleCloseModal();
      alert('Booking successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  if (userLoading || eventsLoading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.events.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            user={user}
            onOpenDetails={() => handleOpenModal(event)}
          />
        ))}
      </div>

      {isModalOpen && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={handleCloseModal}
          onBook={handleBooking}
        />
      )}
    </>
  );
}
