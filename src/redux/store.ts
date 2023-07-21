import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/user/userSlices';
import { api } from './api/apiSlices';
export const store = configureStore({
  reducer: {
    users: usersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
