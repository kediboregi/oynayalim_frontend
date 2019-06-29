//import decode from 'jwt-decode';
import { getLogin } from './api';

const ACCESS_TOKEN_KEY = 'accessToken';
const LOGGED_KEY = 'logged';

export function login(callback) {
	if (_getAccessToken()){
		setLogged();
		//window.location.href = "/"
		typeof callback === 'function' && callback()
	} else {
		getLogin().then((data) => {
			setAccessToken(data["accessToken"]);
			setLogged();
			//window.location.href = "/"
			typeof callback === 'function' && callback()
		});
	}

	return true;
}

export function logout(callback) {
	//clearAccessToken();
	setLogout();
	typeof callback === 'function' && callback()
	//window.location.href = "/"
}

export function getAccessToken() {
	if (typeof window !== "undefined") {
		if (isLoggedIn()) {
			return localStorage.getItem(ACCESS_TOKEN_KEY);
		} else {
			return false;
		}
	}
}

function _getAccessToken() {
	if (typeof window !== "undefined") {
		return localStorage.getItem(ACCESS_TOKEN_KEY);
	}
}

function clearAccessToken() {
	if (typeof window !== "undefined") {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
	}
}

function setAccessToken(accessToken) {
	if (typeof window !== "undefined") {
		localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	}
}

function getLogged() {
	if (typeof window !== "undefined") {
		return localStorage.getItem(LOGGED_KEY);
	}
}

function setLogout() {
	if (typeof window !== "undefined") {
		return localStorage.setItem(LOGGED_KEY, false);
	}
}

function setLogged() {
	if (typeof window !== "undefined") {
		return localStorage.setItem(LOGGED_KEY, true);
	}
}

export function isLoggedIn() {
	return getLogged() == 'true' ? true : false;

	//const accessToken = getAccessToken();
	//return !!accessToken;
	//return !!accessToken && !isTokenExpired(idToken);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
	let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/*function getTokenExpirationDate(encodedToken) {
	const token = decode(encodedToken);
	if (!token.exp) { return null; }

	const date = new Date(0);
	date.setUTCSeconds(token.exp);

	return date;
}

function isTokenExpired(token) {
	const expirationDate = getTokenExpirationDate(token);
	return expirationDate < new Date();
}*/
