import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { uiSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Pruebas en useUiStore", () => {
  it("Debe regresar los valores por defecto", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });
  it("openDateModal debe poner true el isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => {
        result.current.openDateModal();
    });
    //console.log({result: result.current.isDateModalOpen, isDateModalOpen});
    expect(result.current.isDateModalOpen).toBeTruthy();
  });
  it("onCloseModal debe poner false el isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => {
        result.current.closeDateModal();
    });
    //console.log({result: result.current.isDateModalOpen, isDateModalOpen});
    expect(result.current.isDateModalOpen).toBeFalsy();
  });
  it("onToggleModal debe cambiar el estado de isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => {
        result.current.toggleDateModal();
    });
    expect(result.current.isDateModalOpen).toBeTruthy();

    
    act(() => {
      result.current.toggleDateModal();
    });
    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
