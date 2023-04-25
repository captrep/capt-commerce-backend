const bcrypt = require('bcrypt');

const encryptPassword = (password) => bcrypt.hashSync(password, 10);
const encryptPasswordAsync = (password) => bcrypt.hash(password, 10);
const comparePassword = async (nonDecryptedPassword, DecryptedPassword) => await bcrypt.compare(nonDecryptedPassword, DecryptedPassword);

module.exports = {
    encryptPassword,
    encryptPasswordAsync,
    comparePassword
}