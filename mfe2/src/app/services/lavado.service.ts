import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../commons/models/base/response.interface';
import { BaseHttpClientService } from '../commons/services/base/base-http-client.service';
import { AppSettings } from '../commons/constants/app-settings';
import { LavadoFilter } from '../commons/models/lavado/lavado-filter.interfac';
import { UrlConstants } from '../commons/constants/lavado-url-constant';
import { Lavado } from '../commons/models/lavado/lavado.interface';

@Injectable({
  providedIn: 'root'
})
export class LavadoService {

  public constants: AppSettings;

  constructor() {
    this.constants = new AppSettings();
  }

  private readonly _baseHttp = inject(BaseHttpClientService);

  getAll(filter: LavadoFilter): Observable<Response<Lavado>> {
    return this._baseHttp.post<Response<Lavado>>(`${this.constants.webApi}${UrlConstants.cups.getAll}`, filter)
  }

  create(cup: any): Observable<Lavado> {
    return this._baseHttp.post<Lavado>(`${this.constants.webApi}${UrlConstants.cups.create}`, cup)
  }

  getById(idLavado: number): Observable<Lavado> {
    return this._baseHttp.get<Lavado>(`${this.constants.webApi}${UrlConstants.cups.getOne}` + idLavado)

  }

}
