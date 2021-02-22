export interface SearchCardImage {
	url: string;
	alt: string;
}

export interface SearchCardData {
	title: string;
	snippet: string;
	pageUrl: string;
	image: SearchCardImage;
}
