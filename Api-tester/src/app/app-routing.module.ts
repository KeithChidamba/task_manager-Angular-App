import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
   { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'Profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),canActivate: [AuthGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
