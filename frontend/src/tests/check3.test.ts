import { check3 } from '../util/check3'

describe('check3',()=>{
    test('Should correctly evaluate if the array includes 3 consecutive values', ()=>{
        expect(check3([])).toEqual(false)
        expect(check3([''])).toEqual(false)
        expect(check3(['O'])).toEqual(false)
        expect(check3(['X', 'X'])).toEqual(false)
        expect(check3(['X', 'X', 'X'])).toEqual(true)
        expect(check3(['O', 'O', 'O'])).toEqual(true)
        expect(check3(['X', 'O', 'X'])).toEqual(false)
        expect(check3(['X', 'X', 'O'])).toEqual(false)
        expect(check3(['X', 'X', 'X', 'O'])).toEqual(true)
        expect(check3(['X', 'O', 'X', 'X'])).toEqual(false)
        expect(check3(['O', 'X', 'X', 'X'])).toEqual(true)
    })
    test('Should ignore empty strings', ()=>{
        expect(check3(['','','',])).toEqual(false)
        expect(check3(['','','','X', 'X'])).toEqual(false)
        expect(check3(['','','','X', 'X', 'X'])).toEqual(true)
    })
})