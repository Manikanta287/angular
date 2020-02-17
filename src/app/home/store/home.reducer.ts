import * as fromHome from './home.actions';

export interface State {
    user: string;
    status: boolean;
}

const initialstate: State = {
    user: '',
    status: false
};

export function homeReducer(state= initialstate, action: fromHome.HomeAction) {
    switch (action.type) {
        case fromHome.Login:
            return {...state, user: action.payload.user,
                status: action.payload.status};
            default:
                return state;
    }
}
