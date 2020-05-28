import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { SearchModule } from '../search/search.module';
import { SortModule } from '../sort/sort.module';
import { ResultsModule } from '../results/results.module';

@NgModule({
	declarations: [
		LayoutComponent
	],
	imports: [
		CommonModule,
		SearchModule,
		SortModule,
		ResultsModule
	]
})
export class LayoutModule { }
