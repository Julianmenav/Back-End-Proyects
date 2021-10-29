This app is aimed at learn the basics of authentication.
-Users can register and will be saved in the database, with the password encrypted with the bcrypt library.

-From there any registered user can access via login.
 At login bcrypt is used again to determine if the password is correct.

-If a user logs in or registers they will receive a json web token, which will be stored locally in the browser by the front-end.
Every request the user does from now, will have the token in his headers.
This allows the user to access the rest of the app's functionalities without having to log in again for each action.

-The functionalities related to Jobs, allow you to add jobs to a list, modify them, delete them, etc. The application will rely on the Json web token of the browser to determine which user is accessing and show only their information.

