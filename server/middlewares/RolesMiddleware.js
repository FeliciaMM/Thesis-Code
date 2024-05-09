//pentru pagini
const authPage = (permissions)=>{
   return(req, res, next)=>{
    const userRole=req.body.role;
    if(permissions.includes(userRole)){
        next();
    }else{
        return res.status(401).json("Permission not granted");
    }
   } 
}

//pentru a posta anunturi
const authAds = ()=>{
    
}


const authAppoint = ()=>{

}


module.exports = {authPage, authAds, authAppoint};