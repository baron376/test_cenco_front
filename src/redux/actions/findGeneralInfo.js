export const type = 'findGeneralInfo';

const findGeneralInfo = (info) =>{
    return {
        type ,
        payload : info,
    }
}

export default findGeneralInfo;