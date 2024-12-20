import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpClientService } from '../commons/services/base/base-http-client.service';
import { AppSettings } from '../commons/constants/app-settings';
import { CrudUrlConstant } from '../commons/constants/crud-url-constant';
import { Parametros } from '../commons/constants/parametro.enum';

@Injectable({
  providedIn: 'root'
})
export class ParamtroService {

  public constants: AppSettings;
  private _parametros: any[] = [];

  constructor() {
    this.constants = new AppSettings();
  }

  private readonly _baseHttp = inject(BaseHttpClientService);

  getParametros(): Observable<any[]> {
    return this._baseHttp.post<any[]>(`${this.constants.webApi}${CrudUrlConstant.getAllParametros}`, {})
  }

  consultarParametro(): void {
    this.getParametros().subscribe({
      next: (res: any[]) => {
        this._parametros = res;
      },
      error: (err: any) => {
      }
    });
  }

  getUvr(): number {
    return Number(this._parametros.find(x => x.id === Parametros.UVR)?.valor) || 0;
  }

  getUvt(): number {
    return Number(this._parametros.find(x => x.id === Parametros.UVT)?.valor) || 0;
  }
}
