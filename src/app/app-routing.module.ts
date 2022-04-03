import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JapNamesComponent } from './jap-names/jap-names.component';

const routes: Routes = [{ path: '', component: JapNamesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
