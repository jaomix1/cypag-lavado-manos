import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BaseLocalStorageService {

    private storge = window.localStorage;

    constructor() { }

    getItem(key: string) {
        return this.storge.getItem(key);
    }

    setString(key: string, value: string) {
        this.storge.setItem(key, value);
    }

    setObject(key: string, data: any) {
        const valueJsonStr = JSON.stringify(data)
        this.storge.setItem(key, valueJsonStr);
    }

    delete(key: string) {
        this.storge.removeItem(key);
    }

    getString(key: string): string | null {
        try {
            return this.storge.getItem(key);
        } catch (ex) {
            return null;
        }
    }

    getObject<T>(key: string): T | null {
        let info: T;
        try {
            info = JSON.parse(this.storge.getItem(key)!);
            return info;
        } catch (ex) {
            return null;
        }
    }

}
