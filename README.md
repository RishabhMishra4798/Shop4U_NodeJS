# Shop4U_NodeJS

Requirements
------------
1. You have nodejs in your system
2. You also need mongodb in your system or you can use online mongodb database.

Installation
------------
first thing download the repo in your system, there is two way to do this
1. Download the zip file and extract it
2. you can clone this by given command (but make sure you have git installed)
```
git clone https://github.com/RishabhMishra4798/Shop4U_NodeJS.git
```
after downloading the repo, now we need to download all packages. For that just open terminal or cmd and move to the project directory and then type below command
```
npm install
```
after this, you need to setup our database, follow these command given below
```
// to start mongo shell
$ mongo
// to create database for our project type
> use shop4u
// above command give output -> switched to db shop4u
```
now we need to add items to our database so you can use my dump data or you can your own, let check one by one
1. use my dump data
```
//to restore my dump data use this command in your project directory
mongorestore --db=shop4u database_files/shop4u/items.bson
//above command restore only items collection but if you want to use all collections then type below command ( if you don,t want then it will work finr but items collection is important. )
mongorestore --db=shop4u database_files/shop4u/
```
2. use your own data
to use your own data, my project need three collections 'users' 'items' 'user_items'. To create these follow below commands
```
//inside the mongo shell
> db.createCollection( "users" )
> db.createCollection( "items" )
> db.createCollection( "user_items" )
// insert your own data to items
db.items.insertMany([
   { name: 'Rapoo 7100p Gray', price: 1599, category: 'hardwares', brand:'rapoo', color: 'silver', img_path: 'new_7.jpg'},
   { name: 'Rapoo 7100p Gray', price: 1599, category: 'hardwares', brand:'rapoo', color: 'silver', img_path: 'new_7.jpg'},
   { name: 'Rapoo 7100p Gray', price: 1599, category: 'hardwares', brand:'rapoo', color: 'silver', img_path: 'new_7.jpg'}
])
```
you need to move your images to public/img/ folder which are you going to upload.
<strong>Now you successfully done the installation part.</strong>
Lets, start project by
```
npm start
```
