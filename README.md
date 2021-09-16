# T-Shirt Store

### Here i used Braintree as a payment gateway so please go on https://www.braintreepayments.com/sandbox and create your sandbox account. You will get your 

1. merchant_key
2. public_key
3. private_key

_note:- sandbox account is only for testing purpose and these above keys are your sandbox account key, if you want to put this website in production you can create new Braintree Account and replace these keys with your actual keys_


go inside projBackend\api\payment\ open views.py file 

-> Enter your merchant_key at line 15 and 38. 

-> Enter your public key on line 16

-> Enter your private key at line 17

> ## Setup Backend

I am expecting python 3.5 or higher already installed in your system

**step 0.** Go in projBackend Folder

**Step 1.**
Install virtualenv by running this command

`py -m pip install --user virtualenv`

**Step 2.**
Create virtual enviroment by running this command
`py -m venv env`

**Step 3.** Activate your virtual enviroment by running this command
`.\env\Scripts\activate`

**Step 4.** Install all dependencies by running this command
`pip install -r requirements.txt`

**step 5.** For running the django run this command
`python manage.py runserver`

congratulation your backend is up and running


> ## Setup Frontend

I am expecting Node 14.7 or higher already installed in your system

**step 0.** Go in projfrontend Folder

_note:- you can use npm or yarn any of these package manager here i am using npm_

**step 1.** For install all node dependency run `npm install` command in the terminal.

**step2.** for running the front end run `npm start` command in your terminal

congratulation your frontend is up and running


For sandbox testing you compulsary have to use sandbox specific credit card or other wise you will get error. You will get testing card detail on https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/php 




