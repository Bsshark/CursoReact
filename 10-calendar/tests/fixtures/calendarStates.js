export const events = [
  {
    id: "1",
    start: new Date("2023-11-22 20:52:00"),
    end: new Date("2023-11-22 22:52:00"),
    title: "Cumpleaños Abraham",
    notes: "Notas de prueba",
  },
  {
    id: "2",
    start: new Date("2023-11-22 20:52:00"),
    end: new Date("2023-11-22 22:52:00"),
    title: "Cumple Clara",
    notes: "Nota de Clara",
  },
];
export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
