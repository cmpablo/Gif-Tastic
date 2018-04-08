$(document).ready(function() {
  var topics = ["design", "animation", "2D animation", "typography", "fashion"];

  function displayDesignInfo() {
    // data-name property value
    var topic = $(this).attr("data-name");

    // constructing queryURL
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=Y4gpTF8rQaLXaJNISgOysEW6fvtC4QAc&limit=10";

    // performing AJAX request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);

      var results = response.data;

      for (let i = 0; i < topics.length; i++) {
        var topicsDiv = $("<div class='topic-gifs'>"); // div to hold gifs
        var pRating = $("<p>").text("Rating: " + results[i].rating); // holds result item's rating
        var topicImage = $("<img>"); // image tag
        topicImage.attr("src", results[i].images.fixed_height.url);
        topicsDiv.append(pRating);
        topicsDiv.append(topicImage);
        $("#faveThings").prepend(topicsDiv);
      }
    });
  }

  function renderButtons() {
    // deleting favorite things prior to adding more favorite things
    $("#faveThingsBtns").empty();
    
    // looping through array of topics
    for (var i = 0; i < topics.length; i++) {
      var b = $("<button>"); // dynamically generating buttons for each topic
      b.addClass("topics-btn"); // adding a class to the button
      b.attr("data-name", topics[i]); // adding data-attribute
      b.text(topics[i]); // button text
      $("#faveThingsBtns").append(b); // adding buttons to div
    }
  }

    


  // add JS here for form click event

  // click event listener to all topics with a class of "topics-btn"
  $(document).on("click", ".topics-btn", displayDesignInfo);

  // run functions
  renderButtons();
});
