export function isAdmin(req){
    if(!req.user) return false;
    return req.user.role === "admin"
}