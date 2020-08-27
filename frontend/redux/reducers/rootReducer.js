import { compose } from "redux";
import returnStateAction from '../actions/actions'

export default function rootReducer(state= {}, action){
    switch (action.type) {
        case 'ACTON_NAME':
            return state;
        default:
            return state;
    };
};