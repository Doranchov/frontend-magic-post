import { ManagerAPI } from '@/api/user/ManagerAPI';

export const ManagerServices = {
    getGatheringStaff: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(ManagerAPI.LIST_GATHERING_STAFF(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getTransactionStaff: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(ManagerAPI.LIST_TRANSACTION_STAFF(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    createStaffAccount: async (user: any, data: any, httpJwt: any) => {
        return (
            await httpJwt.post(ManagerAPI.CREATE_STAFF, data, {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    editStaffAccount: async (user: any, data: any, staffId: any, httpJwt: any) => {
        return (
            await httpJwt.put(ManagerAPI.EDIT_STAFF(staffId), data, {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    deleteStaffAccount: async (user: any, staffId: any, httpJwt: any) => {
        return (
            await httpJwt.delete(ManagerAPI.EDIT_STAFF(staffId), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },
};
