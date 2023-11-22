import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  checkingState,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("Pruebas en authSlice", () => {
  it("Deberia retornar el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
  it("Deberia cambiar el estado a checking", () => {
    const state = authSlice.reducer(initialState, onChecking());
    expect(state).toEqual(checkingState);
  });
  it("Debe realizar un login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });
  it("Debe de realizar el logout sin y con error msg", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual(notAuthenticatedState);

    const errorMsg = "Error en logOut";
    const stateError = authSlice.reducer(
      authenticatedState,
      onLogout(errorMsg)
    );
    expect(stateError).toEqual({
      ...notAuthenticatedState,
      errorMessage: errorMsg,
    });
  });
  it("Debe limpiar el errorMessage", () => {
    const state = authSlice.reducer(
      { ...notAuthenticatedState, errorMessage: "Error" },
      clearErrorMessage()
    );
    expect(state.errorMessage).toBeUndefined();
  });
});
