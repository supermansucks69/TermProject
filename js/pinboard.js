 draggableNote = {
    cancel: '.editable',
    "zIndex": 3000,
    "stack" : '.note'
};

$(document).ready(function () {

    addNotesFromStorage();

    //Create Note
    $('#btn-addNote').click(addNote);

    //Save all the notes when the user leaves the page
    window.onbeforeunload = saveNotesToStorage;

});


function addNote() {
    var emptyNote = createNote(100, 2000, "");
    $('#board').append(emptyNote);
    $(".note").draggable(draggableNote);
    $('span.delete').click(deleteNote);
}

function deleteNote() {
    $(this).closest('.note').fadeOut('slow',
        function () {
            $(this).remove();
       

        })
}


function createNote(left, top, text) {
    note =  ''
        +   '<div class="note" '
        // position of note
        +   'style="left:' + left + 'px; '
        +   'top:' + top + 'px" >'
        // note content
        +   '<div class="toolbar">'
        +   '<span class="delete"> &times; </span>' 
        +   '</div>'
        +   '<div contenteditable="true" class="editable">'
        +   text
        +   '</div>'
        +   '</div>';
    return note;
}

function addNotesFromStorage() {
    numNotes = window.localStorage.length;
    if (numNotes > 0) {
        //load notes
        for (var i = 0; i < numNotes; i++) {
            var id  = window.localStorage.key(i);
            noteObject = JSON.parse(
                window.localStorage.getItem(id));

            note = createNote(
                noteObject.left,
                noteObject.top,
                noteObject.text);

            $('#board').append(note);
        }
    }
        $(".note").draggable(draggableNote);
        $('span.delete').click(deleteNote);
}

function saveNotesToStorage() {
   window.localStorage.clear();
   $('.note').each(function (){

    noteObject = {
        top     :  parseInt($(this).position().top),
        left    :  parseInt($(this).position().left),
        text    :    $(this).children('.editable').text(),    

         }

          var noteId = window.localStorage.length;
          window.localStorage.setItem(noteId,
                JSON.stringify(noteObject));

   });
}