using System;
using System.Collections.Generic;
using System.Web.Http;
using QuickNotes.Contexts;
using QuickNotes.Entities;

namespace QuickNotes.Controllers
{
    public class ListController : ApiController
    {
        private readonly NotesContext _notesContext;

        public ListController()
        {
            _notesContext = new NotesContext();
        }

        [HttpGet]
        public bool AddNote(string noteContent)
        {
            if (string.IsNullOrEmpty(noteContent))
            {
                throw new Exception("Some note content is required");
            }

            var note = new Note { NoteContent = noteContent };
            _notesContext.Notes.Add(note);
            _notesContext.SaveChanges();
            return true;
        }

        [HttpGet]
        public IEnumerable<Note> GetNotes()
        {
            return _notesContext.Notes;
        }

        [HttpGet]
        public void DeleteNote(int noteId)
        {
            var note = _notesContext.Notes.Find(noteId);
            _notesContext.Notes.Remove(note);
            _notesContext.SaveChanges();
        }
    }
}