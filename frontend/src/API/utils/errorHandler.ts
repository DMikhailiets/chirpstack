import Notification from "../../components/Notification"

const errorHandler = (err: any) => {
    if(err.response){
    //throw new Error(err),
    Notification({
        text: err.response.data.error,
        type: 'error',
        title: "Access denied or internal service error was received"
      })
    } else if (err){
        console.log(err)
      //  throw new Error(err),
        Notification({
            text: 'server not found',
            type: 'error',
            title: "Network error"
        })
    } else {
        //throw new Error(err),
        Notification({
            text: 'Something went wrong',
            type: 'error',
            title: "Oops..."
        })
    }
    return null
}

export default errorHandler