import { Component, inject, Input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../../Models/Empleado';

@Component({
  selector: 'app-empleado',
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit {
  @Input('id')id!:number;
  private empleadoServicio = inject(EmpleadoService);

  public formBuild = inject(FormBuilder);

  public formEmpleado:FormGroup = this.formBuild.group({
    nombre:[''],
    correo:[''],
    sueldo:[''],
    fechaContrato:['']
  });

  constructor(private router:Router) {}

    ngOnInit(): void{
      if(this.id != 0){
        this.empleadoServicio.obtener(this.id).subscribe({
          next:(data) => {
            console.log(data);
            this.formEmpleado.patchValue({
              nombre:data.nombre,
              correo:data.correo,
              sueldo:data.sueldo,
              fechaContrato:data.fechaContrato
            })
          },
          error:(error) => {
            console.log(error);
          }
        })
      }
    }

    guardar(){
      const objeto:Empleado = {
        id:this.id,
        nombre:this.formEmpleado.value.nombre,
        correo:this.formEmpleado.value.correo,
        sueldo:this.formEmpleado.value.sueldo,
        fechaContrato:this.formEmpleado.value.fechaContrato
      }
      // Si el id del empleado es 0, se inserta un nuevo empleado
      if(this.id == 0){
        this.empleadoServicio.crear(objeto).subscribe({
          next:(data) => {
            if(data.isSuccess){
              this.router.navigate(['/']);
            }else{
              alert("Error al crear");
            }           
          },
          error:(error) => {
            console.log(error);
          }
        })
    }else{
      // Si el id del empleado es diferente de 0, se actualiza el empleado
      this.empleadoServicio.editar(objeto).subscribe({
        next:(data) => {
          if(data.isSuccess){
            this.router.navigate(['/']);
          }else{
            alert("Error al actualizar");
          }
        },
        error:(error) => {
          console.log(error);
        }
      })
    }
   }

   volver(){
      this.router.navigate(['/']);
   }
}
