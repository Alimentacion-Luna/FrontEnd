import {Injectable} from '@angular/core';
import {Models} from 'appwrite';
import {account} from '../../appwrite';

@Injectable({
  providedIn: 'root'
})
export class FuncsService {
  constructor() {
  }

  async getLoggedInUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      return await account.get();
    } catch (error) {
      console.error(error); // Optionally log the error for debugging purposes
      return null;
    }
  }
}
