import {Client, Account} from 'appwrite';

const currentOrigin = window.location.origin; // e.g., "http://localhost:4200"

export const client = new Client();

client
  .setEndpoint('https://appwrite.ladaniwapa.es/v1')
  .setProject('67ab896c0025f3acc329');

export const account = new Account(client);
export {ID} from 'appwrite';

export const API_URL: String = "https://alimentacionesluna.azurewebsites.net/api";
export const WEB_URL: String = "https://alimentacionesluna.azurewebsites.net/";
