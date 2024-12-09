import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { toast } from "sonner";
import EventForm from "./eventForm";
import { CalendarEvent } from "./types";
import { EventClickArg } from "@fullcalendar/core/index.js";
import useCalendar from "./hooks/user.calendar";

const Calendar: React.FC = () => {
  const { events, role, setFilter, handleAddEvent, getEventColor } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewEvent = (newEvent: {
    title: string;
    start: string;
    end?: string;
  }) => {
    const newEventWithId = {
      id: `${Date.now()}`,
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
    };
    const success = handleAddEvent(newEventWithId);
    if (success) {
      toast.success("Event added!");
    } else {
      toast.error("Event overlaps with an existing event!");
    }
    setIsModalOpen(false);
  };

  const handleEventClick = (info: EventClickArg) => {
    toast.success(`Clicked on event: ${info.event.title}`);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filter events"
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events.map((event: CalendarEvent) => ({
          ...event,
          backgroundColor: getEventColor(role),
        }))}
        eventClick={handleEventClick}
      />

      {isModalOpen && (
        <EventForm
          onSubmit={handleAddNewEvent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
