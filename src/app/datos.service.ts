import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  getDatos(): Observable<any> {
    return this.http.get<any[]>(environment.url).pipe(
      map(data => {
        return data.map(item => {
          return {
            id: item.ID,
            estado: item.StatusType.Title,
            operador: item.OperatorInfo.Title,
            n_conexiones: item.Connections.length,
            coordenadas: item.AddressInfo.Latitude+","+item.AddressInfo.Longitude,
            pais: item.AddressInfo.Country.Title
          };
        })
      }),
      map(datosFiltrados => datosFiltrados.slice(0, 20))
    );
  }
}
