
function dbs(){

    console.log("Now it is run under",process.env.NODE_ENV," mode")
    if (process.env.NODE_ENV === 'production') {
        return process.env.MONGOLAB_URI;
    }
    else return "mongodb://127.0.0.1:27017/home";


}
module.exports= dbs

 
// "mongodb+srv://voyansi-challenge-james:<password>@cluster0.t2z17.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ||
