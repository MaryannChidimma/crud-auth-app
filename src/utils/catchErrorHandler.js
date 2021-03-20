exports.errorHandler = async (err, content) => {
    if(err.name === "JsonWebTokenError"){
        return { "data": {"success": false, "message": "You're not authorized to manage profile, as you're not logged in with correct token."}, "statusCode": 500}
    }
    else if(err.kind === "ObjectId"){
        return { "data": {"success": false, "message": "Data with such ID was not found."}, "statusCode": 500}
    }
    else if(err = {}){
        return { "data": {"success": false, "message": "Data with such ID has been deleted."}, "statusCode": 500}
    }
    return {"data": {"success": false, "message": content}, "statusCode": 500}
}