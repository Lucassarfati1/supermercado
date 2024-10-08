function guestMiddleware(req,res,next){
    if(req.session.usuarioLogueado == undefined){
        next();
    }else{
        res.send('Esta paina es solo para invitados');
    }
}

module.exports = guestMiddleware;