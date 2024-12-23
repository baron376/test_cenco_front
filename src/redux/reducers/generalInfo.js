const defaulState = {name:''};
function reducer(state = defaulState , {type, payload}){
    switch(type){
        case 'findGeneralInfo': return {name: ''}
       
        default : 
            return state;
    }
}
export default reducer;