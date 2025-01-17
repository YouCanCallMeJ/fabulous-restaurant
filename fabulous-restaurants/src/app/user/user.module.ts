import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AddEditComponent,
    LayoutComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
