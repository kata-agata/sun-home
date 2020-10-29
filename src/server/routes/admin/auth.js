const express = require('express');

const router = express.Router();



router.get('/signin', (req,res)=>{
    res.render('signin', {title: "login"});
})

router.get('/',(req,res)=>{
  res.render('adminPanel', {title: 'Sun-home Admin Panel'})
})

router.get('/realizations', (req,res)=>{
  const posts = [
    {
      title: "post no 1",
      createAt: Date.now(),
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      title: "post no 2",
      createAt: Date.now(),
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];
  res.render('partials/admin/realizationsManagement', {
    title: "Sun-home Admin Panel Realizacje",
    posts: posts
  })
});

router.get('/realizations/new', (req,res)=>{
  res.render('partials/admin/addRealization')
})

router.post('/realizations', (req,res)=>{

})

module.exports = router;
