# Stellar Search

Stellar Search utilizes Google Search as an exercise in using Observables in Angular to produce a dynamic typeahead search field. The results are displayed in cards with an image, title and description. Clicking on a card takes you to that card's associated website in a new tab.

## Stellar Stack

- [Angular CLI](https://github.com/angular/angular-cli) v9.1.4
- [Angular Material](https://material.angular.io/) v9.2.4
- [Bootstrap](https://getbootstrap.com/docs/4.5) v4.5.3
- [Google Programmable Search Engine](https://developers.google.com/custom-search)

## Before running Stellar Search

- Obtain a [Custom Search JSON API key](https://developers.google.com/custom-search/v1/overview#api_key) and plug that into the `apiKey` property of the SearchService class, `src/app/search/search.service.ts`
- Run `npm install` from the command line

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Enjoy!
