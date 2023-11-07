import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/Home/home.component';
import { RegistrationComponent } from './page/Registration/registration.component';
import { DetailsComponent } from './page/Details/details.component';

const routes: Routes = [
  {
    path: 'clientes',
    component: HomeComponent,
  },
  {
    path: 'cadastro',
    component: RegistrationComponent,
  },
  {
    path: 'detalhes/:id',
    component: DetailsComponent,
  },
  {
    path: 'atualizacao/:id',
    component: RegistrationComponent,
  },
  {
    path: '**',
    redirectTo: 'clientes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
