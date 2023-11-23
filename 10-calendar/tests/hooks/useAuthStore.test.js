import { configureStore } from "@reduxjs/toolkit";
import { authSlice, onLogout } from "../../src/store";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { Provider } from "react-redux";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";
//import { testUserCredentials } from "../fixtures/testUser";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en useAuthStore", () => {
  beforeEach(() => localStorage.clear());
  it("Debe regresar los valores por defecto", () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      errorMessage: undefined,
      status: "checking",
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });
  it("startLogin debe realizar el login", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({ ...testUserCredentials });
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: {
        name: testUserCredentials.name,
        uid: testUserCredentials.uid,
      },
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });
  it("startLogin debe fallar la autenticacion", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.startLogin({
        ...testUserCredentials,
        password: testUserCredentials.password + "-",
      });
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      ...notAuthenticatedState,
      errorMessage: expect.any(String),
    });

    //Espera a que el expect se cumpla. Sino, falla.
    await waitFor(() => expect(result.current.errorMessage).toBeUndefined());
  });
  it("startRegister debe crear el usuario", async () => {
    const newUser = {
      email: "testing@google.com",
      password: "123456",
      name: "Test User 2",
    };
    const returnUser = {
      ok: true,
      uid: "uid-test",
      name: "Test User 2",
      token: "token-test",
    };
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: returnUser,
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      user: {
        name: returnUser.name,
        uid: returnUser.uid,
      },
      errorMessage: undefined,
      status: authenticatedState.status,
    });
    spy.mockRestore();
  });
  it("startRegister debe fallar la creación", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      status: notAuthenticatedState.status,
      errorMessage: expect.any(String),
      user: {},
    });
  });
  it("checkAuthToken debe de fallar si no hay token", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual(notAuthenticatedState);
  });
  it("checkAuthToken debe de authenticar si hay token", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      ...authenticatedState,
      user: {
        name: testUserCredentials.name,
        uid: testUserCredentials.uid,
      },
    });
  });
});
