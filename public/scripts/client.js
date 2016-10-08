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
  if ($button.attr('class') === 'function'){
    type = $(this).attr('id');
  } else {
     if (clicks === 1) {
         x = $(this).attr('id');
         clicks++;
       } else {
          y = $(this).attr('id');
          clicks= 1;
     }
 }

});
//on click the data will get sent to the server
$('#outsideForm').on('click', '#submit', function(event){
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

//on clear the box will be emptied
$('#outsideForm').on('click', '#clear', function (){
  $('#answer').empty();
});
}); //end of doc ready
//appends the DOM with the calculation result by getting it from the server
function append() {
$.ajax({
  type: 'GET',
  url: '/calculate',
  success: function (number){
    //clears out the old answer and replaces it with the new one
    $('#answer').empty();
    $('#answer').text('     ' + number);
  }
});
}
