import { useState } from "react";
import { CalendarEvent } from "../types";

const useCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [role] = useState<string>("user");

  const getEventColor = (role: string) => {
    switch (role) {
      case "admin":
        return "#ff0000";
      case "trainer":
        return "#007bff";
      case "user":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  const handleAddEvent = (newEvent: CalendarEvent) => {
    if (newEvent.end && checkOverlap(newEvent.start, newEvent.end)) {
      return false;
    }
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    return true;
  };

  const checkOverlap = (start: string, end: string) => {
    return events.some((event) => {
      const existingStart = new Date(event.start).getTime();
      const existingEnd = event.end
        ? new Date(event.end).getTime()
        : existingStart;
      const newStart = new Date(start).getTime();
      const newEnd = new Date(end || start).getTime();
      return newStart < existingEnd && newEnd > existingStart;
    });
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(filter.toLowerCase())
  );

  return {
    events: filteredEvents,
    role,
    setFilter,
    handleAddEvent,
    getEventColor,
  };
};

export default useCalendar;
