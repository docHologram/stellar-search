import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { concatMap, delay, map, mapTo, mergeMap, take, tap } from 'rxjs/operators';

export enum Style {
	Vanilla = 'donut-factory__donut--vanilla',
	VanillaSprinkles = 'donut-factory__donut--vanilla-sprinkles',
	Chocolate = 'donut-factory__donut--chocolate',
	ChocolateSprinkles = 'donut-factory__donut--chocolate-sprinkles',
	Plain = 'donut-factory__donut--plain'
}

export interface Donut {
	class: Style;
}

@Component({
	selector: 'app-donut-factory',
	templateUrl: './donut-factory.component.html',
	styleUrls: ['./donut-factory.component.scss']
})
export class DonutFactoryComponent implements OnInit {
	readonly timeUnit = 2000;
	donuts: Donut[] = [];
	freshBatch$: Observable<string>;
	donutMaker$: Observable<number>;
	donutIcer$: Observable<number>;
	donutIndex = 0;

	newDonut: Donut = {
		class: Style.Plain
	};

	constructor() { }

	ngOnInit(): void {

		this.donutMaker$ = interval(this.timeUnit)
			.pipe(
				tap((index: number) => {
					this.donuts.push(this.newDonut);
					console.log(`make donut ${index + 1}`);
				}),
				delay(4 * this.timeUnit),
				take(1)
			);

		this.donutIcer$ = interval(this.timeUnit)
			.pipe(
				tap((index: number) => {
					this.donuts[this.donutIndex].class = Style.Vanilla;
				}),
				take(5)
			);

		this.donutMaker$
			.pipe(
				concatMap(_ => this.donutIcer$)
			)
			.subscribe();
	}


}
