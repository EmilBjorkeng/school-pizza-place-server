# school-pizza-place-server
Local server for a fictional pizza place

## About the project and the team behind it
This is a school project where me and 2 others was tasked to make a ordering system for a fictional pizza place. In our case that's Pizza Plass AS.

We split the tasks around one got networking (setting up potential network for the fake pizza place) the other got frontend development while I got the task of making the backend server, frontend JavaScript and help with any frontend problems. I do a lot of work in my free time as well so I took on some extra work. You can read a little bit more in out about us page (tho that is in Norwegian.. it has a cool picture tho).

## How to download and run the server
This section is mostly so I can remember what to do in case I have to clone the code again.
> If you want to try it out yourself you need node js and npm installed. 
> Then you clone the repository into a folder, open a terminal and type `npm init`, `npm install --save express` and `npm install bcryptjs`.

> To start the server just type `node server.js`. It should now be live at `localhost:8081` or `your.ip.here:8181` for other people on your network.

## Staff acounts
I am no expert at sefety but I tried to add some level of encryption to the project so the fictinal hackers that is trying to hack the pizza placed don't get your password
> To add a staff accounts run the addAccount.js `node addAccounts.js username password`. To remove a staff account run the removeAccount.js `node removeAccounts.js username`. To login to your newly created account go to `localhost:8081/login`

### If you end up trying it yourself
I should note that the local server was never made for anyone else to download and try it so no guarantees. Tho I would not see any reason it worldn't work. The site is also in Norwegain because of the simple fact that we are Norwegian.
