import { http } from '@/utils/http';
import { RoleAPI } from '@/api/role/RoleAPI';

export const RoleServices = {
    // getAll: async () => {
    //     return (await http.get(RoleAPI.LIST)).data.data;
    // },

    getRoleById: async (roleId: any) => {
        return (await http.get(RoleAPI.ROLE_BY_ID(roleId))).data.data;
    },

    // getRoleByCode: async (roleCode: any) => {
    //     return (await http.get(RoleAPI.ROLE_BY_CODE(roleCode))).data.data;
    // },
};
