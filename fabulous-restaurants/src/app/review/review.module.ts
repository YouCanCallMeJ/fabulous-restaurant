import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { LayoutComponent } from './layout/layout.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxStarRatingModule} from "ngx-star-rating";


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent,
    LayoutComponent
  ],
    imports: [
        CommonModule,
        ReviewRoutingModule,
        ReactiveFormsModule,
        NgxStarRatingModule
    ]
})
export class ReviewModule { }
