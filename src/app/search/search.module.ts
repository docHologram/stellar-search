import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
	declarations: [
		SearchComponent
	],
	imports: [
		CommonModule,
		MatInputModule,
		SearchRoutingModule
	]
})
export class SearchModule { }
