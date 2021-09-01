import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _localStorage: Storage;

  private _myData$ = new BehaviorSubject<string>("");
  public myData$ = this._myData$.asObservable()

  constructor(private _localStorageRefService: LocalStorageRefService) {
      this._localStorage = _localStorageRefService.localStorage
  }

  setInfo(token : string) {
    const jsonData = JSON.stringify(token)
    this._localStorage.setItem('token', jsonData)
    this._myData$.next(token)
  }

  loadInfo() : string{
    const data = JSON.parse(this._localStorage.getItem('token') || "");
    this._myData$.next(data)
    return data;
  }
}
