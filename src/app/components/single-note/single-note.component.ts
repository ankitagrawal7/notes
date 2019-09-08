import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "./../../app.state";
import { UpdateNote, Search } from "./../../store/actions/notes.action";
import { FormGroup, FormControl } from "@angular/forms";
import {
  getWindowWidth,
  getSelectedNote,
  getSearchTerm
} from "src/app/store/reducers/notes.reducer";
import { Router } from "@angular/router";

@Component({
  selector: "app-single-note",
  templateUrl: "./single-note.component.html",
  styleUrls: ["./single-note.component.css"]
})
export class SingleNoteComponent implements OnInit {
  form: any = new FormGroup({
    title: new FormControl(""),
    description: new FormControl("")
  });
  showHeader: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {
    if (this.router.url.includes("single-note")) this.showHeader = true;
    this.store.select(getWindowWidth).subscribe(data => {
      if (data > 768) this.goBack();
    });
  }

  ngOnInit() {
    this.store.pipe(select(getSelectedNote)).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  ngOnChanges() {
    // if (this.data) this.form.patchValue(this.data);
  }

  addNote() {
    this.store.dispatch(new UpdateNote(this.form.value));
    this.store.select(getSearchTerm).subscribe(data => {
      if (data) this.store.dispatch(new Search(data));
    });
  }

  goBack() {
    this.router.navigateByUrl("");
  }
}
