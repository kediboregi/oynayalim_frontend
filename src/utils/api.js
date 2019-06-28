import axios from 'axios';
import { getAccessToken } from './authservice';

const BASE_URL = 'https://apioynayalim.herokuapp.com';
//const BASE_URL = 'http://localhost:8081';

export {getLogin, getOyunlar, getOyun, postOyun, deleteOyun, postOyuncu, postSkor, deleteSkor};

function getLogin() {
	const url = `${BASE_URL}/login`;
	return axios.get(url).then(response => response.data);
}

function getOyunlar() {
	const url = `${BASE_URL}/oyunlar`;
	return axios.get(url, { headers: { accessToken: `${getAccessToken()}` }}).then(response => response.data);
}

function getOyun(id) {
	const url = `${BASE_URL}/oyun/` + id;
	return axios.get(url, { headers: { accessToken: `${getAccessToken()}` }}).then(response => response.data);
}

function postOyun(data) {
	const url = `${BASE_URL}/oyun`;
	return axios.post(url, {ad: data.ad}, { headers: { accessToken: `${getAccessToken()}` }}).then(response => response.data);
}

function deleteOyun(data) {
	const url = `${BASE_URL}/oyun/` + data.id;
	return axios.delete(url, { headers: { accessToken: `${getAccessToken()}` }}).then(response => response.data);
}

function postOyuncu(data) {
	const url = `${BASE_URL}/oyun/oyuncu`;
	return axios.post(url, {oyun_id: data.oyun_id, ad: data.ad}, { headers: { accessToken: `${getAccessToken()}` }}).then(response => response.data);
}

function postSkor(data) {
	const url = `${BASE_URL}/oyun/skor`;
	return axios.post(url, {oyun_id: data.oyun_id, oyuncu_id: data.oyuncu_id, deger: data.deger}, { headers: { accessToken: `${getAccessToken()}` }}).then(response => response.data);
}

function deleteSkor(data) {
	const url = `${BASE_URL}/oyun/skor`;
	return axios.delete(url, {id: data.id}, { headers: { accessToken: `${getAccessToken()}` }}).then(response => response.data);
}

/*function getCelebrityData() {
	const url = `${BASE_URL}/api/jokes/celebrity`;
	return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}*/
