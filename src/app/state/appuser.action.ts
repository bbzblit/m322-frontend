import { createAction, props } from '@ngrx/store';
import { AppUser } from '../model/appuser.model';
import { LoginModel } from '../model/login.model';

export const register = createAction(
  '[API] Register new User',
  props<AppUser>()
);

export const registerSuccess = createAction(
    '[Store] Register new User Success',
    props<AppUser>()
);

export const login = createAction(
  "[API] Login",
  props<LoginModel>()
)

export const loginSuccess = createAction(
  "[Store] loged in success",
  props<AppUser>()
)

export const clearAppUserCach = createAction(
  "[Store] clear AppUserCach"
)

export const tryReLogin = createAction(
  "[API] trying to relogin"
)

export const logout = createAction(
  '[API] login out'
)

export const logoutSuccess = createAction(
  '[Collection] logout success'
)