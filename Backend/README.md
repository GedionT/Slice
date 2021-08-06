# Slice
  Table of Contents:-
  - Quick start.
  - How to get started on local system?
  - Wireframes
  - Understanding the flow of work.
  - Screenshots
  - Postman Collection Link
  - Explaination of postman.

  
## Quick start
The Data is sent from Extension to the backend which then processes it and stores it on mongodb database. Then upon request from website the data of the user activity is sent.

### How to get started on local system?
- cd to backend folder.
- npm install.
- Make a file name ".env".

Put the parameters in the file:- 
- name=**insert your mongodb username**
- password=**insert your mongodb password**
- db=**insert your mongodb database name**
- secretcode=**insert your jwt secret key password**
- TWILIO_ACCOUNT_SID=**insert your twilio account SID**
- TWILIO_AUTH_TOKEN=**insert your twilio account auth token**
- phone = **insert your twilio account phone number**

- npm start

### Wireframes 

- [Figma UI Design](https://www.figma.com/file/cul71mDT37gGNMhBuG5dtr/Untitled?node-id=0%3A1)
- [Lucid Flow: System Design](https://lucid.app/lucidchart/c3d9fee3-0123-42c8-b444-9bda69299d81/edit?viewport_loc=-16%2C-322%2C2413%2C1101%2C0_0&shared=true)


### Understanding the flow of work
- Entrypoint.js is the file where the server starts functioning.
- Depending upon the routes , flow diverts to controllers.
- Depending upon the controller flow goes to service layer where operation on data is done.
- Depending upon the operation the repository layer is accessed where server interacts with the database.


## Screenshots

Upon signing in the user gets a message like this(give the user had signed up with phone number(including the country code, for ex +91......(code for **India**)):-

![WhatsApp Image 2021-08-07 at 2 41 56 AM (1)](https://user-images.githubusercontent.com/60891544/128572254-f14ab259-60df-43f7-8789-5611438b6151.jpeg)

TO get daily report a button on frontend is pushed and user gets the following:-


![WhatsApp Image 2021-08-07 at 2 41 56 AM](https://user-images.githubusercontent.com/60891544/128572261-63f580ee-bfaf-47d7-b6ce-b015318c8c26.jpeg)


## Postman Links:-
[Copy paste in postman](https://www.getpostman.com/collections/b51aa8bae7deed76add4)

- Signup is used to signup the user.
- Login to signin and reply with a token if successful.
- Send data is for extension to send data to.
- Get details is to get the details of the user via the uid.
- Edit details is to edit the goals.
- get goals past current data (uid is uid),{type can be current(current week data),goal(get the goals),past(get past week data)},context can be read(for reading time of codes),code(for coding time of code)
- get language effeciency data (uid is userid),(context is language{to get language usage in hours},efficiency{a special term computed by us by code numbers and time on pc})
