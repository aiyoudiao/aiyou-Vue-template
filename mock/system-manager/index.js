const USER_MANAGER = require('./user-manager')
const ROLE_MANAGER = require('./role-manager')

module.exports = [
    ...USER_MANAGER,
    ...ROLE_MANAGER
]