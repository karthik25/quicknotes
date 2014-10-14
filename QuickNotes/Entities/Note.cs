using System.ComponentModel.DataAnnotations.Schema;

namespace QuickNotes.Entities
{
    public class Note
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NoteId { get; set; }
        public string NoteContent { get; set; }

        [NotMapped]
        public string IdStr
        {
            get { return string.Format("note_{0}", NoteId); }
            set { }
        }
    }
}
