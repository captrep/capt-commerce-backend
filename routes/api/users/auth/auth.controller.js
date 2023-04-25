const {nanoid} = require('nanoid');

const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler');
const bcryptHelper = require('../../../../helpers/bcrypt');
const jwtHelper = require('../../../../helpers/jwt');
const { successApi } = require('../../../../utils/response');
const userTransformer = require('../../../../helpers/transformer/user')
const { User} = require('../../../../database/models');

const register = async (req, res, next) => {
    try {        
        const { firstName, lastName, email, password, mobile, role } = req.body
        const user = await User.create({
            id: nanoid(),
            firstName,
            lastName,
            email,
            password,
            mobile,
            image: '',
            role
        });
        res.status(201).json(
            successApi(201, 'Created', userTransformer.detail(user.toJSON()))
        );
    } catch (err) {
        next(err);
    }

}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });
        if (!user) {
            throw new ApiErrorHandler(404, 'USER NOT FOUND');
        }
        
        const comparePassword = await bcryptHelper.comparePassword(password, user.password);
        if (!comparePassword) {
            throw new ApiErrorHandler(401, 'WRONG CREDENTIALS');
        }
        
        const token = jwtHelper.generateJwtToken(user.id);
        
        res.status(200).json(
            successApi(200, 'OK', {user: userTransformer.detail(user.toJSON()), token})
        );
        
    } catch (err) {
        next(err);
    }
}
module.exports = { 
    register, 
    login
}
