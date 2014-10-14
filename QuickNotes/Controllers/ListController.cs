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

        [HttpPost]
        public void AddNote(string noteContent)
        {
            var note = new Note { NoteContent = noteContent };
            _notesContext.Notes.Add(note);
        }

        [HttpGet]
        public IEnumerable<Note> GetNotes()
        {
            return _notesContext.Notes;
        }
    }
}