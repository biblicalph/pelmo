## About this Project
This project implements a full stack application using `React`, `Redux` (not really required though) and `NodeJS`.
The React application uses `React` hooks exclusively whiles the `NodeJS` app is built with `Express`.


### Running the Application
Following these steps to run the application:
1. Make sure you have `node` (and `npm`) installed
2. Run `npm install`
3. Run `npm run start:dev`. This starts the application server on port `5000` and the client on port `3000`.
4. Open `http://localhost:3000` in a browser to access the client (frontent)
5. Open `http://localhost:5000/api/v1` in a browser to access the server. 
   For example, `http://localhost:5000/api/v1/photos` returns the list of photos


### Running Tests
Run `npm run test` or `npm test`