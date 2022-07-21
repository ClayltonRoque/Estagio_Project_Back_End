import Jwt from "jsonwebtoken";

export async function correctJwt(req, res, next) {
  const token = req.headers['token'];
  
  if (!token) return res.status(401).json({auth: false, message: 'Wrong token'});

  Jwt.verify(token, "SECRETKEY", function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Authenticate fail.'});
    req.user = decoded;
    next();
  });
}
