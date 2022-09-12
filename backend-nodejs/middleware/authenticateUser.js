const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  try {
    // Get the user from the JWT TOKEN
    // const cookies = req.headers.cookie;
    // const accessToken = cookies.split("=")[1];
    const accessToken = req.cookies.jwtAccessToken;

    // If token is not available
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Access Denied: No token provided",
      });
    }

    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (error, authData) => {
        if (error)
          return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Access Denied: Invalid token",
          });
        
        // Setting user email and id for next steps
        req.email = authData.email;
        req.id = authData.id;
        next();
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
}

module.exports = authenticateUser;
