function rememberMiddleware (req,res,next) {
    next();

    if(req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined){
        let usersJSON = fs.readFileSync('users.json', {
            encoding:'utf-8'
        });
        let users;
        if(usersJSON == ""){
            users = [];
        }else {
            users = JSON.parse(usersJSON);
        }
        let usuarioALoggearse;
        for (let i = 0; i < users.length; i++){
            if(users[i].email == req.cookies.remember){
                usuarioALoggearse = users[i];
                break;
            }
        }
        req.session.usuarioLogueado = usuarioALoggearse;
    }
}

module.exports = rememberMiddleware;