import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Note } from "./../../store/models/note.model";
import {
  getNotes,
  getSelected,
  getSearchResults,
  getSearchTerm,
  getWindowWidth
} from "./../../store/reducers/notes.reducer";
import { Observable } from "rxjs";
import { AppState } from "./../../app.state";
import { UpdateSelected } from "./../../store/actions/notes.action";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  notes: Observable<Note[]>;
  searchResults: Observable<Note[]>;
  selected: Observable<Number>;
  searchTerm: Observable<string>;

  windowWidth: number;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.notes = this.store.pipe(select(getNotes));
    this.searchResults = this.store.pipe(select(getSearchResults));
    this.selected = this.store.pipe(select(getSelected));
    this.searchTerm = this.store.pipe(select(getSearchTerm));
    this.store
      .select(getWindowWidth)
      .subscribe(width => (this.windowWidth = width));
  }

  selectListItem(idx) {
    this.store.dispatch(new UpdateSelected(idx));
    if (this.windowWidth < 768) {
      this.router.navigateByUrl("single-note");
    }
  }
}
