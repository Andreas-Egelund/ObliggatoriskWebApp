import { configureStore } from '@reduxjs/toolkit';
// We import the RTK Query API slice we created for TMDB movies
import { movieApi } from '../services/movieApi';

export const store = configureStore({
  // The 'reducer' object combines our individual state slices.
  reducer: {
    // Add the generated reducer from movieApi as a specific top-level slice
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

// Infer the shapes/types of the store properties.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
