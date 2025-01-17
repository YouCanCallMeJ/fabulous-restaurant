import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ],
    imports: [
        CommonModule,
        RestaurantRoutingModule,
        ReactiveFormsModule
    ]
})
export class RestaurantModule { }
