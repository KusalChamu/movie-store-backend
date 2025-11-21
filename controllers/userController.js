export function createUser(req,res){
    const role = req.body.role || "customer"

    if(role === "admin"){
        if(!req.user || req.user.role !=="admin"){
            return res.status(403).json({
                message: "Unauthorized: only admins can create another admin"
            });
        }
    }

    
}

export function isAdmin(req){
    if(!req.user) return false;
    return req.user.role === "admin"
}