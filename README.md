# stellar-search
## An Out-of-this-World Search Extravaganza that Will Dazzle Your Innards!!

### The Things that Shall Be Done (Initial Outline)

* Fetch the user's recent searches on app load
* This is achieved by storing urls in localStorage
* Populate the NgRx store with those recent searches
* Once the store is hydrated, display the searches as tiles    with an image, title, page intro (hover over to show more)
* Differentiate between list tiles (showing a bunch of page suggestions from Wikipedia) and page tiles by color-coding them
* Illustrate async pipe on tile load and use a loading spinner inside each tile while loading (count the urls in localStorage to determine the tile count)
* Search bar that sends queries to Wikipedia and loads results in a multi-option dropdown as they arrive (good rxjs use here to make this work)
* Sort tiles on date (default) or alphabetically 
* Do the actual sorting as a side effect of the initial fetch by assigning a date and alpha ordinal to each entry)

### Chronology

1. Create - Angular app with Angular Material and NgRx
2. UI - Style dumb components for Search Bar, Entry Tile (with mock data), and Entry List
3. Service - API Endpoints to connect to Wikipedia
4. NgRx - Establish SearchState with reducer, actions, selectors
5. NgRx - Write side effect that calls the endpoint in the service whenever a search is made and adds it to the collection
6. UI - Create an observable search input that passes search requests to the store to instigate an API call
7. UI - Wire the tiles up to real data
8. LocalStorage - extend the search input observable to write it's search string to localStorage
9. NgRx - On app start, have the store read the search strings from localStorage and fire off one-to-many requests to hydrate the store
10. NgRx - Use RxJs and a side effect to assign a date and an alpha ordinal to each entry so that switching the sort type can be easily done on the front-end