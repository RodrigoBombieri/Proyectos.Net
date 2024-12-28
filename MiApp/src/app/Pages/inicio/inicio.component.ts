import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Models/Empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private empleadoServicio = inject(EmpleadoService);

  public listaEmpleados:Empleado[] = [];
  public displayedColumns: string[] = ['nombre', 'correo', 'sueldo', 'fechaContrato', 'acciones'];

  obtenerEmpleados(){
    this.empleadoServicio.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaEmpleados = data;
        }
      },
      error:(error)=>{
        console.log(error);
      }     
    })
  }

  constructor(private router:Router){
    this.obtenerEmpleados();
  }

  nuevo(){
    this.router.navigate(['/empleado',0]);
  }

  editar(objeto:Empleado){
    this.router.navigate(['/empleado',objeto.id]);
  }

  eliminar(empleado:Empleado){
    if(confirm('¿Está seguro de eliminar el empleado?'+empleado.nombre)){
      this.empleadoServicio.eliminar(empleado.id).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            alert("Empleado eliminado correctamente");
            this.obtenerEmpleados();
          }else{
            alert("No se pudo eliminar el empleado");
          }
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  }
}
