import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const userModule = () => import('./user/user.module').then(x => x.UserModule);
const restaurantModule = () => import('./restaurant/restaurant.module').then(x => x.RestaurantModule);
const reviewModule = () => import('./review/review.module').then(x => x.ReviewModule);

const routes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // {path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]},
    {path: "", component: HomeComponent},
    {path: "account", loadChildren: accountModule},
    {path: "user", loadChildren: userModule},
    {path: "restaurant", loadChildren: restaurantModule},
    {path: "review", loadChildren: reviewModule},
    {path: "about", component: AboutComponent},
    {path: "**", redirectTo: ""}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
