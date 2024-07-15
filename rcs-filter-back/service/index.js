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
    try {
        const baseUrl = "https://rcsbusinessmessaging.googleapis.com/v1/+5511952472802/capabilities";

        let email = "rbm-agent@rbm-pontaltech-dev-ynhiurf.iam.gserviceaccount.com";

        let privatekey= ``;

        let accessToken = await new Token().execute(email, privatekey);

        let request = await axios.get(baseUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log('Q', request.status);

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