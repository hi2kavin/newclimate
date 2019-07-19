export  const isLogged=()=>(
    {
    type:'CHANGE_LOG_STATE',
    islog:false}
    );
export  const changeUser=(val)=>(
    {type:'CHANGE_USER',
    islog:val.islog,
    usedId:val.usedId,
    userFName:val.userFName,
    userLName:val.userLName,
    userEmail:val.userEmail,
    userImage:val.userImage
});