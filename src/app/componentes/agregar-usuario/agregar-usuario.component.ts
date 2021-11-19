import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  textError:string | undefined;
  isCorrect:boolean = false;

  formularioDeUsuarios:FormGroup;

  constructor(
    public fb:FormBuilder,
    private ruteador:Router
     ) { 

    this.formularioDeUsuarios=this.fb.group({
      nombre:[''],
      apellidos:[''],
      direccion:[''],
      curp:['',
      Validators.compose([
        Validators.maxLength(18),
        Validators.required,
        Validators.pattern('/^([A-Z]{4}\d{6}[A-Z]{6}\d{2})$/'),

      ]),
    ]
    });
    
  }
  ngDoCheck() {
    let dataCurp = this.formularioDeUsuarios.controls['curp'].value;

    if (dataCurp.length === 18){
      this.isCorrect = true;
      if(this.validateCurp(dataCurp)){
        let fecha = dataCurp.substring(4, 10)
        let sexo = dataCurp.substring(11, 12)
        console.log("file: app.component.ts ~ line 38 ~AppComponent ~ ngDocheck ~sexo", sexo);
        console.log("file: app.component.ts ~ line39 ~AppComponent ~ ngDocheck ~ fecha de nacimiento", fecha);
      } else {
        this.isCorrect = false;
        this.textError = "El CURP capturado no cuenta con la estructura requerida";
      }
    }
  }

  validateCurp(curp: string):boolean {
    let resp = curp.match(/^([A-Z]{4}\d{6}[A-Z]{6}\d{2})$/)
    if(!resp) {
      return false 
    } else {
      return true
    }
    
  }

  ngOnInit(): void {
    
  }
  enviarDatos():any{
    console.log("Realizado");
    console.log(this.formularioDeUsuarios.value);

    this.ruteador.navigateByUrl('/listar-usuario');
    
    
  }
}
