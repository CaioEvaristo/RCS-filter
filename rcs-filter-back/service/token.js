import { google } from "googleapis"
import enviroment from "../config/enviroment.js"

export class Token {

  async execute(clientEmail, privateKey) {
    try {
      const authClient = new google.auth.JWT(clientEmail, undefined, enviroment.private_key, [
        'https://www.googleapis.com/auth/rcsbusinessmessaging'
      ])


      console.log(authClient)
      const token = await authClient.authorize()

      console.log(token.access_token)
      process.exit()
      return token.access_token
    } catch(e) {
      console.log(e);
      return false
    }
  }
}