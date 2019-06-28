import { createStore } from 'redux';

let ACTIONS = {
	ADD_OYUN: ({ oyunlar, ...state }, { oyun }) => ({
		oyunlar: [...oyunlar, oyun],
		...state
	}),

	DEL_OYUN: ({ oyunlar, ...state }, { oyun }) => ({
		oyunlar: oyunlar.filter( o => o.id!==oyun.id ),
		...state
	}),

	RESET_OYUN: ({ oyunlar, ...state }, { }) => ({
		oyunlar: [],
		...state
	})
};

const INITIAL = {
	oyunlar: []
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, typeof devToolsExtension==='function' ? devToolsExtension() : undefined);
