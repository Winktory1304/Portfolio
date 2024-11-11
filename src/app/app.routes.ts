import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
{ path: '', redirectTo: 'main', pathMatch: 'full' }, 
  { path: 'main', component: MainContentComponent },  
  { path: 'imprint', component: ImprintComponent },   
  { path: '**', redirectTo: 'main' } 
];
