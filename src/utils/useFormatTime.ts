const formatDate = (time: string | undefined) =>{
    if(!time) return ''
    let date = new Date(time)
    let year = date.getFullYear()
    let month = addZero(date.getMonth() + 1)
    let day = addZero(date.getDate())
    let hour =  addZero(date.getHours())
    let min = addZero(date.getMinutes())
    let sec =  addZero(date.getSeconds())
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}
const addZero = (num: number) => {
    return num > 9 ? num : '0' + num
}

export default formatDate