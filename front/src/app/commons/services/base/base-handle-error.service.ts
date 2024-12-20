import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { EventsConstants } from '../../constants/base/events-constants';
import { MessageOfErrorConstant } from '../../constants/message-of-error-constant';

@Injectable({
    providedIn: 'root'
})
export class BaseHandleErrorService {

    public handleError(error: HttpErrorResponse) {
        let errorMessage: string = '';
        switch (error.status) {
            case 400: {
                errorMessage = error.error.message;
                break;
            }
            case 401: {
                window.dispatchEvent(new CustomEvent(EventsConstants.NOT_AUTHENTICATED));
                break;
            }
            case 404: {
                errorMessage = error.error.message;
                break;
            }
            case 501: {
                errorMessage = MessageOfErrorConstant.InternalServerError;
                break;
            }
            default: {
                errorMessage = MessageOfErrorConstant.VpnNotWorking;
                break;
            }
        }
        return throwError(() => errorMessage || error.message);
    }
}