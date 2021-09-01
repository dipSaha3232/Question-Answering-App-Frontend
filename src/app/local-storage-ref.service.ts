import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRefService {

  constructor() { }

  getLocalStorage(): Storage {
    return localStorage;
  }

  get localStorage(): Storage {
    return this.getLocalStorage();
  }
}
