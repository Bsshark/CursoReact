import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import "./CalendarModal.css";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setformSubmitted] = useState(false);

  const [formValues, setformValues] = useState({
    title: "Nota ejemplo",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit libero recusandae nihil fugiat ex velit neque adipisci quia ad sint? Eveniet deserunt odio magni modi neque non doloremque vitae libero.",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if(activeEvent !== null) {
      setformValues({ ...activeEvent});
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (e, changing) => {
    setformValues({
      ...formValues,
      [changing]: e,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
    setformSubmitted(false);
  };

  const onSubmit = async(e) => {
    setformSubmitted(true);
    e.preventDefault();
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas", "error");
      return;
    }

    if (formValues.title.length <= 0) {
      return;
    }
    await startSavingEvent(formValues);
    closeDateModal();
    setformSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <div className="customDatePickerWidth">
            <DatePicker
              locale="es"
              timeCaption="Hora"
              maxDate={formValues.end}
              selected={formValues.start}
              onChange={(date) => onDateChange(date, "start")}
              className="form-control"
              dateFormat="Pp"
              showTimeSelect
            />
          </div>
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <div className="customDatePickerWidth">
            <DatePicker
              locale="es"
              timeCaption="Hora"
              showTimeSelect
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(date) => onDateChange(date, "end")}
              className="form-control"
              dateFormat="Pp"
            />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
