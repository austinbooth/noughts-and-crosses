import { check3 } from '../util/check3'

describe('check3',()=>{
    test('Should correctly evaluate if the array includes 3 consecutive values', ()=>{
        expect(check3([])).toEqual('')
        expect(check3([''])).toEqual('')
        expect(check3(['O'])).toEqual('')
        expect(check3(['X', 'X'])).toEqual('')
        expect(check3(['X', 'X', 'X'])).toEqual('X')
        expect(check3(['O', 'O', 'O'])).toEqual('O')
        expect(check3(['X', 'O', 'X'])).toEqual('')
        expect(check3(['X', 'X', 'O'])).toEqual('')
        expect(check3(['X', 'X', 'X', 'O'])).toEqual('X')
        expect(check3(['X', 'O', 'X', 'X'])).toEqual('')
        expect(check3(['O', 'X', 'X', 'X'])).toEqual('X')
    })
    test('Should ignore empty strings', ()=>{
        expect(check3(['','','',])).toEqual('')
        expect(check3(['','','','X', 'X'])).toEqual('')
        expect(check3(['','','','X', 'X', 'X'])).toEqual('X')
    })
})