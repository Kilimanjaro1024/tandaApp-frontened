# tandaApp-frontened
Welcome to the Tanda scheduling App exercise solution by me, Clayton Miller.

This project was made to simulate a scheduling app that retailers could use to assign shifts with. This is the frontend half of the project programmed using React.js and utilizes a Ruby-on-Rails backend server.

## Instructions

### Set Up The Sever and Lauch the Frontend Application
- go to this link and clone the repo to your machine: https://github.com/Kilimanjaro1024/tandaApp-Backend

- follow the next commands step by step 
    
    1. navigate to th path of .../tandaAPP-Backend

    2. open the terminal and run: rails db:create

    3. then run: rails db:migrate

    4. finally run: rails s -p 5000

- these steps will set up the database on http://localhost:5000/

- Next you may clone this repo to your machine as well

- Once the repo is set up should follow these next steps exactly

    1. navigate to th path of .../tandaAPP-frontend

    2. open the terminal and run: npm i 
    
        (this will install the nodemodules needed to run the application)

    3. next run the command: npm start

- Once completed you will have lauched the frontend application on http://localhost:3000/

### Run Through Using the Application
- Fist of all Navigate to http://localhost:3000/ where you should be prompted to login to your account. As we have just lauched the server locally no Accounts are currently on record so we have to make a new one.

- Click the 'Register' Link at the bottom of the form and create a new account by filling out all the fields 

    !!!MAKE SURE YOUR PASSWORD MATCHES THE COMFIRM AND IS LONGER THAN 6 CHARACTERS!!! 
        
    (If you do not type them exacatly your submission may not be validated and you will have to register again)

- Next Re-enter your credentials and log into your newly created account.

- Once Logged in you will be prompted to Join an Organisation before you can begin creating schdules. As We have no Orgs established we need to create our own with the Form at the bottom.

    1. Lets create a new Organisation with the name 'Gamestop'

    2. Enter in an hourly rate of '15.00'

    3. Hit enter and we should instantly see the newly create Org appear above the form. (Feel free to make as may orgs as you like)

    4. If you would like to change the name or wage of any org you can click the edit link beneath any of the listed orgs.

- Now that we have created some orgs click the Join link under any of them and you will not be a member of that or (At this time a user can only belong to one org at a time.)

- Once you have joined an org you can now view the schedule, edit it, or leave

- For now lets view the schedule:

    1. As our Database is barnd new we should create some new shifts: Enter a Date, Start Time, Endtime, and Break Length.

    2. Make sure you enter the value for Date in the following format: YYYY-MM-DD

    3. Make sure you enter the value for Start and End Time in the following format: HH:MM:SS  hours are 00-23 minutes and seconds are 00-60 
    
    4. Make sure your start time is before your end time

    5. enter a break time between the values of 1 and 59 (these will be minutes) 

    6. hit Create Shift (If the shift does not appear immediately hit 'Load Shifts' Button and it should load in all the shifts you created as the redering for the schedules is something I am still developing to be seemless. 2ndly if you enter a value incorrectly you may get a server error and end up having to back track back to log in catch functions for these events are still in development)

- Now we should be able to see all the shifts schduled for that particular Org. if you were to go out and create a new account and join the same org you would be able to see that persons shifts. (Once again if the shifts do not immediately load you can hit the load shifts button and they should appear with ease)

- And there we have it you may now schdule to your hearts content Thank you very much for demoing this project.

PS. You may also leave any org you have joined and join another one however your shifts you created for the previous org will remain.
