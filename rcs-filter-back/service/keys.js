import {mongodb_list} from '../config/mongo.js'

const {client_email, private_key} = await mongodb_list();

const obj = {
    client_email, 
    private_key: private_key.split(String.raw`\n`).join('\n')
}

export default obj