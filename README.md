# Maze

I found this file on the Internet that was apparently created by Bob Stanton and 
shows that he submitted this to Games Magazine at a date I do not know.

I been able to get the framework to establish the html page, but have been unable to 
get the JavaScript programming to work. 

I believe it is because the libraries are not included. 
These are the libraries that are needed:

jslib.js
jslib2a.js
jslibpp.js
jslibxr.js
jquery.js
jquery-ui.js

I am still relatively new to HTML, CSS and JavaScript.
And have started learning about node.js, Jquery, etc.

I am using Visual Studio Code (with GitHub) and when I use Chrome Inspect, I find the following:
CtlPanel is not defined.

-------------------------------------------------------------------------------------------------
Here are the instructions for the game:
Every Which Way Maze Problem Help Screen
The problem is to find a way to traverse the maze starting in the upper left corner and ending in the lower right corner. The player may travel 1-6 cells either up or down or right or left. The direction is determined from the current cell denoted by a red background at the start of the move.

The 6x6 matrix (plus start and end cells) defines the state of the program: the red cell is the occupied cell, and the direction of the next move is defined by the contents of the occupied cell.

Commands may be entered in the first column starting with row-0 through row-14. Valid commands are as follows:

m
The integer m is the number of cells to move.
This command moves the current cell m in the direction indicated by the current cell at the start of the move.
Example: 3
If the current cell indicates Down then the current cell moves 3 cells in a downward direction.
END
This command ends the program. The program resets the control variables to enable reexecution of commands with step or run buttons from the beginning.
The control panel activates various parts of the puzzle with seven buttons:

reset
This button resets the display area to the initial settings.
clear
This button clears the move area.
step
This button executes the current move indicated by the yellow background color.
run
This button executes all the moves starting with the move indicated by the yellow background color.
new maze
This button generates a new maze problem.
first maze
This button generates the original maze problem.
help
This button displays the help page.
The commands are subject to the following constraints:

Move out of Bounds
The current cell indicated by the red background is moved to a location off the 6x6 matrix.
Invalid Move
Move must be numeric, > 0, or END.
Invalid direction
Direction must be Up, Down, Left, or Right.
Memory out of Bounds
The move command index is out of range.
Program ended
Program ended by invoking the END command.
Program Error
Please report this program bug to the developer.
Acknowledgements
This puzzle appeared in GAMES magazine. The contributer is Bob Stanton.

This page last updated 12/04/2014 05:41:42
