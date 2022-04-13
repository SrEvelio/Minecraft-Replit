### Minecraft on Replit
[![Run on Repl.it](https://repl.it/badge/github/SrEvelio/Minecraft-Replit)](https://repl.it/github/SrEvelio/Minecraft-Replit)

The title says it all, running a minecraft paper 1.8.8 server on Replit in just seconds.


### How to enter the server

To be able to enter the server you will need a Ngrok key (It is totally free and you can obtain one at its [official site](https://ngrok.com/))
After registering you will get a token that you will have to configure by running
```
./ngrok authtoken (token)
```
After that start your server, when it starts run
```
./ngrok tcp 25565
```
Which will give you a url that you will have to put in minecraft and ready you already have a 100% functional minecraft server in replit.

