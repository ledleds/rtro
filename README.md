# rtro

This is a work in progress web application written in Preact.

The idea is to create a Retro app that encompasses the needs of my team, which has had to turn remote due to Covid.

## ToDo
- [x] Create a new user
- [x] Remove Websockets
  - I believe the realtime database could be enough for what I need here. I added websockets when starting out and pivoted to using Firebase. There is a bug in this current implementation which I think is down to this use of sockets. If I can think of a good use casee for websockets then I will swap from using native to Socket.io
- Users
  - [x] Assign an id to each user so that there can be multiple users of the same name.
- [x] Create Board with default columns
- [ ] Have the option to add columns
- Tickets
  - [ ] Can be added to the board
  - [ ] User can only see their tickets until retro has started
  - [ ] _Nice to have:_ The ability to emoji tickets
- [ ] Start Retro
  - [ ] _Nice to have:_ The ability for individuals to show their tickets one by one. Rather than all loaded on the board at the same time.

## Running
- Follow instructions [here](https://firebase.google.com/docs/database/web/start) for setting up your database in Firebase.
  - You will need to configure your Realtime Database rules to allow you to read and write to it without auth, do this by navigating to your database, make sure you have Realtime Database selected and under Rules, update read and write to be true.
- Populate firebaseConfig in src/firebase with credentials from firebase.
- Run `npm run dev`

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and preact-render-spy 
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
