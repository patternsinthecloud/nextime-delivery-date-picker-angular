import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from 'src/app/site/site.component';
import { Site2Component } from 'src/app/site2/site2.component';

const routes: Routes = [
  { path: 'site2/:id', component: Site2Component },
  { path: 'site/:id', component: SiteComponent },
  { path: '', redirectTo: '/site/8', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
