/**
 * NOTE 之所以这里使用require导入然后又用export导出，
 * 因为根目录下的mock目录中是nodejs程序，nodejs只能使用commonjs规范。
 * 这样写，在vue编译过程中是允许的。
 */

// import SystemManager from './system-manager';
const SYSTEM_MANAGER = require('./system-manager')

export const SystemUserManager = SYSTEM_MANAGER.USER_MANAGER
export const SystemRoleManager = SYSTEM_MANAGER.ROLE_MANAGER