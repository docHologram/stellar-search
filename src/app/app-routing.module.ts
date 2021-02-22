import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [
	{
		path: 'search',
		loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
	},
	{
		path: 'donut-factory',
		loadChildren: () => import('./donut-factory/donut-factory.module').then(m => m.DonutFactoryModule)
	},
	{
		path: '',
		redirectTo: '/search',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
