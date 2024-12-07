import React, { useState } from "react";
import { CalendarEvent } from "./types";

interface EventFormProps {
  onSubmit: (event: CalendarEvent) => void;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && start) {
      const newEvent: CalendarEvent = {
        id: `${Date.now()}`,
        title,
        start,
        end,
      };
      onSubmit(newEvent);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Event
        </button>
      </form>
      <button
        onClick={onClose}
        className="bg-gray-500 text-white p-2 rounded mt-2"
      >
        Close
      </button>
    </div>
  );
};

export default EventForm;
