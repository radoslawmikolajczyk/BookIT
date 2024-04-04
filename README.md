# BookIT - The Room Booking System at the University of Economics
Simple room booking application created with Vue.js, Java 17, Micronaut Framework and PostgreSQL
## Table of contents
* [General information](#general-info)
* [UI design](#UI-design)
* [Functionality description](#functionality-description)
* [Technologies](#technologies)
* [Setup](#setup)

## General information
The room booking application enables easy management of available rooms on the campus of the University of Economics campus. Our application is designed for users to facilitate planning and reservation of rooms for classes, events and meetings. Below, we present the most important functionalities that enable convenient room booking.

## UI design
Link to the app's UI design in Figma: https://www.figma.com/file/BpuhlZ3LtSNlUFFMz7B4gk/BookIT---final-ver?type=design&node-id=0%3A1&mode=design&t=XHDQ0bneAZIQ2tyC-1

## Functionality description
1. ### Registration Page
The registration page in the application offers the following functionalities:

Fields to be filled:
* First Name
* Last Name
* Email
* Password
* Repeat Password

Access option to terms & conditions:
* Link leading to the terms & conditions page.

Registration process:
* After filling in all the fields, the user clicks the "Sign up" button.
* Data is validated for correctness.
* If the data is correct, a new account is created, and the user is redirected to the main page of the application.
* In case of incorrect data, an error message is displayed, prompting the user to correct the information.

Additional option for users who already have an account:
* Link allowing them to navigate to the login page.

2. ### Login Page
This screen allows the user to log in to their account.

Fields to be filled:
* Email
* Password

Login process:
* The user enters their email and password.
* After filling in the fields and clicking the "Login" button, the data is checked against the database.
* If the data is correct, the user is redirected to the main screen of the application.
* In case of incorrect data, an error message is displayed, informing the user to check their login and password.
* If the user does not have an account yet, they can navigate to the registration page using the "Need an account? SIGN UP" link.
4. 
## Technologies
Project is created with:
* Vue.js version: 3
* Java version: 17
* Micronaut Framework version: 4.3.6
* PostgreSQL 
	
## Setup
