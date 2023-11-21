import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { uiSlice, authSlice, calendarSlice } from "./";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})