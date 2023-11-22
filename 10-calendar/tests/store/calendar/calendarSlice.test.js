import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogOutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("Pruebas en calendarSlice", () => {
  it("Deberia regresar el estado inicial", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });
  it("onSetActiveEvent debe activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });
  it("onAddNewEvent debe añadir un nuevo evento", () => {
    const newEvent = {
      id: "3",
      start: new Date("2023-11-22 20:52:00"),
      end: new Date("2023-11-22 22:52:00"),
      title: "Cumpleaños Juan",
      notes: "Notas de prueba",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events.find((e) => e === newEvent)).toBeTruthy();
    expect(state.events).toEqual([...events, newEvent]);
  });
  it("onUpdateEvent debe actualizar el evento", () => {
    const idUpd = "1";
    const newEvent = {
      id: idUpd,
      start: new Date("2023-11-22 20:52:00"),
      end: new Date("2023-11-22 22:52:00"),
      title: "Cumpleaños Juan",
      notes: "Notas de prueba",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(newEvent)
    );
    expect(state.events).toContain(newEvent);
    expect(state.events.filter((e) => e.id === idUpd).length).toBe(1);
  });

  it("onDeleteEvent debe borrar el evento activo", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );

    expect(state.events).toEqual(
      calendarWithActiveEventState.events.filter(
        (e) => e.id !== calendarWithActiveEventState.activeEvent.id
      )
    );
    expect(state.activeEvent).toBeNull();
  });
  it("onLoadEvents debe establecer los eventos", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);
    expect(state.events.length).toEqual(events.length);

    const state2 = calendarSlice.reducer(state, onLoadEvents(events));
    expect(state2.isLoadingEvents).toBeFalsy();
    expect(state2.events).toEqual(events);
    expect(state2.events.length).toEqual(events.length);
  });
  it("onLogoutCalendar debe limpiar el estado", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogOutCalendar()
    );
    expect(state.isLoadingEvents).toBeTruthy();
    expect(state.events).toEqual([]);
    expect(state.activeEvent).toBeNull();
  });
});
