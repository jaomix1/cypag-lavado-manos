import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpClientService } from '../commons/services/base/base-http-client.service';
import { AppSettings } from '../commons/constants/app-settings';
import { ComboUrlConstant } from '../commons/constants/combo-url-constant';
import { Combo } from '../commons/models/base/combo-interface';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  public constants: AppSettings;

  constructor() {
    this.constants = new AppSettings();
  }

  private readonly _baseHttp = inject(BaseHttpClientService);


  getSedesByCompany(id: number): Observable<Combo[]> {
    return this._baseHttp.get<Combo[]>(`${this.constants.webApi}${ComboUrlConstant.sedesByCompany}/${id}`)
  }


  getTipoDocumentos(): Observable<Combo[]> {
    return this._baseHttp.get<Combo[]>(`${this.constants.webApi}${ComboUrlConstant.tipoDocumentos}`)
  }

}
