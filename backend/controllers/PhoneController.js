const fs = require('fs');
const path = require('path');

const PhoneController = {
    getAll(req, res) {
        try {
            const file_path = path.join(__dirname, '../phones.json');
            fs.readFile(file_path, 'utf8', (err, phones) => {
                if (err) throw err;
                res.send(phones);
            });
        } catch (err) {
            console.error('Error:', err.stack);
        }
    }
}
    
module.exports = PhoneController;