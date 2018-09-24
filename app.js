$(document).ready(function() {

    var movies = ["pulp fiction", "inglorious bastards", "true romance", "hateful eight", "reservoir dogs", "kill bill", "django unchained", "jackie brown", "sin city"];

    //this function will iterate through the array and create buttons for each movie above
    function makeButtons(topics, classes, area) {
        $(area).empty();

        //add necessary pieces to each movie including class, text within button, and the button itself
        for(var i = 0; i < topics.length; i++) {
            var but = $("<button>");
            but.addClass(classes);
            but.attr("data-type", topics[i]);
            but.text(topics[i]);
            $(area).append(but);
        }
    }

    //populate page with results from user's search
    $(document).on("click", ".movie-button", function() {
        $("#movies").empty();
        $(".movie-button").removeClass("active");
        $(this).addClass("active");
    
        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=IY8jm7k9guoa2h4C46AFFXc13fXnveFW&limit=10";
        
        //grab the api results from the search

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
              var movieDiv = $("<div class='movie-item'>");
    
              var rating = results[i].rating;
    
              var p = $("<p>").text("Rating: " + rating);
    
              var animated = results[i].images.fixed_height.url;
              var still = results[i].images.fixed_height_still.url;
    
              var movieImage = $("<img>");
              movieImage.attr("src", still);
              movieImage.attr("data-still", still);
              movieImage.attr("data-animate", animated);
              movieImage.attr("data-state", "still");
              movieImage.addClass("movie-image");
    
              movieDiv.append(p);
              movieDiv.append(movieImage);
    
              $("#movies").append(movieDiv);
            }
          });
      });
    
      $(document).on("click", ".movie-image", function() {
    
        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var newmovie = $("input").eq(0).val();
    
        if (newmovie.length > 2) {
          movies.push(newmovie);
        }
    
        makeButtons(movies, "movie-button", "#movie-buttons");
    
      });
    
      makeButtons(movies, "movie-button", "#movie-buttons");
});