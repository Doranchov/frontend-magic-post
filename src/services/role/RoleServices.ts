import { http } from '@/utils/http';
import { RoleAPI } from '@/api/role/RoleAPI';

export const RoleServices = {
    getAll: async () => {
        const responseData = (await http.get(RoleAPI.LIST)).data.data;
        return responseData;
    },

    getRoleById: async (roleId: any) => {
        const responseData = (await http.get(RoleAPI.ROLE_BY_ID(roleId))).data.data;
        return responseData;
    },

    getRoleByCode: async (roleCode: any) => {
        const responseData = (await http.get(RoleAPI.ROLE_BY_CODE(roleCode))).data.data;
        return responseData;
    },
};
