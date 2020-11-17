# Pet Threadz

_Fun Fashion For Our Pet Friends_

This is an e-commerce website where you can purchase pet clothes and accessories for a plethera of pets and a variety of occasions.

Your pet can be stylish any time of the year, we have formal wear for all your special occasions, weather-wear for those rainy days, costumes for spooky month and accessories for everyday flair.

## Setup

To download this project clone and fork to your local repository. Run `npm i` to install all node moduels. Run `npm run start-dev` and navigate to `localhost:8080/` on your preferred browser. You can also visit the deployed version of this site at `https://petthreadz.herokuapp.com/login`.

## Design Notes

Schema Design:

Our Database Schema is broken down into four models:
-Users : all user information
-Products : all product information
-Orders : historical orders as well as current orders(active orders in cart)
-Order Line Items : line item detail of all orders current and hisotrical

Main Features:

-Guest Experience:
-As a guest you can browse products available,
-add items to your cart
-checkout

-Logged In User
-Can sign up for an account
-Log in with their username & password
-View previous orders
-Add items to their carts, log out and have items still in cart when they log in
-checkout

-Admin
-Log in with their username & password
-Manage view all users, change user status to admin
-Edit, Add & Remove Products
-View previous orders
-Add items to their carts, log out and have items still in cart when they log in
-checkout
