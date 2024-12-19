import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseLocalStorageService } from './base-local-storage.service';
import { LocalStorageConstants } from '../../constants/base/local-storage.constant';
import { BaseHandleErrorService } from './base-handle-error.service';

@Injectable({
    providedIn: 'root'
})
export class BaseHttpClientService {

    private readonly _http = inject(HttpClient);
    private readonly _storage = inject(BaseLocalStorageService);
    private readonly _errors = inject(BaseHandleErrorService);

    public get<T>(url: string): Observable<T> {
        let headers: any;

        return this._http.get<T>(`${url}`, { headers })
            .pipe(catchError(this._errors.handleError));
    }


    public post<T>(url: string, contract: any): Observable<T> {
        let headers: any;

        headers = {
            'Content-Type': 'application/json'
        };

        return this._http.post<T>(`${url}`, JSON.stringify(contract), { headers })
            .pipe(
                catchError(this._errors.handleError)
            );
    }


    public put<T>(url: string, contract: any): Observable<T> {
        let headers: any;

        headers = {
            'Content-Type': 'application/json'
        };

        return this._http.put<T>(`${url}`, JSON.stringify(contract), { headers })
            .pipe(
                catchError(this._errors.handleError)
            );
    }


    public delete<T>(url: string): Observable<T> {
        let headers: any;

        headers = {
            'Content-Type': 'application/json'
        };

        return this._http.delete<T>(`${url}`, { headers })
            .pipe(
                catchError(this._errors.handleError)
            );
    }


    public postFormData(baseUrl: string, contract: FormData, requeredToken: boolean) {
        let headers: any;

        if (requeredToken) {
            headers = {
                'Authorization': "Bearer " + this._storage.getItem(LocalStorageConstants.AccessToken)
            };
        }

        return this._http.post<any>(baseUrl, contract, { headers })
            .pipe(
                catchError(this._errors.handleError)
            );
    }

    public getDownloadFile(urlFile: string, mimeTypeFile: string, requeredToken: boolean = false) {
        let headers: any;

        if (requeredToken) {
            headers = {
                'Authorization': "Bearer " + this._storage.getItem(LocalStorageConstants.AccessToken)
            };
        }
        this._http.get(urlFile, { responseType: 'arraybuffer', headers })
            .subscribe(response => this.downloadFile(response, mimeTypeFile));
    }

    downloadFile(data: any, type: string) {
        let blob = new Blob([data], { type: type });
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert('Please disable your Pop-up blocker and try again.');
        }
    }

}
