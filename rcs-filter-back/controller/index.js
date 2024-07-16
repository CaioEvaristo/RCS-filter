import { checkCapabilits, getNumbers } from "../service/index.js";

class Check {

    async single(req, res) {
        try {
            let { number, email, key } = req.body;
            console.log(req.body)
            number = number.split(';');

            let numbers_clean = getNumbers(number);
            let your_base;

            if (!numbers_clean.valid) {
                return res.status(200).json({
                    message: 'File read successfully',
                    content: numbers_clean,
                });
            } else {
                your_base = await checkCapabilits(numbers_clean, email, key)

                return res.status(200).json({
                    message: 'File read successfully',
                    content: your_base,
                });
            }
        } catch (error) {
            console.log(error)
            return res.send(error);
        }
    }

    async multiple(req, res) {
        try {
            const fileBuffer = req.file.buffer;
            let fileContent = fileBuffer.toString('utf-8');
            const {email, key} = req.body

            fileContent = fileContent.replace(/[^\d;\n\r]/g, '');

            let dataArray = fileContent.split(/[\n\r;]+/).filter(Boolean);

            let numbers_clean = getNumbers(dataArray)
            let your_base;

            if (!numbers_clean.valid) {

                return res.status(200).json({
                    message: 'File read successfully',
                    content: numbers_clean,
                });
            } else {
                your_base = await checkCapabilits(numbers_clean, email, key);

                return res.status(200).json({
                    message: 'File read successfully',
                    content: your_base,
                });
            }
        } catch (error) {
            console.log(error)
            return res.send(error);
        }
    }
}

export default new Check()