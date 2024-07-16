import multer from 'multer';
import rbmApiHelper from '@google/rcsbusinessmessaging'
import keys from './keys.js'

const storage = multer.memoryStorage();

const save = multer({ storage });

const getNumbers = (number) => {
    let invalidNumbers=[];
    let valid = number.filter(item => {
        var phoneno = /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/;
        if (item.match(phoneno)) {
            return true;
        }
        invalidNumbers.push(item)
        return false;
    });

    return {
        valid,
        invalid:invalidNumbers
    }
}

const checkCapabilits = async () => {
    try {
        rbmApiHelper.initRbmApi(keys);
        rbmApiHelper.checkCapability('+5511956579700', (response) => {
            console.log('Foi ?', response)
        });

        return true
    } catch (error) {
        console.log(error)
    }
}

export {
    save,
    getNumbers,
    checkCapabilits
};