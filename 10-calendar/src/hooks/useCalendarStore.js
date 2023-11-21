import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend

    // TODO: todo bien
    if (calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      //Creando
      try {
        const { data } = await calendarApi.post("/events", calendarEvent);
        dispatch(
          onAddNewEvent({
            ...calendarEvent,
            id: data.evento.id,
            user,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingEvent = async () => {
    // TODO: Llegar al backed
    dispatch(onDeleteEvent());
  };

  return {
    //Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    //Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
