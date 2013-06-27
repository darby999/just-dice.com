var timer;
var bal;
var bet;
var current_steps = 1;
var start_bet = 0;
var $multiplier;
var $steps;
var $run;
var running = true;

function martingale() 
{
  if (bal.data('oldVal') != bal.val() && running) {
    clearInterval(timer);

    var curr_bal = bal.val();

    //We have a winner so stop
    if (curr_bal > bal.data('oldVal'))
    {
      current_steps = 1;
      $("#pct_bet").val(start_bet);
      running = false;
    }

    else if ($.isNumeric($multiplier.val()) && 
             $.isNumeric($steps.val()) && 
            (current_steps < $steps.val())) {

            //Increase our bet by the multiplier
            var new_val = $("#pct_bet").val() * $multiplier.val();

            //get rid of scientific notation
            if (String(new_val).indexOf('e') !== -1) {
                var arr = new Array();
                arr = String(new_val).split('e');
  		new_val = new_val.toFixed(arr[1].substring(1));
	        console.log('new_val='  +new_val);
	    }

            
            $("#pct_bet").val(new_val);

            //Increase the steps
            current_steps++;
            $("#a_hi").trigger('click');
    }

    //otherwise we go back to the start
    else {
      current_steps = 1;
      $("#pct_bet").val(start_bet);
      running = false;
    }

    // Updated stored value
    bal.data('oldVal', bal.val());
    timer = setInterval(function() { martingale() },100);

  }

  else bal.data('oldVal', bal.val());
  
}

function bet() 
{
  start_bet =  $("#pct_bet").val();
  $("#a_hi").trigger('click');
}

function create_ui() {

  var $container = $('<div class="container"/>');
  var $button_group = $('<div class="button_group"/>');
  $container.append($button_group);

  var $martingale_button = $('<button class="button_label chance_toggle" style="margin-top:20px;">martingale</button>');

  var $run_div = $('<div class="button_inner_group"/>');
  $run = $('<button id="c_run" class="play" style="margin-top:18px;">Run<div class="key">R</div></button>');

  $run.click(function() { 
	running = true; 
  start_bet =  $("#pct_bet").val();
  $("#a_hi").trigger('click');
//	bet(); 
  });
  $run_div.append($run);

  var $row1 = $('<div class="row"/>');
  var $label1 = $('<p class="llabel">Multiplier</p>');
  $multiplier = $('<input id="multiplier" />');
  $multiplier.keyup(function() {set_run();});
  var $x = $('<p class="rlabel">x</p>');
  $row1.append($label1);
  $row1.append($multiplier);
  $row1.append($x);

  var $row2 = $('<div class="row"/>');
  var $label2 = $('<p class="llabel">Steps</p>');
  $steps = $('<input id="steps"/>');
  $steps.keyup(function() {set_run();});
  $row2.append($label2);
  $row2.append($steps);


  var $fieldset = $('<fieldset/>');
  $fieldset.append($row1);
  $fieldset.append($row2);

  $button_group.append($martingale_button);
  $button_group.append($fieldset);
  $button_group.append($run_div);

  $(".container").eq('1').append($container);
  $(".container").eq('1').append('<div style="clear:left;"/>');

}

function set_run() {
  if ($multiplier !== undefined &&
      $steps !== undefined   )
      if ( $.isNumeric($multiplier.val()) && 
           $.isNumeric($steps.val()) &&
           $.isNumeric($('#pct_bet').val())) {

           var total = 0;
           var mult = 1;
           var i;
          console.log('steps: ' + $steps.val() +  
          '   multiplier:' + $multiplier.val() +
          '   bal: ' + $('#pct_balance').val() + 
          '   bet:' + $('#pct_bet').val());

           for(i=0;i<$steps.val();i++) {
             total+= $('#pct_bet').val() * mult;
             mult *= $multiplier.val(); 
           }
           console.log('total:' + total);

           if (total != 0 && total < $('#pct_balance').val()) {
             console.log("setting class VALID");
	     $run.removeClass('invalid');
           }
           else {
             console.log("setting class invalid");
	     $run.addClass('invalid');
           }
      }

      else {
        console.log("setting class invalid");
	$run.addClass('invalid');

      }  
}



//
//The main stuff
//
$(document).ready( function() {

  console.log('starting');

  create_ui();

  //set the balance
  //when the balance changes and we're martingaling 
  //we'll do our stuff
  bal = $("#pct_balance");
  bal.data('oldVal', bal.val());
  timer = setInterval(function() { martingale() },100);

  //we also monitor the bet b/c it can also determine if 
  //we have enough btc to bet the martingale run
  bet = $("#pct_bet");
  bet.data('oldVal',bet.val());
  setInterval(function() { 
  	if (bet.data('oldVal') != bet.val() && !running) {
    	  bet.data('oldVal', bet.val());
	  set_run();
	}
   },100);

 $(document).keydown(function(e){
    var ctrlDown = false;
    var ctrlKey = 17, qKey = 81,rKey = 82;

    if (! $(document.activeElement).is('input') &&
      (e.keyCode == rKey)) {
	running = true;	
        start_bet =  $("#pct_bet").val();
        $("#a_hi").trigger('click');
	//bet();
    }

    $(document).keydown(function(e)
    {
        if (e.keyCode == ctrlKey) ctrlDown = true;
    }).keyup(function(e)
    {
        if (e.keyCode == ctrlKey) ctrlDown = false;
    });

    if (ctrlDown && (e.keyCode == qKey)) {
      clearInterval(timer);
      running = false;
      current_steps = 1;
    }
  });

});

