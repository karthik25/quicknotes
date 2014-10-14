using System.Data.Entity;
using QuickNotes.Entities;

namespace QuickNotes.Contexts
{
    public class NotesContext : DbContext
    {
        public IDbSet<Note> Notes { get; set; }
    }
}