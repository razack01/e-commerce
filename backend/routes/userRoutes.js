
const{registerUser,loginUser,currentUser,allUsers,deleteUser} = require('../controllers/userController');
const { validateToken }= require( '../Middlewares/validateToken');

const express = require ('express');
const router= express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser)


router.get("/currentusers", validateToken,currentUser)

router.get("/allusers", allUsers)
router.delete("/deleteuser/:id", deleteUser)


module.exports = router
