import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../commons/constants/app-settings';
import { BaseHttpClientService } from '../../commons/services/base/base-http-client.service';
import { Combo } from '../../commons/models/base/combo-interface';
import { ComboUrlConstant } from '../../commons/constants/combo-url-constant';
import { UrlConstants } from '../../commons/constants/cup-url-constant';
import { CrudUrlConstant } from '../../commons/constants/crud-url-constant';
import { PaginatorModel } from '../../commons/models/base/table/paginator-model';

@Injectable({
  providedIn: 'root'
})
export class TipoContratistaService {

  public constants: AppSettings;

  constructor() {
    this.constants = new AppSettings();
  }

  private readonly _baseHttp = inject(BaseHttpClientService);

  getAll(filter: PaginatorModel): Observable<Combo[]> {
    return this._baseHttp.post<Combo[]>(`${this.constants.webApi}${CrudUrlConstant.getAllTipoContratista}`, filter)
  }


  getOne(id: number): Observable<Combo[]> {
    return this._baseHttp.get<Combo[]>(`${this.constants.webApi}${CrudUrlConstant.getOneTipoContratista}${id}`)
  }


  create(body: any) {
    return this._baseHttp.post(`${this.constants.webApi}${CrudUrlConstant.createTipoContratista}`, body)
  }

  update(id: number, body: any) {
    return this._baseHttp.put(`${this.constants.webApi}${CrudUrlConstant.updateTipoContratista}${id}`, body)
  }

  delete(id: number) {
    return this._baseHttp.delete(`${this.constants.webApi}${CrudUrlConstant.deleteTipoContratista}${id}`)
  }


}
