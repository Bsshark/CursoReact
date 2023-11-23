import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";

jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas en FabDelete component", () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("Debe mostrar el componente", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");
    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
    expect(btn.classList).toContain("fab-danger");
    expect(btn.style.display).toBe("none");
    expect(screen).toMatchSnapshot();
  });
  it("Debe mostrar el boton si hay un evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");
    expect(btn.style.display).toBe("");
  });
  it("Debe llamar startDeletingEvent si hay evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalled();
    expect(mockStartDeletingEvent).toHaveBeenCalledWith();
  });
});
