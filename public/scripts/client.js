$(function(){
//creates variables for user chosen numbers and operation
var x;
var y;
var type;
var clicks = 1;

append();

//on click the variables will change according to their id
$('form').on('click', 'button', function (){
  var $button = $(this);
  //sets the type to the right one and clears answer box
  if ($button.attr('class') === 'function'){
    type = $(this).attr('id');
    $('#answer').empty();
  } else if ($button.attr('id') === 'submit'){
    $('#answer').empty();
    //sets the clicks to start over
    clicks=1;
  } else if ($button.attr('id') === 'clear'){
    $('#answer').empty();
    //sets the clicks to start over
    clicks=1;
  } else  {
    //catches for a decimal being added to the y input
      if ($button.attr('id') === 'decimal' && clicks === 1){
       y=y+'.'
       $('#answer').empty();
       $('#answer').text(y);
       //moves it to when the y input gets a value after the decimal
       clicks = 4
       //catches the x input
      } else if (clicks === 1) {
         x = $(this).attr('id');
         $('#answer').empty();
         $('#answer').text(x);
         clicks++;
         //catches for a decimal being added to the x input
      } else if ($button.attr('id') === 'decimal'){
          x=x+'.'
          $('#answer').empty();
          $('#answer').text(x);
          //moves it to when the x input gets a value after the decimal
          clicks++;
          //catches when the x input is getting a value after the decimal
      } else if(clicks === 3){
          x+=$(this).attr('id');
          $('#answer').empty();
          $('#answer').text(x);
          clicks=2;
          //catches the y input
      } else if (clicks === 2){
          y = $(this).attr('id');
          $('#answer').empty();
          $('#answer').text(y);
          clicks= 1;
          //catches when the y input is getting a value after the decimal
      } else if(clicks === 4){
         y+=$(this).attr('id');
         $('#answer').empty();
         $('#answer').text(y);
         clicks=1;
       }
     }
});
//on click the data will get sent to the server
$('#submit').on('click', function(event){
  var formData = {x: x, y: y, type: type};
  event.preventDefault();
  //sends the data to the URL that matches the operation
if (type === "add"){
  $.ajax({
    type: 'POST',
    url: '/calculate/add',
    data: formData,
    //on success it will get appended to the DOM
    success:  append
});
} else if (type === "subtract"){
  $.ajax({
    type: 'POST',
    url: '/calculate/subtract',
    data: formData,

    success:  append
});
} else if (type === "divide"){
  $.ajax({
    type: 'POST',
    url: '/calculate/divide',
    data: formData,
    success:  append
});
} else if (type === "multiply"){
  $.ajax({
    type: 'POST',
    url: '/calculate/multiply',
    data: formData,
    success:  append
});
}

});//end click


}); //end of doc ready
//appends the DOM with the calculation result by getting it from the server
function append() {
$.ajax({
  type: 'GET',
  url: '/calculate',
  success: function (number){
    //clears out the old answer and replaces it with the new one
    $('#answer').empty();
    $('#answer').text(number);
  }
});
}
