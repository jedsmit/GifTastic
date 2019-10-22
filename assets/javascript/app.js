$(document).ready(function () {

    //topics array
    topics = ["star trek", "aliens", "star wars", "robots", "spaceships"];

    //apiKey = lN4gd7m0eEUwZ0iyDF5vSI6jCUW5ToiC

    var url = "http://api.giphy.com/v1/gifs/search?&api_key=lN4gd7m0eEUwZ0iyDF5vSI6jCUW5ToiC";

    //get and dipsplay 10 gifs and ratings

    function displayGif() {

        var topic = $(this).attr("q");
        var queryURL = "http://api.giphy.com/v1/gifs/search?&q=" + topic + "&api_key=lN4gd7m0eEUwZ0iyDF5vSI6jCUW5ToiC"

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            console.log(topic);

        });


    };
    displayGif();

    function renderButtons() {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topic");
            a.attr("topic-input", topics[i]);
            a.text(topics[i]);
            $("#buttons").append(a);
        }
    };

    renderButtons();

    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        // This line will grab the text from the input box
        var topic = $("#topic-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(topic);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });
    $(document).on("click", "#submit-btn", displayGif);

});//last closing