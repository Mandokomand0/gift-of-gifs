
//full api example http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5

//This is the Array that will be pulled from
var buttonArray = ["Pickle Rick", "One Piece", "Hearthstone"];

//variables to use in the AJAX call

var meme = "";
var bringLow = "";
var spacesErased = "";
var key = "7b5c2c2388404e0d88d4d044e0fc319e&limit=3";
//var url = "http://api.giphy.com/v1/gifs/random?";
//var strangIn = "q=" + spacesErased;

//var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + spacesErased + key;
    

 //Add new button
   


function putOnPage() {

  // render our memeful buttons on to the top bar todos to the page
  for (var i = 0; i < buttonArray.length; i++) {
    var b = $("<button class='btn btn-success gif-me'>").text(buttonArray[i]).attr("data-meme", buttonArray[i]);
    $("#button-row").append(b);
  }
}

function addClickListeners() {
//click for gif
    $(".gif-me").on("click", function() {
       
      meme = $(this).attr("data-meme");
      bringLow = meme.toLowerCase();
      spacesErased = bringLow.replace(/ /g, "+").replace(/and/g, "&" ).trim();
      //var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + spacesErased + "&api_key=dc6zaTOxFJmzC&limit=10";

      //AJAX call
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + spacesErased + "&api_key=" + key;
      console.log(queryURL);
      console.log(spacesErased);
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        
        console.log(response);

        var results = response.data;




        //Picture dispaly
        for (var i = 0; i < results.length; i++) {

          var memeDiv = $("<div>");
          
          var p = $('<p>').text("Rating " + results[i].rating);
          var src = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
          
          var memeImage = $("<img class='img-thumbnail gif-ted-ones'>").attr('src', src).attr('data-animate', src).attr('data-still',still);

          memeDiv.append(p);
          memeDiv.append(memeImage);
            if (i === 0) {
                $('#present-for-you-gifs-0').prepend(memeDiv);
                }
            if (i === 1) {
                $('#present-for-you-gifs-1').prepend(memeDiv);
                }
            if (i === 2) {
                $('#present-for-you-gifs-2').prepend(memeDiv)
                };

       
        }
        
        addGifListeners();

      });
    });
    
}

function addGifListeners() {
    $(".gif-ted-ones").off("click").on("click", function() {
    console.log("Test");
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");

      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
}

$('#push-button').on("click", function(){
   // event.preventDefault();
    
    valueToBePlaced = $("#input-field").val().trim()


    
        buttonArray.push(valueToBePlaced)
        
        console.log(buttonArray);
        $("#button-row").empty(); // empties out the html
    putOnPage();
    addClickListeners();
});

putOnPage();
addClickListeners();