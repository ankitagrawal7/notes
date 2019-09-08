import { Component } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { UpdateWindowWidth } from "./store/actions/notes.action";
import { AppState } from "./app.state";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  resizeSubscription: Subscription;
  constructor(private store: Store<AppState>) {
    this.resizeSubscription = fromEvent(window, "resize").subscribe(e => {
      // console.log("event: ", (e.target as Window).innerWidth);
      this.store.dispatch(
        new UpdateWindowWidth((e.target as Window).innerWidth)
      );
    });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
