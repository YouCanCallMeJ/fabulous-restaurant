import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountModule} from "./account/account.module";

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // {path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]},
    {path: "", component: HomeComponent},
    {path: "account", loadChildren: accountModule},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
