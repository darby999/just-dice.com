just-dice.com Enhancement Suite
========================

This is a chrome extension that provides various enhancements to just-dice.com. Specifically, creates the ability to use the [martingale betting strategy](http://en.wikipedia.org/wiki/Martingale_(betting_system\)) directly from the browser.

THIS IS ALPHA ALPHA SOFTWARE. PLEASE REVIEW THE CODE AND DO NOT HAVE MORE THAN YOU ARE WILLING TO LOSE AS YOUR BALANCE.

------------
Installation
------------

1. This is an extension for Chrome. It will only install on Chrome.
2. Download the repository to a directory of your choice.
2. Type `chrome://extensions/` into the address bar.
3. Make sure `Developer Mode` is checked in the upper right.
4. Click `Load unpacked extensions...` and browse to the directory where you save the repository.
5. Now browse to https://just-dice.com and you should see a new addition for Martingale betting.


How to Bet
----------
Remember this is alpha alpha software and there should not be any more coins in your account than you are willing to lose.

The `Multiplier` box contains the number your bet will be multiplied by 
The `Steps` box contains the number of iterations the betting strategy will use until either a) a win is accomplished; or b) the number of steps is exceeded.

The chrome extension uses the `bet size` to make the initial bet.

If martingale extension will not allow you to place a bet constructed such that the Multiplier, Steps, and Bet Size would exceed your available balance.

If an input box does not have focus you are able to use the 'r' key to run the martingale strategy.

Chat Notification
-----------
The enhancement suite will highlight your username in the chat window when someone types in your name.

Ignore List
-----------
The enhancement suite options page provides the ability to add a comma separated list of users you wish to ignore in the chat. To use this options:

1. Type `chrome://extensions/` into the address bar.
2. Click on the `options` link for the just-dice enhancement suite.
3. Enter a comma separate list of users to ignore.
4. Click Save.

Finally
-------
If you make some money feel free to send a little something to 1BZiXP6EoLgm3LjnExVQSSB4c7UbUqRVPf

------------
Nixsy's Bit
-------

The original martingale script by darby999 is fantastic but will only bet on 1 sequence at a time (through a set amount of losses or to a win)
I had previously used grays bot before finding this one and liked the idea of starting a bot and it will continue running until you stop it or it busts.
So the need to change this one was great. I do not claim to be great with javascript and all I have learnt has been from that fantastic teacher google.

-

There is now 2 new features which although may seem a little difficult to understand at first will become easy with a little use.


Reset loss:
-
This will lower or increase you bet size when a losing streak hits a certain number. 


Reset %:
-
When reset loss is called this will dictate the value of the bet. It is worked out as (total balance / 100) * reset % so if you set it to 1
the reset loss value will be 1% of your total balance. Use this with caution and be aware if you add 50% here you will be putting half of 
your onsite balance into one bet then it will start to martingale from 50% balance.

-

looks as of 27/10/2013
i.imgur.com/BZ426IT.jpg

Feel free to say hi in Just-Dice =) my id is 98066
------------
