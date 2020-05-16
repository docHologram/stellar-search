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

Tile Grid also contains an array of tile sub-components.

So our hierarchy looks like so:

* App
* * Layout
* * * Search
* * * Sort
* * * Tile Grid 
* * * * Tile

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

### _TileComponent_

Let's build out the tile component next before we sculpt the grid that holds the tiles:

The tile component will be an Angular Material [card](https://material.angular.io/components/card/overview), so import that into ResultsModule:

```
imports: [
    CommonModule,
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

Next, let's send a request to Wikipedia to see what data we get back so we can map fields from the http 

