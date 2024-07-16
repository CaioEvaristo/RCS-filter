import multer from 'multer';
import rbmApiHelper from '@google/rcsbusinessmessaging';

const storage = multer.memoryStorage();

const save = multer({ storage });

function formatPhoneNumber(cleanedNumber) {
  if (cleanedNumber.startsWith('55')) {
    return `+${cleanedNumber}`;
  } else if (cleanedNumber.length === 11 && cleanedNumber.startsWith('9')) {
    return `+55${cleanedNumber}`;
  } else if (cleanedNumber.length === 10) {
    return `+55${cleanedNumber}`;
  } else {
    return `+55${cleanedNumber}`;
  }
}

const getNumbers = (number) => {
    let invalid=[];
    let valid =[]; 
    number.map(item => {
      const regex = /[^0-9a-záéíóúàèìòùâêîôûãõç\s]/gi;
      item = item.replace(regex, '');
      item = item.replace(' ', '');

      if (item.length > 10 && item.length < 14) {
        return valid.push(formatPhoneNumber(item));
      } else {
        invalid.push(item);
        return
      }
    });

    return {
        valid,
        invalid
    }
}

const checkCapabilits = async (numbers, client_email, private_key) => {
    try {
        let valid=[];
        let invalid=numbers.invalid;
        private_key = private_key.split(String.raw`\n`).join('\n');

        await rbmApiHelper.initRbmApi({client_email, private_key});

        if (!numbers.valid) {
            return numbers.invalid
        }

        await new Promise((resolve, reject) => {
          	rbmApiHelper.getUsers(numbers.valid, async (response) => {
				try {
					await Promise.all(numbers.valid.map(async (element) => {
						if (response
							&& response.data
							&& response.data.reachableUsers 
							&& response.data.reachableUsers.includes(element)) {
						valid.push(element);
						} else {
						invalid.push(element);
						}
					}));
					resolve();
				} catch (error) {
					reject(error);
				}
			});
        });
          
		return {
		valid,
		invalid
		};

    } catch (error) {
        console.log(error)
        return {};
    }
}

export {
    save,
    getNumbers,
    checkCapabilits
};