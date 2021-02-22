import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { SearchCardData } from './search-card-data';
import { isEmpty, isNil } from 'lodash';
import { title } from 'process';

interface SearchResultImageMap {
	cse_image: [
		{
			src: string;
		}
	]
}

interface SearchResultItem {
	title: string;
	snippet: string;
	link: string;
	pagemap: SearchResultImageMap;
}

interface SearchResult {
	items: SearchResultItem[];
}

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	private apiKey = 'ENTER_DEVELOPER_KEY_HERE';
	private searchContext = 'd81d98d565212d4c3';

	constructor(
		private httpClient: HttpClient
	) { }

	getSearchResults(searchTerm: string): Observable<SearchCardData[]> {
		const searchUrl = 'https://www.googleapis.com/customsearch/v1';
		const options = {
			params: new HttpParams()
				.set('key', this.apiKey)
				.set('cx', this.searchContext)
				.set('q', searchTerm)
		};

		return this.httpClient.get<SearchResult>(searchUrl, options)
			.pipe(
				pluck('items'),
				map(items => items.map(item => {
					return {
						title: this.resolveTextLength(item.title, 35),
						snippet: this.resolveTextLength(item.snippet, 125),
						pageUrl: item.link,
						image: {
							url: this.resolveSearchResultImage(item.pagemap),
							alt: item.title.split(' ')[0]
						}
					};
				}))
			);
	}

	resolveSearchResultImage(pagemap: SearchResultImageMap): string | null {
		const hasImage = !isNil(pagemap.cse_image)
			&& !isEmpty(pagemap.cse_image)
			&& !isNil(pagemap.cse_image[0].src);

		return hasImage
			? pagemap.cse_image[0].src
			: null;
	}

	resolveTextLength(text: string, desiredLength: number): string {
		return text.length > desiredLength
			? text.slice(0, desiredLength).concat('...')
			: text;
	}
}
