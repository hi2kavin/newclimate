export default (state={},action)=>{
    switch(action.type)
    {
        case 'CHANGE_CITY':
            return {city:action.city}
        case 'CHANGE_CLIMATE':
            return Object.assign({},state,{
                climate:action.climate
            })
        case 'CHANGE_DAY':
            return Object.assign({},state,{
                day:action.day
            })
        case 'CHANGE_PDF':
                return Object.assign({},state,{
                    pdf:action.pdf
                })
        default:
            return state
    }
}