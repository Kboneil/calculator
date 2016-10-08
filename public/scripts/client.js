$(function(){
//creates variables for user chosen numbers and operation
var x;
var y;
var type;

append();
//on click the variables will change according to their id
$('form').on('click', 'button', function (){
  var $button = $(this);
  if ($button.attr('class') === 'groupOne'){
    x = $(this).attr('id');
  }
  if ($button.attr('class') === 'function'){
    type = $(this).attr('id');
  }
  if ($button.attr('class') === 'groupTwo'){
    y = $(this).attr('id');
  }
});
//on click the data will get sent to the server
$('#outsideForm').on('click', '#submit', function(event){
  var formData = {x: x, y: y, type: type};
  event.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: formData,
    //on success it will get appended to the DOM
    success:  append
});//end ajax
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
