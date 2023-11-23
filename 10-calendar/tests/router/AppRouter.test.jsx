import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "../fixtures/authStates";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../src/hooks/useAuthStore");
/* jest.mock("react-modal", () => ({useauths
  ...jest.requireActual("react-modal"),
  setAppElement: jest.fn(),
})); */
jest.mock("../../src/calendar/pages/CalendarPage", () => ({
  CalendarPage: () => <h1>Calendar Page</h1>,
}));

describe("Pruebas en AppRouter", () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("Deberia mostrar la pantalla de carga y llamar checkauthtoken", () => {
    useAuthStore.mockReturnValue({
      status: initialState.status,
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    expect(screen.getAllByText("Cargando...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalledWith();
  });
  it("debe mostrar el login si no esta autenticado", () => {
    useAuthStore.mockReturnValue({
      status: notAuthenticatedState.status,
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  it("debe mostrar el Calendario si esta autenticado", () => {
    useAuthStore.mockReturnValue({
      status: authenticatedState.status,
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Calendar Page")).toBeTruthy();
  });
});
