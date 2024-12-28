import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Empleado } from '../Models/Empleado';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiURL+'Empleado';
  constructor() { }

  lista(){
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  obtener(id:number){
    return this.http.get<Empleado>(this.apiUrl+'/'+id);
  }

  crear(empleado:Empleado){
    return this.http.post<ResponseAPI>(this.apiUrl,empleado);
  }

  editar(empleado:Empleado){
    return this.http.put<ResponseAPI>(this.apiUrl,empleado);
  }

  eliminar(id:number){
    return this.http.delete<ResponseAPI>(this.apiUrl+'/'+id);
  }
}
