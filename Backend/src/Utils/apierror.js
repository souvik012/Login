class Apierror extends Error{
    constructor(
        statusCode,
        message="Something Went Wrong",
        errors=[],
        data = null, // Added `data` here with a default value of `null`
        stack = ""

    ){
        super(message)
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack){
          
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.construction)
        }

       
    }
}
export {Apierror}