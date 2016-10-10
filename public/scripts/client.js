$(function(){
//creates variables for user chosen numbers and operation
var x = 0;
var y = 0;
var type;
var clicks = 1;
var input = 'xValue';

append();

//on click the variables will change according to their id
$('form').on('click', 'button', function (){
  var $button = $(this);

  //sets the type to the right one and clears answer box and
  //brings it to the y value
  if ($button.attr('class') === 'function'){
    type = $(this).attr('id');
    $('#answer').empty();
    clicks = 1;
    input = 'yValue';

    //on submit the values reset
  } else if ($button.attr('id') === 'submit'){
    $('#answer').empty();
    clicks=1;
    input = 'xValue';
    x = 0;
    y = 0;

    //on clear the values reset
  } else if ($button.attr('id') === 'clear'){
    $('#answer').empty();
    clicks=1;
    input = 'xValue';
    x = 0;
    y = 0;

    //this deals with all number buttons and decimals
  } else  {

    //catches for a decimal being added to the x input
   if ($button.attr('id') === 'decimal' && input === 'xValue'){
      x=x+'.'
      $('#answer').empty();
      $('#answer').text(x);
      clicks = 2;

      //catches for a decimal being added to the y input
    } else if ($button.attr('id') === 'decimal' && input === 'yValue'){
        y=y+'.'
        $('#answer').empty();
        $('#answer').text(y);
        clicks = 2;

        // catches the x value before decimals and clears out the 0 for
        //first entry and takes in more than one digit
    } else if (clicks === 1 && input === 'xValue') {
        if (x === 0){
          x = $(this).attr('id');
          $('#answer').empty();
          $('#answer').text(x);
        } else {
         x += $(this).attr('id');
         $('#answer').empty();
         $('#answer').text(x);
        }

          //catches when the x input is getting a value after the decimal
      } else if(clicks === 2 && input === 'xValue'){
          x+=$(this).attr('id');
          $('#answer').empty();
          $('#answer').text(x);

          // catches the y value before decimals and clears out the 0 for
          //first entry and takes in more than one digit
        } else if (clicks === 1 && input === 'yValue') {
          if (y === 0){
            y = $(this).attr('id');
            $('#answer').empty();
            $('#answer').text(y);
          } else {
            y += $(this).attr('id');
            $('#answer').empty();
            $('#answer').text(y);
          }

             //catches when the y input is getting a value after the decimal
         } else if(clicks === 2 && input === 'yValue'){
             y+=$(this).attr('id');
             $('#answer').empty();
             $('#answer').text(y);
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
