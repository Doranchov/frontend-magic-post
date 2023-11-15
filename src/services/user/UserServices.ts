import { UserAPI } from '@/api/user/UserAPI';

export const UserServices = {
    update: async (user: any, data: any, httpJwt: any) => {
        await httpJwt.put(UserAPI.UPDATE(user._id), data, {
            headers: {
                token: `Bearer ${user.accessToken}`,
            },
        });
    },

    // admin role
    getGatheringManager: async (user: any, httpJwt: any) => {
        return (
            await httpJwt.get(UserAPI.LIST_GATHERING_MANAGER_ACCOUNT, {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data.data;
    },

    getTransactionManager: async (user: any, httpJwt: any) => {
        return (
            await httpJwt.get(UserAPI.LIST_TRANSACTION_MANAGER_ACCOUNT, {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data.data;
    },

    createManagerAccount: async (user: any, data: any, httpJwt: any) => {
        await httpJwt.post(UserAPI.CREATE_MANAGER, data, {
            headers: {
                token: `Bearer ${user.accessToken}`,
            },
        });
    },

    updateManagerAccount: async (user: any, data: any, httpJwt: any, managerId: any) => {
        await httpJwt.put(UserAPI.UPDATE_MANAGER(managerId), data, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
    },

    deleteManagerAccount: async (user: any, data: any, httpJwt: any, managerId: any) => {
        await httpJwt.delete(UserAPI.DELETE_MANAGER(managerId), data, {
            headers: {
                token: `Bearer ${user.accessToken}`,
            },
        });
    },
};
