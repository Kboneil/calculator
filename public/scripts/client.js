$(function(){

calculate();

$('form').on('click', 'button', function(event){
  console.log('this', $(this).data('type'));
  event.preventDefault();
  var x = Number($('input[name="x"]').val());
  var y = Number($('input[name="y"]').val());
  var type = $(this).data('type');
  console.log('one', x);
  console.log('two', y);
  var formData = {x: x, y: y, type: type};
  console.log('formData', formData);
  console.log('outside ajax');
  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: formData,
    success:  calculate
});//end ajax
  $('form').find('input[type=number]').val('');
});//end click


$('form').on('click', '#clear', function (){
  $('#answer').empty();
});
}); //end of doc ready

function calculate() {
  console.log('in the calculate function');
$.ajax({
  type: 'GET',
  url: '/calculate',
  success: function (number){
    console.log("number", number);
    $('#answer').empty();
    $('#answer').text('Your answer is: ' + number);
  }
});
}
