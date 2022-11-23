import { createAction, props } from '@ngrx/store';
import { AppUser } from '../model/appuser.model';

export const register = createAction(
  '[API] Register new User',
  props<AppUser>()
);

export const registerSuccess = createAction(
    '[Store] Register new User Success',
    props<AppUser>()
);