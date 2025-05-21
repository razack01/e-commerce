const userRegisterconnection = require( '../config/userRegisterdb');

const constants = require('../constants')
const jwt = require( 'jsonwebtoken');

const bcrypt = require( 'bcryptjs');


// register a User
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    console.log("name", name);
  
    
    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }
  
    try {
      const sqlCheck = "SELECT * FROM users WHERE email = ?";
      const [results] = await userRegisterconnection.promise().query(sqlCheck, [email]);
  
      if (results.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email already exists. Please choose a different email.",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const registerQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      await userRegisterconnection.promise().query(registerQuery, [name, email, hashedPassword]);
  
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
  
    } catch (err) {
      console.error("Registration error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory"
      });
    }
  
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
  
      userRegisterconnection.query(query, [email], async (err, results) => {
        if (err) {
          console.error("DB error:", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error"
          });
        }
  
        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            message: "User not found"
          });
        }
  
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: "Invalid credentials"
          });
        }
  
        const userdetails = {
          username: user.name,
          userID: user.userid,
          email: user.email
        };
  
        const accessToken = jwt.sign(userdetails, "abdulsecretkey", { expiresIn: '1h' });
  
        return res.status(200).json({
          success: true,
          message: "Login successful",
          token: accessToken,
          user: userdetails
        });
      });
  
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong"
      });
  
    }
}



exports.currentUser =(req,res)=>{

    console.log("req.yser",req.user)
    // const [rows] = await userRegisterconnection.promise().query("SELECT * FROM users");
    // console.log("users:", rows);
    res.json(req.user);
}


exports.allUsers = async (req, res) => {
    try {
      const [rows] = await userRegisterconnection.promise().query("SELECT * FROM users");
      console.log("All users:", rows);
      res.json(rows);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to retrieve users." });
    }
  };

  exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    console.log("req",req.params)
  
    try {
      const [result] = await userRegisterconnection
        .promise()
        .query("DELETE FROM users WHERE userid = ?", [userId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user." });
    }
  };
  