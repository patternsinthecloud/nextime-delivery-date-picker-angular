import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from 'src/app/site.component';

const routes: Routes = [
  { path: 'site/:id', component: SiteComponent },
  { path: '', redirectTo: '/site/8', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
