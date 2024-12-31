import React, { useState, useEffect } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [currentType, setCurrentType] = useState("upcoming");

  useEffect(() => {
    const fetchEvents = async () => {
      const data = [
        { id: 1, title: "Alumni Network Night", type: "upcoming", date: "2024-01-15", time: "10:00 AM", image: "https://via.placeholder.com/150" },
        { id: 2, title: "Networking Event", type: "ongoing", date: "2024-01-10", time: "2:00 PM", image: "https://via.placeholder.com/150" },
        { id: 3, title: "Alumni Meet", type: "completed", date: "2023-12-20", time: "4:00 PM", image: "https://via.placeholder.com/150" },
        { id: 4, title: "Career Fair", type: "upcoming", date: "2024-02-01", time: "11:00 AM", image: "https://via.placeholder.com/150" },
      ];
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => event.type === currentType);

  return (
    <div className="p-6 bg-white min-h-screen shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-[#0e3e7b]">Events Page</h1>

      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        {["upcoming", "ongoing", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setCurrentType(type)}
            className={`px-4 py-2 rounded ${currentType === type ? "bg-[#0e3e7b] text-white" : "bg-white text-[#0e3e7b] border border-[#0e3e7b] hover:bg-[#0e3e7b] hover:text-white"}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-3xl shadow-md">
              <div className="text-left mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-[#0e3e7b]">{event.title}</h3>
                <p className="text-sm capitalize text-black">{event.type}</p>
                <p className="text-sm text-black"><span className="font-semibold">Date:</span> {event.date}</p>
                <p className="text-sm text-black"><span className="font-semibold">Time:</span> {event.time}</p>
                {currentType === "upcoming" && (
                  <button className="mt-4 bg-[#0e3e7b] text-white px-4 py-2 rounded-2xl hover:bg-[#0b2c52]">
                    Enroll
                  </button>
                )}
              </div>
              <div>
                <img src={event.image} alt={event.title} className="w-96 h-48 rounded-3xl object-cover" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#0e3e7b]">No events found</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
