$(document).ready(function() {

// QUOTE FUNCTION
  var website = "https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  console.log(website);         // log json quote website
  
  function newQuote() {
    var key = "";                   // generate random key for quote
    for(var i = 0; i < 6; i++) {
      key += Math.floor(Math.random() * 9);
    }
    website += "&key=" + key.toString();

  // RANDOM COLOR FUNCTION
    var str = "0123456789ABCDEF";
    var color = "#";
    for(var i = 0; i < 6; i++) {
      color += str[Math.floor(Math.random() * 16)];
    }
    console.log(color);           // log random color code

    $.getJSON(website, function(val){    // access api and receive response
      console.log(val);
      $("body, button").fadeIn(700).css("background-color", color);
      $("#quote").fadeIn(700).html('<i class="fa fa-quote-left pull-left"></i>' + val.quoteText).css("color", color);
      $("footer").fadeIn(700).html(val.quoteAuthor).css("color", color);
    });
  }

// FIRST QUOTE
  newQuote();
  
// CLICK BUTTON
  $('#get-quote').click(function() {
    $("#quote, footer, button").fadeOut(300);
    newQuote();    // new quote + random color
  });
  
// POST TO TWITTER
  $("#twitter").click(function() {
    var website = "https://api.twitter.com/1.1/statuses/update.json?status=Maybe%20he%27ll%20finally%20find%20his%20keys.%20%23alejandrov50";
    $.post(website, function(val) {
      
    })
  });
  
});
