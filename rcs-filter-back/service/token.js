import { google } from "googleapis"
import enviroment from "../config/enviroment.js"
import {mongodb_list} from "../config/mongo.js"

export class Token {

  async execute() {
    try {
        const {client_email, private_key} = await mongodb_list();

        const authClient = new google.auth.JWT(client_email, undefined, private_key.split(String.raw`\n`).join('\n'), [
            'https://www.googleapis.com/auth/rcsbusinessmessaging'
        ])

        const token = await authClient.authorize()

        return token.access_token
    } catch(e) {
      console.log(e);
      return false
    }
  }
}