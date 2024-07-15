import { checkCapabilits, getNumbers } from "../service/index.js";

class Check {

    async single(req, res) {
        try {
            //get numbers
            let {number} = req.body
            number = number.split(';')

            let numbers_clean = getNumbers(number)

            // check numbers
            await checkCapabilits()

            res.status(200).json({
                message: 'File read successfully',
                content: numbers_clean,
            });
        } catch (error) {
            console.log(error)
            return res.send(error);
        }
    }

    async multiple(req, res) {
        try {
            const fileBuffer = req.file.buffer;
            let fileContent = fileBuffer.toString('utf-8');
            
            fileContent = fileContent.replace(/[^\d;]/g, '');
            let dataArray = fileContent.split(';');

            // get numbers
            let numbers_clean = getNumbers(dataArray)

            console.log('1')

            await checkCapabilits()

            res.status(200).json({
                message: 'File read successfully',
                content: numbers_clean,
            });
        } catch (error) {
            console.log(error)
            return res.send(error);
        }
    }
}

export default new Check()