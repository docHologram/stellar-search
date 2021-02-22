import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TileGridComponent } from './tile-grid/tile-grid.component';
import { ListTileComponent } from './list-tile/list-tile.component';

@NgModule({
	declarations: [
		TileGridComponent,
		ListTileComponent
	],
	imports: [
		CommonModule,
		MatListModule,
		MatCardModule
	]
})
export class ResultsModule { }
