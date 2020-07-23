const { getCompleteUrl } = require('./url-helper')

module.exports = {
    USER_MANAGER: {
        LIST_API: getCompleteUrl('/system-manager/userManager/listApi'),
        DETAIL_API: getCompleteUrl('/system-manager/userManager/detailApi'),
        INSERT_API: getCompleteUrl('/system-manager/userManager/insertApi'),
        UPDATE_API: getCompleteUrl('/system-manager/userManager/updateApi'),
        REMOVE_API: getCompleteUrl('/system-manager/userManager/removeApi'),
    },
    ROLE_MANAGER: {
        LIST_API: getCompleteUrl('/system-manager/roleManager/listApi'),
        DETAIL_API: getCompleteUrl('/system-manager/roleManager/detailApi'),
        INSERT_API: getCompleteUrl('/system-manager/roleManager/insertApi'),
        UPDATE_API: getCompleteUrl('/system-manager/roleManager/updateApi'),
        REMOVE_API: getCompleteUrl('/system-manager/roleManager/removeApi'),
    },
}