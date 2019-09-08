import { Action } from "@ngrx/store";
import { Note } from "../models/note.model";

export const ADD_NOTE = "Add Note";
export const REMOVE_NOTE = "Remove Note";
export const UPDATE_NOTE = "Update Note";
export const UPDATE_SELECTED = "Update Selected";
export const SEARCH = "Search";
export const UPDATE_WINDOW_WIDTH = "Update Window Width";

export class AddNote implements Action {
  readonly type = ADD_NOTE;
  constructor(public payload: Note) {}
}

export class RemoveNote implements Action {
  readonly type = REMOVE_NOTE;
}

export class UpdateNote implements Action {
  readonly type = UPDATE_NOTE;
  constructor(public payload: Note) {}
}

export class UpdateSelected implements Action {
  readonly type = UPDATE_SELECTED;
  constructor(public payload: number) {}
}

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public payload: string) {}
}

export class UpdateWindowWidth implements Action {
  readonly type = UPDATE_WINDOW_WIDTH;
  constructor(public payload: number) {}
}

export type Actions =
  | AddNote
  | RemoveNote
  | UpdateNote
  | UpdateSelected
  | Search
  | UpdateWindowWidth;
