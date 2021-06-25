export const check3 = (values: string[]) => {
    if (values.length < 3) return ''
    let consecutiveValue = ''
    for (let i=0; i<values.length; i++) {
        if (values[i].length === 1 && values[i] === values[i+1] && values[i] === values[i+2]) {
            consecutiveValue = values[i]
            break
        } 
    }
    return consecutiveValue
}
