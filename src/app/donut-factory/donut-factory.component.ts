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
	readonly timeUnit = 1000;
	donuts: Donut[] = [];
	freshBatch$: Observable<string>;
	donutMaker$: Observable<number>;
	donutIcer$: Observable<number>;

	newDonut: Donut = {
		class: Style.Plain
	};

	constructor() { }

	ngOnInit(): void {

		this.freshBatch$ = interval(this.timeUnit)
			.pipe(
				tap((index: number) => {
					this.donuts = [];
					console.log(`fresh batch ${index}`)	
				}),
				mapTo('make another batch'),
				take(1)
			);

		this.donutMaker$ = interval(this.timeUnit)
			.pipe(
				tap((index: number) => {
					this.donuts.push(this.newDonut);
					console.log(`make donut ${index + 1}`);
				}),
				take(5),
				delay(4 * this.timeUnit)
				/* delay(6 * this.timeUnit),
				tap((index: number) => {
					this.donuts[index].class = Style.Vanilla;
					console.log(`style donut ${index + 1}`);	
				}) */
			);

		this.donutIcer$ = interval(this.timeUnit)
			.pipe(
				tap((index: number) => {
					if (this.donuts.length) {
						this.donuts[index].class = Style.Vanilla;
					}
					
					console.log(`style donut ${index + 1}`);	
				}),
				take(5),
				delay(this.timeUnit)
			);
			
		this.donutIcer$
			.pipe(
				tap(_ => this.donuts = []),
				concatMap(_ => this.donutMaker$)
			)
			.subscribe();
	}


}
