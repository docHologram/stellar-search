import { SearchService } from './search.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap, tap, filter } from 'rxjs/operators';
import { SearchCardData } from './search-card-data';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
	@ViewChild('searchInput') searchInput: ElementRef;
	searchTerms: string[] = [];
	searchResults: SearchCardData[];

	constructor(
		private searchService: SearchService
	) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.initReactiveSearch();
	}

	initReactiveSearch(): void {
		this.searchInput.nativeElement.focus();

		fromEvent(this.searchInput.nativeElement, 'keyup')
			.pipe(
				debounceTime(300),
				map((event: any) => event.target.value),
				filter((searchTerm: string) => searchTerm.length > 2),
				distinctUntilChanged(),
				tap((searchTerm: string) => this.searchTerms.push(searchTerm)),
				switchMap((searchTerm: string) => this.searchService.getSearchResults(searchTerm))
			)
			.subscribe((results: SearchCardData[]) => this.searchResults = results);
	}

	openResultWebPage(pageUrl: string): void {
		window.open(pageUrl, "_blank");
	}

}
