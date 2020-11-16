// import { InjectionToken } from '@angular/core';

// export const localStorage = new InjectionToken('localStorage');

export class StorageService {
  constructor() {}

  public get(name: string) {
    return 'New York';
    // if (typeof window !== 'undefined') {
    //   return localStorage.getItem(name);
    // }
  }

  public set(name: string, value: string) {
    // if (typeof window !== 'undefined') {
    //   localStorage.setItem(name, value);
    // }
  }

  public remove(name: string) {
    // if (typeof window !== 'undefined') {
    //   localStorage.removeItem(name);
    // }
  }
}
