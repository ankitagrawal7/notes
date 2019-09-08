import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "./../../app.state";
import {
  AddNote,
  RemoveNote,
  Search
} from "./../../store/actions/notes.action";
import { Observable } from "rxjs";
import { getSearchTerm } from "src/app/store/reducers/notes.reducer";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  selectedNoteIndex: Observable<number>;
  searchTerm: Observable<string>;
  constructor(private store: Store<AppState>) {}

  createNewNote() {
    this.store.dispatch(
      new AddNote({ title: null, description: null, created_on: new Date() })
    );
  }

  removeNote() {
    this.store.dispatch(new RemoveNote());
  }

  ngOnInit() {
    this.searchTerm = this.store.pipe(select(getSearchTerm));
  }

  search(ev) {
    this.store.dispatch(new Search(ev.target.value));
  }
}
