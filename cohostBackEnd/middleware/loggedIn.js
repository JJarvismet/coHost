isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        res.status(401);
        throw new Error('not authorized');
    }
    next();
}
module.exports = isLoggedIn;