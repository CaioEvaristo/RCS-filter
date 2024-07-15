import multer from 'multer';
import axios from 'axios';
import { Token } from './token.js';

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
    console.log('cheguei')
    const baseUrl = "https://rcsbusinessmessaging.googleapis.com/v1/phones/11949752183/capabilities";
    
    let email = "rbm-agent@rbm-pontaltech-dev-ynhiurf.iam.gserviceaccount.com";

    let privatekey= ``;


    let accessToken = await new Token().execute(email, privatekey);
    process.exit();

    let request = axios.get(baseUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    //console.log(request);

    return true
}

export {
    save,
    getNumbers,
    checkCapabilits
};