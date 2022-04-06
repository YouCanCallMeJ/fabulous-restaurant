import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {ListComponent} from "./list/list.component";
import {AddEditComponent} from "./add-edit/add-edit.component";

const routes: Routes = [
  {
    path: "", component: LayoutComponent,
    children: [
      {path: "list", component: ListComponent},
      {path: "add-edit", component: AddEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }
