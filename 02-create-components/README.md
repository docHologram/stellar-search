# Creating Components

I don't want you to have to barf again, but this is super easy too.

## Add [Angular Material]() for Designing Components

```
ng add @angular/material
```

## Add Layout Component for Encapsulating the UI

The layout component will be the main component for the entire screen and will contain sub-components for the search and entry list, each of which will contain it's own subcomponents. Let's start with the module:

```
ng generate module layout
```
or
```
ng g m layout
```
Then when we generate our layout component into the layout directory, the CLI will automatically declare our new component in the module for us:
```
ng generate component layout
```
or 
```
ng g c layout
```
...will result in the following write to our layout module:
```
declarations: [LayoutComponent]
```
## Overall Design of the Layout

The vision is pretty simple: a search bar and a list of tiles with a detailed data preview in each. Much like the following mockup:

![Stellar Search mockup](./complete/src/assets/images/stellar-search-mockup.jpg "Chuck and Betty are an unstoppable team!")

I see three sub-components within Layout:
1. Search box
2. Sort selection
3. Tile Grid

Tile Grid also contains an array of tile sub-components. There are two types of types of tiles:
1. ListTile (display a list of articles)
2. CardTile (display key elements of a single article)

So our hierarchy looks like so:

* App
* * Layout
* * * Search
* * * Sort
* * * Tile Grid 
* * * * ListTile
* * * * CardTile

Now let's create these sub-components and corresponding modules. For the tiles, let's call that module `results` and declare the tile grid and tile components inside:

```
ng generate module search
ng generate component search

ng generate module sort
ng generate component sort

ng generate module results
ng generate component results/tile-grid
ng generate component results/tile
```

Next, let's import these feature modules into the layout module:

```
imports: [
    CommonModule,
    SearchModule,
    SortModule,
    ResultsModule
]
```

## Awesome! Scaffold complete, so let's put some stuff in there...

### _SearchComponent_

The search component can begin as just an input FormControl:
```
export class SearchComponent implements OnInit {
    searchControl = new FormControl('');

    constructor() { }

    ngOnInit(): void {
    }

}
```
```
<mat-form-field>
    <input matInput
        type="text" 
        [formControl]="searchControl">
</mat-form-field>
```

...but in order to use FormControl, and the Angular Material MatFormField and MatInput components, we need to import the proper modules into SearchModule:
```
imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
]
```

### _SortComponent_

