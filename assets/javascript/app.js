$(document).ready(function () {

    //topics array
    topics = ["star trek", "aliens", "star wars", "robots", "spaceships"];

    //apiKey = lN4gd7m0eEUwZ0iyDF5vSI6jCUW5ToiC

    //giphy api search url = "http://api.giphy.com/v1/gifs/search?&api_key=lN4gd7m0eEUwZ0iyDF5vSI6jCUW5ToiC";

    //creates buttons with text 
    function renderButtons() {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topic");
            a.attr("data", topics[i]);
            a.text(topics[i]);
            $("#buttons").append(a);
        }
    };

    //function makes ajax call based on button text, gets and dipsplay 10 gifs and ratings, sets attributes for each gif and displays them
    function displayGif() {

        var topic = $(this).text();

        var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + topic + "&limit=10&api_key=lN4gd7m0eEUwZ0iyDF5vSI6jCUW5ToiC"

        // AJAX call for the button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //set variable to hold data object
            var resultsObj = response.data;
            //empty the gifs div
            $("#gifs").empty();
            //iterate through the gif objects in the response to display them and their rating
            for (i = 0; i < resultsObj.length; i++) {
                //create div for the for gif and rating
                var gifDiv = $("<div>");
                //creat div for gif image
                var imgDiv = $("<img>");
                //create <p> for the rating
                var p = $("<p>").text("Rating: " + resultsObj[i].rating);
                //set attributes for image
                imgDiv.attr({
                    "src": resultsObj[i].images.original_still.url, //initial display is a still image
                    "data-move": resultsObj[i].images.original.url, //url for moving image
                    "data-still": resultsObj[i].images.original_still.url, //url for still image
                    "data-animate": "no" //animation state 
                });
                //puts the image and rating into the gif div
                gifDiv.append(imgDiv);
                gifDiv.append(p);
                $("#gifs").append(gifDiv);
            };


        });
    };
    //function checks if the gif is animated and either naimates it, or stops it
    function animate() {
        if ($(this).attr("data-animate") === "no") {
            $(this).attr({
                "src": $(this).attr("data-move"),
                "data-animate": "yes"
            });
        } else {
            $(this).attr({
                "src": $(this).attr("data-still"),
                "data-animate": "no"
            });
        };
    };
    //call to display initial buttons
    renderButtons();

    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        //This line will grab the text from the input box
        var topic = $("#topic-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(topic);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });
    //make ajax call and display gifs when a button is clicked
    $(document).on("click", ".topic", displayGif);
    //call animate function when image is clacked
    $(document).on("click", "img", animate);
});//last closing