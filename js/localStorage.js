const form = document.querySelector('form');
const input = document.getElementById('item');
let myFavoriteFoodsArray = localStorage.getItem('myFavoriteFoods') ? JSON.parse(localStorage.getItem('myFavoriteFoods')) : [];
localStorage.setItem('myFavoriteFoods', JSON.stringify(myFavoriteFoodsArray));

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var item = $.trim($('#item').val());
  myFavoriteFoodsArray.push(input.value);
  localStorage.setItem('myFavoriteFoods', JSON.stringify(myFavoriteFoodsArray));
  input.value = "";
  $("body").append('<div class="listItem"><i class="fas fa-trash"></i><span class="listContentText">'+ item +'</span></div>');
});

// Call each items from localStorage and append
JSON.parse(localStorage.getItem("myFavoriteFoods")).forEach(item => {
  $("body").append('<div class="listItem"><i class="fas fa-trash"></i><span class="listContentText">'+ item +'</span></div>');
});

// Remove single task from localStorage
var removeFood = function() {
  // Checking for last item and if it reached last div then remove localStorage and reload the page
  var numItems = $('.listItem').length;
  console.log(numItems);
  if (numItems > 1) {
    $(this).parent('.listItem').remove();
  } if (numItems == 1 || numItems == 0) {
    localStorage.removeItem("myFavoriteFoods");
    $(this).parent('.listItem').remove();
    location.reload();
  }

  var temp = [];
  const list = $( '.listItem' ).find( ".listContentText" ).get();
  $(".listItem").each(function(){
    var txt = $(this).find(".listContentText").text();
    temp.push(txt);
  });

  //declare an array
  var unDone = new Array();
  //get all instances of the element and iterate through each one
  $('.listItem .listContentText').each(function(){
      unDone.push($(this).text()); // Update the cart
      localStorage.setItem("myFavoriteFoods", JSON.stringify(unDone)); // store cart
      //console.log(localStorage.getItem("items"))
  });
};

// Call function for removing a single entry
$(document).on('click', '.fa-trash', removeFood);
// Clear myFavoriteFoods localStorage
$(document).on('click', '#taskClear', function () {
    localStorage.removeItem("myFavoriteFoods");
    location.reload();
});
