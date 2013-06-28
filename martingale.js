/***********************************************
 Martingale betting strategy for just-dice.com
 chrome extension

 You are free to copy distribute and do whatever you
 like to this software...

 if you find it useful tips to 1BZiXP6EoLgm3LjnExVQSSB4c7UbUqRVPf
************************************************/


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

function ping_user() {

  var log = $(".chatlog");
  log.data('oldVal',log.html());
  log.data('length',0);
  setInterval(function() { 
  	if (log.data('oldVal') != log.html()) {
          var new_str = log.html();
          var arr = new Array();
          arr = new_str.split('<br>');

          var line = arr[arr.length - 2];
          var line_items = line.split(' ');

          var username = $('#login span:first-child').text();
          //console.log('username:' + username);
          var pos = line_items.indexOf(username,3);
          if (pos >=0)
          {
              line_items[pos] = line_items[pos].replace(username,'<span style="color:red;font-weight:bold;">' + username + '</span>');

              document.title = "new title";

              var new_line = line_items.join(' ');
              arr[arr.length - 2] = new_line;
              var new_log = arr.join('<br>');

              log.html( new_log);
          }
         
          //var pos = new_str.search(log.data('oldVal'));
          //var result = new_str.substring(pos + new
    	  log.data('oldVal', log.html());
    	  log.data('length', arr.length);
          //console.log('length: ' + arr.length + '  log:' + arr[arr.length-2]);
	}
   },100);
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

  //
  ping_user();

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

(function($){

  $.extend({
    playSound: function(){
      return $("<embed src='"+arguments[0]+"' hidden='true' autostart='true' loop='false' class='playSound'>").appendTo('body');
    }
  });

})(jQuery);
