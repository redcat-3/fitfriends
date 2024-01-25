import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../constant';

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
