# TEAM02 - MovieBook

Welcome to MovieBook, a social media application for Movie Users.
Here is how to setup the web application and user it.

## Table of Contents
- [Setting Up MovieBook](#setting-up-moviebook)
  - [Running the Front-End](#run-the-front-end)
  - [Running the Back-End](#run-the-Back-end)
- [User Credentials](#user-credentials)
- [How To Use The Application](#how-to-use-the-application)
  - [Logging In](#logging-in)
  - [Looking At Movies](#looking-at-movies)
  - [Viewing Profiles](#viewing-profiles)
  - [Administration Panel](#administration-panel-admins-only)
- [Libraries & Frameworks Used](#libraries--frameworks-used)

## Setting up MovieBook

From CLI run the command `git clone https://github.com/csc309-winter-2021/team02.git`

### Run the Front-End
From CLI navigate into the cloned directory


Run the command `npm install`


Wait for all the dependencies to be installed


Run the command `npm start`


The web application will be availble on `http://localhost:3000`

### Running the Back-End
*This section will be completed during Phase 2*


## User Credentials

To login to the application, here are two sets of credentials

| Username | Password | Role |
| -------- | -------- | ---- |
| user | user | Regular User |
| admin | admin | Admin User |

## How To Use The Application

### Logging in
To login use the credentials provided above. User are *user* or *admin*
Enter the credentials in the login form on the home page.  

![Login Form](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/logging_in/login%20form.PNG)

Then click on the **Sign In** button

![Sign in Button](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/logging_in/click%20sign%20in.PNG)

If the login in successful you will be redirected to the movies page.

### Looking at Movies

The Default movies page is the gallery. This shows images of movies.  
![Movie Gallery](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/movies/Recent/Capture.PNG)

Another way to get to this page is to click on the Movies Tab in the navigation bar.  
![Movie Tab NavBar](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/movies/Recent/tempsnip.png)

#### Individual Movies
To look at individual movies, this can be done from the homepage.
In the Scroll bar, hover over a movie poster and it will give you the option to *view more*  
![View More](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/movies/individual/hover.PNG)

This will take you the movie page.  
![Movie Page](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/movies/individual/moviepage.PNG)

*Note: the movie that will show up is currently random but this will display the movie that is clicked once the back-end is implemented*

Here you will be able to view details and leave a comment or post.

##### Leaving a Review
To leave a review, click on the button that says **+ Add A Review**
This will give you at text box where you can enter your email and leave a rating.
To save the review click on **Post Review** or to cancel click **Cancel Review**  
![Movie Page](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/movies/individual/add%20review.PNG)

On the Movie page we can see comments and reviews that other users have left about the movie.

A review looks like this:  
![Comment](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/movies/individual/comment.PNG)

##### Leaving a Review

We add a comment to this review, click on the **Add a Comment** button located in the bottom right of the review.
This will open a textbox that will allow you to leave a comment.  
If you click on **Post Comment** the comment will be appended to the end of the thread.  
![Comment Added](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/movies/individual/comment_showing.PNG)

### Viewing Profiles

We can visit profiles from comment threads by clicking on the user's username.  
![User Username](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/profiles/hyperlink.PNG)

Clicking on this will take us to the user profile.

Here you will see an image of the user, a follow button and several tabs.
The tabs show:
- Favourite Movies
- Review
- Recent Activity
- Profile Info

An example of a user profile is below:  
![User Profile](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/profiles/profile.PNG)

The follow button will toggle to the state of follow, that means that if you are following the user it will say *Unfollow* otherwise it will say *Follow*,
clicking on the button will update the state.

![User Profile](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/profiles/Following_toggle.PNG)

*Note: the user that will show up is currently random but this will display the user that is clicked once the back-end is implemented*

### Administration Panel **(Admins Only)**

The admin panel is only available through the admin tab in the navigation bar (only appears for admins).
It can also be viewed from `http:localhost:3000/admin`

An example of the Admin Tab in the navigation bar is below:  
![Admin Navbar](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/admin/admin%20navbar.png)

The Admin panel has two tabs:
- Users
- Movies

The users table can be used to promote users to admins or remote admin to regular users.
The admin just needs to click on the button.

For movies, admins are able to update the description of the movies.
When an Admin clicks on edit (to edit the movie description), a popup appears with the current description of the movie and a textbox to edit the description.  
![Edit](https://github.com/csc309-winter-2021/team02/blob/howtoguide/documentationImages/admin/edit%20description.PNG)

The description will only be updated if the user clicks on *OK*.


## Libraries & Frameworks Used
- React
- Ant Design
