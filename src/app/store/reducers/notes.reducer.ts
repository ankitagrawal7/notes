import * as NotesAction from "./../actions/notes.action";
import { Note } from "./../models/note.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface NotesState {
  notes: Note[];
  selected: number;
  searchResults: Note[];
  searchTerm: string;
  windowWidth: number;
}

const initialState: NotesState = {
  notes: [
    {
      title: "Sample Note",
      description: "lorem ipsum",
      created_on: new Date()
    }
  ],
  selected: 0,
  searchResults: [],
  searchTerm: null,
  windowWidth: null
};

export function reducer(
  state = initialState,
  action: NotesAction.Actions
): NotesState {
  // Section 3
  switch (action.type) {
    case NotesAction.ADD_NOTE:
      let _notes = state.notes;
      if (_notes.length > 0) {
        _notes =
          _notes[0].title && _notes[0].description
            ? [action.payload, ..._notes]
            : _notes;
      } else {
        _notes = [action.payload, ..._notes];
      }
      return {
        ...state,
        notes: _notes
      };

    case NotesAction.UPDATE_SELECTED:
      return {
        ...state,
        selected: action.payload
      };

    case NotesAction.UPDATE_NOTE:
      state.notes[state.selected] = action.payload;
      return {
        ...state
      };

    case NotesAction.REMOVE_NOTE:
      state.notes.splice(state.selected, 1);
      return {
        ...state,
        selected: state.selected > 0 ? --state.selected : 0
      };

    case NotesAction.SEARCH:
      return {
        ...state,
        searchTerm: action.payload,
        searchResults: state.notes.filter(item => {
          if (item.title && item.description) {
            if (
              item.title.includes(action.payload) ||
              item.description.includes(action.payload)
            )
              return item;
          }
        })
      };

    case NotesAction.UPDATE_WINDOW_WIDTH:
      return {
        ...state,
        windowWidth: action.payload
      };

    default:
      return state;
  }
}

const getNotesFeatureState = createFeatureSelector<NotesState>("notes");

export const getNotes = createSelector(
  getNotesFeatureState,
  (state: NotesState) => state.notes
);

export const getSelected = createSelector(
  getNotesFeatureState,
  (state: NotesState) => state.selected
);

export const getSelectedNote = createSelector(
  getNotesFeatureState,
  (state: NotesState) => state.notes[state.selected]
);

export const getSearchResults = createSelector(
  getNotesFeatureState,
  (state: NotesState) => state.searchResults
);

export const getSearchTerm = createSelector(
  getNotesFeatureState,
  (state: NotesState) => state.searchTerm
);

export const getWindowWidth = createSelector(
  getNotesFeatureState,
  (state: NotesState) => state.windowWidth
);
