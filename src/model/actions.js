export function addOyun(oyun) {
	return {
		type: 'ADD_OYUN',
		oyun
	};
}

export function delOyun(oyun) {
	return {
		type: 'DEL_OYUN',
		oyun
	};
}

export function resetOyun() {
	return {
		type: 'RESET_OYUN'
	};
}
