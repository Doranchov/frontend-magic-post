export const RoleAPI = {
    LIST: `/role/`,
    ROLE_BY_ID: (roleId: string) => `/role/${roleId}`,
    ROLE_BY_CODE: (roleCode: string) => `/role/code/${roleCode}`,
};
