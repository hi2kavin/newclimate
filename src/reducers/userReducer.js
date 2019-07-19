export default (state={},action)=>{
    switch(action.type){
        case 'CHANGE_LOG_STATE':
            return {islog:false}
        case 'CHANGE_USER':
            console.log(action)
            return Object.assign({},state,{
                islog:action.islog,
                usedId:action.usedId,
                userFName:action.userFName,
                userLName:action.userLName,
                userEmail:action.userEmail,
                userImage:action.userImage
            })
        default :
            return state
    }
}