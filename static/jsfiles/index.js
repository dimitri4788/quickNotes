//Keep track of previous id
previousId = 0;

//Display saved notes from the localStorage on the page
function displaySavedNotesFromLocalStorage() {
    //Get saved notes from localStorage and display them
    if(localStorage.length != 0) {
        //Hide the "no notes saved" message
        $("#no-saved-notes").hide();

        //Iterate over all the keys (note id) in the localStorage and get their values (note body) also
        for(var i = 0; i < localStorage.length; ++i) {
            var id = localStorage.key(i);
            var body = localStorage.getItem(localStorage.key(i));

            //Set the previousId to the maximum id among all the saved ids
            previousId = Math.max(previousId, id);

            //Create a new <li> element, add text post to it and prepend it to the ul list
            var newLiElement = $('<li>').text(body);
            newLiElement.attr('id', id);
            newLiElement.prependTo('.posts');
        }
        previousId++;
    }
}

//Save the note to localStorage
function saveNoteToLocalStorage(id, body) {
    localStorage.setItem(id, body);
}

//Delete the note from localStorage
function deleteNoteFromLocalStorage(id) {
    localStorage.removeItem(id);
}

//Function to run after the document is loaded
function main() {

    //This function adds the text present in the notes box to the saved notes when the user presses the enter key
    $(document).keyup(function(event) {
        //Check for enter key (code: 13) pressed
        if(event.which === 13) {
            //Hide the "no notes saved" message
            $("#no-saved-notes").hide();

            //Get the current text in the notes box
            var post = $('.notes-box').val();

            //Create a new <li> element, add text post to it and prepend it to the ul list
            var newLiElement = $('<li>').text(post);
            newLiElement.attr('id', previousId);
            newLiElement.prependTo('.posts');

            //Add the new note in the localStorage
            saveNoteToLocalStorage(previousId, post);
            previousId++;

            //Make the notes box empty again
            $('.notes-box').val('');

            //Put focus back on the notes box
            $('.notes-box').focus();
        }
    });

    //Attach an event handler to the specified child element (li, in this case) and not the selector itself
    $('.posts').on('click', 'li', function() {
        //Get the id of the note clicked
        var idOfNoteToBeDeleted = $(this).attr("id");

        //Remove the note from the localStorage
        deleteNoteFromLocalStorage(idOfNoteToBeDeleted);

        //Remove the li element which is clicked
        $(this).remove();

        //If there are no more children left for ul list, then show "no notes saved" message
        if($('.posts').children().length == 0) {
            $("#no-saved-notes").show();
        }

        //Put focus back on the notes box
        $('.notes-box').focus();
    });

    //Get saved notes from localStorage and display them
    displaySavedNotesFromLocalStorage();
}

if(typeof(Storage) !== "undefined") {
    //localStorage is available
}
else {
    $(".container").remove();
    $(".storageFailure").text("Sorry! No Web Storage support ...");
}

//Create a ready event when the DOM has been loaded
$(document).ready(main());
