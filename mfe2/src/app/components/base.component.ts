import { FormGroup } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { ConfigConstant } from "../commons/constants/base/config.constant";
import { MessageOfErrorConstant } from "../commons/constants/message-of-error-constant";
import { EventsConstants } from "../commons/constants/base/events-constants";
import { IConfigTable } from "../commons/models/base/table/configTable-interface";
import { ColsModel } from "../commons/models/base/table/cols-model";

export class BaseComponent {

    public loading: boolean = false;

    public length: number = 0;
    public pageSize: number = 10;
    public colsTable: ColsModel[] = [];
    public valuesTable: any = [];

    public colores: any = {
        color1: '#0c9f99',
        color2: '#14bcd5',
        color3: '#33d9c3',
        color4: '#96b1af',
        color5: '#fff',
        color6: '#000',
        color7: '#992511',
        color8: '#d5bf1f',
    }

    public searchString: string = "";

    public numbersLetters: RegExp = /^[a-zA-Z0-9]+$/;
    public latin: RegExp = /^[\wÀ-ú\s]+$/;
    public number: RegExp = /^\d+$/;
    public phone: RegExp = /^((3)(\d){9})+$/;
    public mail: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    public combosPorCargar: string[] = []
    public cargados$ = new Subject<string>();
    public cargados2$: Observable<string> | undefined;

    // public statesPqr: ComboModel[] = [
    //     { id: null, descripcion: 'No aplica' },
    //     { id: PqrStateEnum.Nuevo, descripcion: 'Nuevo' },
    //     { id: PqrStateEnum.Proceso, descripcion: 'Proceso' },
    //     { id: PqrStateEnum.Finalizado, descripcion: 'Finalizado' },
    // ]

    constructor() {
        this.cargados2$ = this.cargados$.asObservable();
    }

    showSpinner() {
        this.dispatchEvent(EventsConstants.SHOW_LOADING);
    }

    hideSpinner() {
        this.dispatchEvent(EventsConstants.HIDE_LOADING);
    }

    mesaageOk(message: string) {
        this.dispatchEventWithData(EventsConstants.MESSAGE, message);
    }

    mesaageError(error: string) {
        this.dispatchEventWithData(EventsConstants.MESSAGE_ERROR, error);
    }

    /**
     * It checks if the form control has an error, and if it does, it returns a string with the error
     * message
     * @param {FormGroup} form - FormGroup: The form that contains the input to be validated.
     * @param {string} nameInput - string: The name of the input field.
     * @returns A string with the errors of the input.
     */
    checkInput(form: FormGroup, nameInput: string) {
        return (
            (form.controls[nameInput].errors?.['required']
                ? MessageOfErrorConstant.FieldRequired + ' | '
                : '') +
            (form.controls[nameInput].errors?.['maxlength']
                ? MessageOfErrorConstant.Maxlength + ' | '
                : '') +
            (form.controls[nameInput].errors?.['minlength']
                ? MessageOfErrorConstant.Minlength + ' | '
                : '') +
            (form.controls[nameInput].errors?.['pattern']
                ? MessageOfErrorConstant.FormatInvalid + ' | '
                : '')
        );
    }

    /**
     * It returns true if the input is invalid and has been touched
     * @param {FormGroup} form - FormGroup - the form that we want to validate
     * @param {string} nameInput - The name of the input field you want to validate.
     * @returns A boolean value.
     */
    validateInput(form: FormGroup, nameInput: string) {
        return !form.controls[nameInput].valid && form.controls[nameInput].touched;
    }


    dispatchEvent(eventName: string): void {
        window.dispatchEvent(new CustomEvent(eventName));
    }

    dispatchEventWithData(eventName: string, data: any): void {
        window.dispatchEvent(new CustomEvent(eventName, {
            detail: data
        }));
    }

    // // fechaHoy() {
    // //   const currentDate = new Date();
    // //   console.log(currentDate.toISOString().substring(0, 10))
    // //   return currentDate.toISOString().substring(0, 10)
    // // }

    // /**
    //  * 
    //  * @param daysToAdd 
    //  * @param zone default value 5 colombia, cambiar si esta en la nube el servidor
    //  * @returns 
    //  */
    // fechaMinimaEnvio() {
    //   const currentDate = new Date();
    //   //currentDate.setDate(currentDate.getDate() + daysToAdd);
    //   currentDate.setHours(currentDate.getHours() + 2);
    //   currentDate.setMinutes(0);
    //   currentDate.setSeconds(0);
    //   currentDate.setMilliseconds(0);
    //   return currentDate; //.toISOString().substring(0, 10) + "T0" + zone + ":00:00.000Z"; // ojo + "t para servidores colombia"
    // }

    // fechaMinAgendaEnvio(date: Date) {
    //   const currentDate = new Date(date);
    //   currentDate.setHours(0);
    //   currentDate.setMinutes(0);
    //   currentDate.setSeconds(0);
    //   currentDate.setMilliseconds(0);
    //   return currentDate; //.toISOString().substring(0, 10) + "T0" + zone + ":00:00.000Z"; // ojo + "t para servidores colombia"
    // }

    // diaInicialMes(){
    //   var dias = new Date().getDate() -1;
    //   return this.fechaHoyMasDias(-dias);
    // }


}