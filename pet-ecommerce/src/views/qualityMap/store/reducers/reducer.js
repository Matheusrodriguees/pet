import { ATUALIZA_MAPA_DE_QUALIDADE } from '../actionTypes.js';


const initialState = {
    mapa: [],
};


const mapaReducer = (state = initialState, action) => {

    switch (action.type) {
        case ATUALIZA_MAPA_DE_QUALIDADE:
            console.log(action.mapa)
            return {
                ...state,
                mapa: action.mapa
            }
        
        default: {
            return state;
        }
    }
};

export default mapaReducer;
