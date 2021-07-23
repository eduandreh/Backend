

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

//configurar cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'dmnligu6a', //reemplazar con sus credenciales
    api_key: '893294349767265', 
    api_secret: 'DQp1SU1HobPrRtJWccza314Kfmg'
});


// Async function to get the Contact List
exports.getImagenesByUser = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    console.log("byDni",query)
    try {
        var UserImagenes = await UserImg.paginate(query, options)
        // Return the Control list that was retured by the mongoose promise
        console.log("videos by dni",UserImagenes)
        return UserImagenes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Desafios');
    }
}


async function savedUserImg (newUserImg)
{

    try {
        // Saving the Control 
        var savedUserImg = await newUserImg.save();
        
        return savedUserImg;
    } catch (e) {
        // return a Error message describing the reason 
    console.log(e)    
    throw Error("Error while Creating Imagen User")
}
}
exports.createUserImg = async function (userImg) {
    
    //subir imagen a cloudinary
    console.log("userImg",userImg)
    let urlImg;
    let imagen = 'imagenes/' + userImg.imageFileName;
            cloudinary.uploader.upload(imagen, function(result) { 
             console.log("Resultado",result);
        urlImg=result.url;
        // Creating a new Mongoose Object by using the new keyword
       
        
    });
    
    
    
    
    
}



