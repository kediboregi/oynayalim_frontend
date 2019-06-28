//import decode from 'jwt-decode';
import { getLogin } from './api';

const ACCESS_TOKEN_KEY = 'accessToken';

export function login() {
	getLogin().then((data) => {
		setAccessToken(data["accessToken"]);
		window.location.href = "/"
	});
	return true;
}

export function logout() {
	clearAccessToken();
	window.location.href = "/";
}

export function getAccessToken() {
	if (typeof window !== "undefined") {
		return localStorage.getItem(ACCESS_TOKEN_KEY);
	}
}

function clearAccessToken() {
	if (typeof window !== "undefined") {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
	}
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
	let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken(accessToken) {
	if (typeof window !== "undefined") {
		localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	}
}

export function isLoggedIn() {
	const accessToken = getAccessToken();
	return !!accessToken;
	//return !!accessToken && !isTokenExpired(idToken);
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
