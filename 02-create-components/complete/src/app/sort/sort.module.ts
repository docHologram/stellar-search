import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SortComponent } from './sort.component';

@NgModule({
	declarations: [
		SortComponent
	],
	imports: [
		CommonModule,
		MatButtonToggleModule
	]
})
export class SortModule { }
