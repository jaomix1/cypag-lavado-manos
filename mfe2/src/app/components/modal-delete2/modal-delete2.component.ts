
// import { Component, inject } from '@angular/core';
// import { BaseComponent } from '../base.component';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-modal-delete',
//   standalone: true,
//   imports: [MatButtonModule],
//   templateUrl: './modal-delete2.component.html',
//   styleUrl: './modal-delete2.component.css'
// })
// export class ModalDelete2Component extends BaseComponent {


//   // private readonly _grupoService = inject(GrupoService);
//   private readonly dialogRef = inject(MatDialogRef<ModalDelete2Component>);
//   private readonly config = inject(MAT_DIALOG_DATA);
//   private _snackBar = inject(MatSnackBar);

//   titleModal: string = '';
//   colorConfirm: string = '';
//   seguimientoDesc: string = '';
//   // crudActive: boolean = true;
//   data: any = {}
//   constructor(

//   ) {
//     super()
//     this.titleModal = this.config.encabezado + " '" + this.config.data.descripcion + "'"
//   }

//   confirm() {
//     this.dialogRef.close(true);
//   }

//   cancel() {
//     this.dialogRef.close(false);
//   }
// }
