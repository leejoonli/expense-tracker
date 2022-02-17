# Expense Tracker

## Application Description

This application allows for basic expense tracking as you are able to create, read, update, and delete expenses that you create.  It has the fundamental functions of what the application is supposed to be capable of but does not have more than that.  The current implementation has user authentication so only an authenticated user will be able to log in and use the app, and the authenticated user will only be able to see information that they create and not other users' data.  This project is my first attempt at using React Native so please forgive the rough edges and lack of quality of life functionality.  However, I hope you give this application a try and enjoy what you see.  Happy tracking!

Link to Expense Tracker Backend:
https://github.com/leejoonli/expense-tracker-backend

## Technologies Used
- Typescript
- React
- React Native
- Expo
- Axios
- CSS
- HTML
- React Native Navigation
- React Native Navigation Stack
- React Native Async Storage

## Installation

### React Native Environment
1. In your terminal run `npm install -g expo-cli`.  This will globally install the Expo CLI.
2. Install the Expo app on your phone.
3. After installing expo, follow the GitHub installation below.  After you finish the Gihub Installation steps, move onto step 4.
4. Run `npm start`.
5. You should see a QR code that you can use your Expo app for.
6. After reading the QR code with Expo, you should be directed to the application.

For more information on React Native Environment go here:
https://reactnative.dev/docs/environment-setup

### GitHub Installation
1. Open your terminal and navigate to your desired directory where you want to store this repository using `cd YOUR_DIRECTORY_NAME`
2. On the GitHub repository, click on the "Code" dropdown menu and either click on "HTTPS" or "SSH" depending on what you're using.
3. You can either click the link which will highlight the GitHub or https link and copy it or click on the icon next to the link which will copy it into your clipboard.
4. Fork and clone this repository to your machine using `git clone PASTE_SSH_OR_HTTPS_HERE`
5. `cd` into the newly created directory
6. Run `npm i` or `npm install` to install dependencies

If you're having difficulty in the installation process, visit this link for more information:
https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

## Current Application State

## Future Improvements

## Contribution Guidelines

### How to Identify Bugs
If you identify bugs, submit an issue on the Git repo. Please detail the bug in your issue. If you know how to fix it, feel free to note the methods you would use. You could also submit a pull request with suggested code to fix it.

## Initial Planning

### Your project idea 
This application is for expense tracking.  I've read that this kind of project will be good as a first time react-native-app and it can be scaled bigger to add more features.

### Your tech stack (frontend, backend, database)
Frontend: React, React Native, Typescript
Backend: Django, Python, SQL, AWS

### List of backend models and their properties
```js
class Expense
    name
    amount
    category
    date
    owner

class User
    email
    avatar
```

### React component hierarchy (if applicable)
App
    Home
        Daily Expenses
        Monthly Expenses
        Expenses by category

### User stories
MVP
- As a user, I want to be able to input day to day expenses so I can see how much money I spent.
- As a user, I want to be able to see what my daily expenses and monthly expenses are.
- As a user, I want to be able to see my expense details so I can see what I spent my money on.

STRETCH GOALS
- As a user, I want to be able to log in as a user so my information is saved.
- As a user, I want to be able to filter expenses based on categories.
- As a user, I would like my authentication credentials hosted on a database so I can feel more secure about my information.
- As a user, I would like to be able to delete my login credentials so I can leave the app if I want.

### Wireframes
![image](https://media.git.generalassemb.ly/user/40293/files/d3e88a00-8ac7-11ec-9399-19f9fc331858)
![image](https://media.git.generalassemb.ly/user/40293/files/de0a8880-8ac7-11ec-91b3-e7ed7ae1c096)
![image](https://media.git.generalassemb.ly/user/40293/files/e2cf3c80-8ac7-11ec-90ad-433977492384)