import { observable } from '@legendapp/state';

export interface Note {
  id: string;
  title: string;
  content: string;
  audioUrl: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  isStarred: boolean;
  isShared: boolean;
  tags: string[];
}

export const notesStore = observable({
  notes: [] as Note[],
  filter: 'all' as 'all' | 'shared' | 'starred',
  searchQuery: '',
});

export const addNote = (note: Note) => {
  notesStore.notes.push(note);
};

export const deleteNote = (id: string) => {
  const index = notesStore.notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notesStore.notes.splice(index, 1);
  }
};

export const toggleStarred = (id: string) => {
  const note = notesStore.notes.find(note => note.id === id);
  if (note) {
    note.isStarred = !note.isStarred;
  }
};