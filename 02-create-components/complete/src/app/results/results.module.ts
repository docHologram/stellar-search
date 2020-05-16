import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TileGridComponent } from './tile-grid/tile-grid.component';
import { TileComponent } from './tile/tile.component';

@NgModule({
	declarations: [
		TileGridComponent,
		TileComponent
	],
	imports: [
		CommonModule,
		MatCardModule
	]
})
export class ResultsModule { }