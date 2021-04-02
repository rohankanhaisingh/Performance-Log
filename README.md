# Performance Log (Delayed)

-----------------------------------

### NOTE: I am currently taking a little break. I am working on something else for a friend who really needs it so yeah... The application is still available though.

-----------------------------------

Performance Log, an NodeJS application.

Performane Log is an opensource web application that will monitor your system information. This application is free to use.
This project is still in development; some features may not work and you may experience some bugs and glitches. I try to add and fix as much as I can to this project.

NOTE: This project requires the latest NodeJS version!!

-----------------------------------


## How does it work?

Performance Log is an application that runs on NodeJS, so make sure you have NodeJS installed. You also need Visual Studio to open this solution.

### Visual Studio
You may have to install the NodeJS tools in Visual Studio Installer before launching this application.

Download the solution from the repository and open it with Visual Studio 2017 or higher. Click on the 'debug' button or hit F5 to start debugging. If it doesn't open the web application, go in the project folder > ``static`` > ``user`` > open ``settings.json``. 
Change ``developerMode`` to ``false``.

### Without Visual Studio
Make sure to have NodeJS installed, if you don't have it installed go to https://nodejs.org/en/ and install it for your system.

To launch the application, go into the project folder and find for ``run.bat``. Once you opened started the bat file, you will see a black window; don't close that window. A webpage should open for you. If it doesn't, go to into the project folder > static > user > open ``settings.json`` and change ``developerMode`` to ``false``. Make sure to restart the application by closing the black command window and open it again.

You can also just open your browser and go to https://localhost:8000/view. Only you can visit the page because it is being hosted on a local server (you).

If you have ``developerMode`` in the ``settings.json`` file set to ``false`` and you close the web application in the browser (closing the tab or refreshing), the server will automatically close.

## Pages

### Index page
When you start the batch file (run.bat) or when you open the solution in Visual Studio and start debugging, it will open a NodeJS server and it will start the webpage for you (if you have developermode disabled).
You will be directed to the performance page (basically the index page). That page is a localpage, that means only you can visit the page.

On that page (index), you will see 3 cards displaying information and usage about three hardware units; CPU, RAM and your Disk.
You can't do really much on that page except reading information and the usage.

### Games
This page will show all (steam) games you have installed. You can launch the games from the webpage.

### Energy page
The second page is the energy page. On that page you will see information about your battery (if you have a laptop of course). It will show
your battery usage in a epic self-made CSS battery layout with cool waves in the background. 

### Commandline Page
This is my most favorite part of this project. This allows you to do a lot with this app and also your local machine. I made my own Performance Log commands but you are also able to use Powershell and CMD commands. This commandline has features to read files, start a minecraft server (not yet), control your desktop and many more.

### Settings page
The fourth page is the settings page. There are not much settings but there are some which are kind of useful. These settings are developerMode and darkTheme.
You may already know what these settings does. Its easy to change by pressing the toggle button. Or you can go to the settings file (settings.json) and change 
properties by yourself. Keep in mind that you have no errors in the settings file (settings.json) or else the application won't work.


----------------------------------


## New in version 0.8.1:
	- Added a new page to launch games.
	- Redesigned the notifications.
	- More Powershell scripts to handle serverside requests.

## Ideas in mind that might come into the project (I am working on this):
	- Ability to control and host a dedicated Minecraft Server.
	- Ability to control and host a dedicated Web server.
	- Fixing bugs (that will always be a feauture).

----------------------------------

CREDITS: The background videos are from Pexels. I am not sponsored by Pexels, I just like their free-to-use videos.

NOTE: Please do not copy or share any of these file without permission of the owner (Rohan Kanhaisingh). I spent a lot of time and energy into this project and I really like working on it. Wait... This makes no sense... This application is open-source, why would you not be able to copy and share any of these files. I actually have no idea lol

I hope you guys like this project :). 

----------------------------------

Any questions? Hit me up on Discord ``Microsoft Visual Studio#1943`` or on Instagram https://instagram.com/rohankanhaisingh
