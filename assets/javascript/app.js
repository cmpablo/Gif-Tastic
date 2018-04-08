$(document).ready(function() {
  var topics = ["design", "animation", "2D animation", "typography", "fashion"];

  function displayDesignInfo() {
    var topic = $(this).attr("data-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=Y4gpTF8rQaLXaJNISgOysEW6fvtC4QAc&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response.data);

      var results = response.data;

      for (let i = 0; i < results.length; i++) {
        var topicsDiv = $("<div class='topic-gifs'>");
        var pRating = $("<p>").text("Rating: " + results[i].rating);
        var topicImage = $("<img>");
        topicImage.attr("id", "gif");
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        topicsDiv.append(pRating);
        topicsDiv.append(topicImage);
        $("#faveThings").prepend(topicsDiv);

        $("#gif").on("click", function() {
          var t = $(this);
          var dataStill = topicImage.attr("src", results[i].images.fixed_height_still.url);
          var dataAnimate = topicImage.attr("src", results[i].images.fixed_height.url);
          
          if (t === dataStill) {
            t.attr("src", t.attr("dataAnimate"));
          } else {
            t.attr("src", t.attr("dataStill"));
          }

          console.log("hiiiii");
        });
      }
    });
  }

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

  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#newTopic-input").val().trim();
    topics.push(newTopic);
    renderButtons();
  });

  // click event listener to all topics with a class of "topics-btn"
  $(document).on("click", ".topics-btn", displayDesignInfo);

  // run functions
  renderButtons();
});
