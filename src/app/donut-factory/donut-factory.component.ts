import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

export interface Donut {
	currentPosition: number;
	finalPosition: number;
}

@Component({
	selector: 'app-donut-factory',
	templateUrl: './donut-factory.component.html',
	styleUrls: ['./donut-factory.component.scss']
})
export class DonutFactoryComponent implements OnInit {
	readonly leftPosition = 75;
	readonly timeUnit = 1000;
	readonly endingUnit = 900;
	donuts: number[] = [];

	constructor() { }

	ngOnInit(): void {

		interval(this.timeUnit)
			.pipe(
				take(5)
			)
			.subscribe((index: number) => {
				this.donuts.push(index);
			});
	}


}
