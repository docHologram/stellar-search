import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';

export enum Icing {
	Vanilla = 'vanilla',
	Chocolate = 'chocolate',
	None = 'none'
}

export interface Donut {
	icing: Icing;
	sprinkles: boolean;
}

@Component({
	selector: 'app-donut-factory',
	templateUrl: './donut-factory.component.html',
	styleUrls: ['./donut-factory.component.scss']
})
export class DonutFactoryComponent implements OnInit {
	readonly makerTimeUnit = 1000;
	readonly icerTimeUnit = 1250;
	donuts: Donut[] = [];
	donutMaker$: Observable<number>;
	donutIcer$: Observable<number>;

	const newDonut: Donut = {
		icing: Icing.None,
		sprinkles: false
	};

	constructor() { }

	ngOnInit(): void {

		this.donutMaker$ = interval(this.makerTimeUnit)
			.pipe(
				tap((index: number) => this.donuts.push(this.newDonut)),
				take(5)
			);

		this.donutIcer$ = interval(this.icerTimeUnit)
			.pipe(
				tap((index: number) => this.donuts[index].icing = Icing.Vanilla),
				take(5)
			);
			
		this.donutMaker$
			.pipe(
				concatMap(_ => this.donutIcer$)
			)
			.subscribe();
	}


}
