
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonutFactoryComponent } from './donut-factory.component';

const routes: Routes = [
	{
		path: '',
		component: DonutFactoryComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DonutFactoryRoutingModule { }
