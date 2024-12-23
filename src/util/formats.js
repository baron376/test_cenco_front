import moment from 'moment';


export const customFormatterDate = (date) => {
    let d = new Date(date);
    d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
    
    return d;
}
export const customFormatterMoment = (date) => {
    return moment(date);
}
export const customFormatterToSent = (date) => {
    return moment(date).format('YYYY-MM-DD');
}
export const customFormatterToView= (date) => {
    return moment(date).format('DD-MM-YYYY');
}

export const getFirtsEmentArray = (array) =>{
    for (let i in array) return array[i];
}


