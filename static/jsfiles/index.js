//Function to run after the document is loaded
var main = function() {

    //Variable to hold a new html content (innerHTML) to be added to the selected element
    var html = "";

    /**
     * @brief This function adds the text present in the notes box to
     *  the saved notes when the user presses the enter key
     *
     * @param An Event object to identify keyup event
     */
    $(document).keyup(function(event) {
        if(event.which === 13) {

            $("#no-saved-notes").hide();

            //Get the current text in the notes box
            var post = $('.notes-box').val();

            ////Create a new <li> element, add text post to it and prepend it to the ul list
            //$('<li>').text(post).prependTo('.posts');
            var newLiElement = $('<li>').text(post);
            newLiElement.prependTo('.posts');

            //<li class="list-group-item"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, aliquid.</p>  </li>
            //html += '<li class="list-group-item">' + post + '</li>';
            //$(".posts").html(html);

            ////Make the notes box empty again
            $('.notes-box').val('');

            ////Set the counter back to 100
            $('.counter').text('100');

            $('.notes-box').focus();
        }
    });

    //When text is typed in the notes box and the user releases the key on the keyboard, this function is called
    $('.notes-box').keyup(function() {
        //Get the length of the text entered in the 
        var postLength = $(this).val().length;

        var charactersLeft = 100 - postLength;

        $('.counter').text(charactersLeft);

        if(charactersLeft < 0) {
            $('.btn').addClass('disabled'); 
        }
        else if(charactersLeft == 100) {
            $('.btn').addClass('disabled');
        }
        else {
            $('.btn').removeClass('disabled');
        }
    });

    $('.btn').addClass('disabled');

    /*if($('.posts').children().length == 0) {
        html = "No notes saved yet ...";
        $(".posts").html(html);
    }*/

    if($('.posts').children().length != 0) {
        html = "";
        $(".posts").html(html);
    }

    //Attach an event handler to the specified child element (li, in this case) and not the selector itself
    $('.posts').on('click', 'li', function() {
        $(this).remove();

        if($('.posts').children().length == 0) {
            $("#no-saved-notes").show();
        }
    });
}

//Create a ready event when the DOM has been loaded
$(document).ready(main);
