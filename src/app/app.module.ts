import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";

import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/reducers/notes.reducer";
import { ListComponent } from "./components/list/list.component";
import { SingleNoteComponent } from "./components/single-note/single-note.component";
import { DatetimePipe } from "./pipes/datetime.pipe";
import { HomeComponent } from "./components/home/home.component";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "single-note", component: SingleNoteComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SingleNoteComponent,
    DatetimePipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ notes: reducer }),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
