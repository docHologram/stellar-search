import { Component, OnInit } from '@angular/core';
import { SortType } from './sort-type.enum';

@Component({
	selector: 'app-sort',
	templateUrl: './sort.component.html',
	styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
	sortTypes = SortType;

	constructor() { }

	ngOnInit(): void {
	}
}