The sort component will be an Angular Material [button toggle](https://material.angular.io/components/button-toggle/overview), so import that into SortModule:
```
imports: [
    CommonModule,
    MatButtonToggleModule
]
```

Let's go ahead and create an enumeration to represent our two sort types:
```
ng g enum sort/sort-type
```
```
export enum SortType {
    Chronological = 'chronological',
    Alphabetical = 'alphabetical'
}
```

The two button toggles within the group represent the two sort types:
```
<mat-button-toggle-group>
    <mat-button-toggle value="sortTypes.Chronological">
        Date
    </mat-button-toggle>
    <mat-button-toggle value="sortTypes.Alphabetical">
        A-Z
    </mat-button-toggle>
</mat-button-toggle-group>
```

Objectify the SortType enum for use in the template by creating a class field for sort types:
```
export class SortComponent implements OnInit {
    sortTypes = SortType;

    constructor() { }

    ngOnInit(): void {
    }
}
```

### _ListTileComponent_

Let's start with a component scaffold:
```
ng g component results/list-tile
```

Next, our list tile component will be a Material [list](https://material.angular.io/components/list/overview), so import that into ResultsModule:

```
imports: [
    CommonModule,
    MatListModule
]
```

In order to figure out what we want to display in the list, let's send a request to Wikipedia and see what kind of results we get back. From these results, we can deduce what the viewModel for our list component will look like.

Using Postman, let's send a GET request to Wikipedia to find articles with "Chuck", "Norris", "Betty", or "White":
```
https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Chuck%20Norris|Betty%20White&format=json
```

Here's what comes back:
```
{
    "batchcomplete": "",
    "continue": {
        "sroffset": 10,
        "continue": "-||"
    },
    "query": {
        "searchinfo": {
            "totalhits": 230
        },
        "search": [
            {
                "ns": 0,
                "title": "Chuck Hagel",
                "pageid": 363276,
                "size": 115723,
                "wordcount": 10279,
                "snippet": "February 12, 2006. Retrieved January 4, 2012. Dufour, Jeff. Glenn Close and <span class=\"searchmatch\">Chuck</span> <span class=\"searchmatch\">Norris</span> push pet projects. The Hill, online edition, Under The Dome, May 11,",
                "timestamp": "2020-03-08T16:59:26Z"
            },
            {
                "ns": 0,
                "title": "Betty Blayton-Taylor",
                "pageid": 32444471,
                "size": 15791,
                "wordcount": 1760,
                "snippet": "<span class=\"searchmatch\">Betty</span> Blayton-Taylor (July 10, 1937 – October 2, 2016) was an American activist, advocate, artist, arts administrator and educator, and lecturer. As an",
                "timestamp": "2020-05-01T16:23:17Z"
            },
            {
                "ns": 0,
                "title": "Mama Steps Out",
                "pageid": 44501578,
                "size": 3343,
                "wordcount": 266,
                "snippet": "Alice Brady as Ada Cuppy <span class=\"searchmatch\">Betty</span> Furness as Leila Cuppy Dennis Morgan as <span class=\"searchmatch\">Chuck</span> Thompson Gene Lockhart as Mr. Sims Edward <span class=\"searchmatch\">Norris</span> as Ferdie Fisher Gregory",
                "timestamp": "2020-05-26T00:40:29Z"
            },
            {
                "ns": 0,
                "title": "List of people from Newport Beach, California",
                "pageid": 44851195,
                "size": 11542,
                "wordcount": 984,
                "snippet": "producer Mark McGrath, singer, Sugar Ray Mike Ness of Social Distortion <span class=\"searchmatch\">Chuck</span> <span class=\"searchmatch\">Norris</span>, martial artist and actor Cathy Rigby, gymnast and actress Gwen Stefani",
                "timestamp": "2020-05-16T03:33:28Z"
            },
            {
                "ns": 0,
                "title": "R. Norris Williams",
                "pageid": 5052948,
                "size": 18308,
                "wordcount": 1137,
                "snippet": "Richard &quot;Dick&quot; <span class=\"searchmatch\">Norris</span> Williams II (January 29, 1891 – June 2, 1968), generally known as R. <span class=\"searchmatch\">Norris</span> Williams, was an American tennis player and RMS Titanic",
                "timestamp": "2020-05-26T20:29:34Z"
            },
            {
                "ns": 0,
                "title": "Bruce Lee",
                "pageid": 37313,
                "size": 103551,
                "wordcount": 11137,
                "snippet": "Beach, California, Lee had met karate champion <span class=\"searchmatch\">Chuck</span> <span class=\"searchmatch\">Norris</span>. In Way of the Dragon Lee introduced <span class=\"searchmatch\">Norris</span> to moviegoers as his opponent, their showdown has",
                "timestamp": "2020-05-27T21:32:59Z"
            },
            {
                "ns": 0,
                "title": "The Legend of Bruce Lee",
                "pageid": 19844058,
                "size": 29144,
                "wordcount": 4260,
                "snippet": "as Mark Dacascos, Ray Park, Gary Daniels, Ernest Miller, and Michael Jai <span class=\"searchmatch\">White</span> are also featured in the series, playing the roles of martial artists prominent",
                "timestamp": "2020-05-20T07:56:16Z"
            },
            {
                "ns": 0,
                "title": "Donny & Marie (1976 TV series)",
                "pageid": 21624189,
                "size": 12312,
                "wordcount": 1442,
                "snippet": "Miller Erin Moran Donny Most Jim Nabors Haywood Nelson Olivia Newton-John <span class=\"searchmatch\">Chuck</span> <span class=\"searchmatch\">Norris</span> Susan Olsen The Osmonds Ron Palillo Minnie Pearl Susan Perkins Bernadette",
                "timestamp": "2020-05-11T09:31:01Z"
            },
            {
                "ns": 0,
                "title": "Lee Marvin",
                "pageid": 18433,
                "size": 45016,
                "wordcount": 3793,
                "snippet": "years older). His final appearance was in The Delta Force (1986) with <span class=\"searchmatch\">Chuck</span> <span class=\"searchmatch\">Norris</span>, playing a role turned down by Charles Bronson. Marvin was a Democrat",
                "timestamp": "2020-05-16T11:48:35Z"
            },
            {
                "ns": 0,
                "title": "List of Western films 1950–54",
                "pageid": 12383761,
                "size": 104042,
                "wordcount": 14,
                "snippet": "Virginia Gibson, Tommy Rall, <span class=\"searchmatch\">Betty</span> Carr, Russ Tamblyn, Nancy Kilgas United States musical Western Shot in the Frontier Jules <span class=\"searchmatch\">White</span> Moe Howard, Larry Fine,",
                "timestamp": "2020-03-13T12:49:42Z"
            }
        ]
    }
}
```

From the shape of the data we get back, I think we can provide enough information to the user by simply displaying the title and the snippet. Even better, the snippet already has a span wrapped around our search term match so that we can easily highlight it using CSS.

Let's start with the viewModel by creating a class to organize each search result as a list item:
```
ng g class results/list-tile/list-item
```
```
export class ListItem {
	title: string;
	snippet: string;
}
```

Next, let's design what each list item will look like in the component's template file. We'll start by adding the list as component property in list-item.component.ts:
```



### TODO: Complete CardTile

The tile component will be an Angular Material [card](https://material.angular.io/components/card/overview), so import that into ResultsModule:

```
imports: [
    CommonModule,
    MatListModule,
    MatCardModule
]
```
Here is the typical structure of a card:
```
<mat-card>
  <mat-card-header>
    <div mat-card-avatar class="uses-background-image"></div>
    <mat-card-title>Title</mat-card-title>
    <mat-card-subtitle>Subtitle</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="https://path/to/main/card/image.jpg" alt="Picture of a thing">
  <mat-card-content>
    <p>
      Here is a description of the thing...
    </p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>More</button>
    <button mat-button>View Page</button>
  </mat-card-actions>
</mat-card>

```
Given this DOM blueprint, our viewModel looks something like this:
* Thumbnail image for the header
* Title
* Subtitle (could be a category, e.g. "Animal" for Duck or "Actor" for Keanu Reeves)
* Main image from the article (random pick from available images)
* Content (abridged after so many characters)
* More() event displays more content (sidebar stats) and toggles label between "More" and "Less"
* ViewPage() displays the full article inside of a modal