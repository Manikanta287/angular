import { Action } from '@ngrx/store';

export const Login = '[Home] Login';
export const Logout = '[Home] Logout';

export class HomeAction implements Action {
    readonly type = Login;
    constructor(public payload: {user: string, status: boolean}) {}
}
