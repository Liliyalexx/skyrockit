// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
//GET /users/:userId/applications


router.get('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Render index.ejs, passing in all of the current user's
      // applications as data in the context object.
      res.render('applications/index.ejs', {
        applications: currentUser.applications,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });
    //GET /users/:userId/applications/new
router.get('/new', async (req, res) =>{
    res.render('applications/new.ejs')
    }
    );
//POST/users/:userId/applications
router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.applications.push(req.body); // This assumes req.body is correct
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  //GET /users/:userId/applications/:applicationId
router.get('/:applicationId', async (req, res) => {
  try { 
    //look up the user that 's currently logged in
    const currentUser = await User.findById(req.session.user._id);

     //find the application that matches the applicationId
     const application = currentUser.applications.id(req.params.applicationId);

      //render the show.ejs template, passing in the application data
      res.render('applications/show.ejs', {
        application: application,
        //property shorthand suntax whenver 
        // he prop name and variable name holding the value are the same
      });

  } catch (error) {
    console.log(error);
    res.redirect('/');}

  }
  );

  // controllers/applications.js

router.delete('/:applicationId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an application using the id supplied from req.params
    currentUser.applications.id(req.params.applicationId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

  //GET /users/:userId/applications/:applicationId/edit
module.exports = router;
