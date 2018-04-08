$(document).ready(function() {
  // array of topics
  var topics = [
    "design",
    "animation",
    "2D animation",
    "typography",
    "fashion",
    "architecture",
    "interior design"
  ];

  // function to request and display data
  function displayDesignInfo() {
    $("#faveThings").empty();
    var topic = $(this).attr("data-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=Y4gpTF8rQaLXaJNISgOysEW6fvtC4QAc&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      // loop to pull ratings data and images for topics array
      for (let i = 0; i < results.length; i++) {
        var topicsDiv = $("<div class='topic-gifs'>");
        var pRating = $("<p>").text("Rating: " + results[i].rating);
        var topicImage = $("<img>");

        // adding class + attributes to gifs for still and animated states
        topicImage.addClass("topicsGif");
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
        topicImage.attr("data-animate", results[i].images.fixed_height.url);
        topicImage.attr("data-state", "still");
        topicsDiv.append(pRating);
        topicsDiv.append(topicImage);
        $("#faveThings").prepend(topicsDiv);
      }

      // event to play/pause gifs
      $(".topicsGif").on("click", function() {
        var _this = $(this);
        var state = $(this).attr("data-state");

        if (state === "still") {
          _this.attr("src", _this.attr("data-animate"));
          _this.attr("data-state", "animate");
        } else {
          _this.attr("src", _this.attr("data-still"));
          _this.attr("data-state", "still");
        }
      });
    });
  }

  // creating buttons dynamically
  function renderButtons() {
    $("#faveThingsBtns").empty();

    for (var i = 0; i < topics.length; i++) {
      var b = $("<button>");
      b.addClass("topics-btn");
      b.attr("data-name", topics[i]);
      b.text(topics[i]);
      $("#faveThingsBtns").append(b);
    }
  }

  // clearing submit input and adding new topic button
  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#newTopic-input")
      .val()
      .trim();
    topics.push(newTopic);
    renderButtons();
  });

  // click event listener to all topics with a class of "topics-btn"
  $(document).on("click", ".topics-btn", displayDesignInfo);

  // run functions
  renderButtons();
});
