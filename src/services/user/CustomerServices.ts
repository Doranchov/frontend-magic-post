import { CustomerAPI } from '@/api/user/CustomerAPI';

export const CustomerServices = {
    getPackageByPhone: async (user: any, page: any, phone: any, httpJwt: any) => {
        return (
            await httpJwt.get(CustomerAPI.LIST_PACKAGE_BY_PHONE(page, phone), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },

    getPackageByCode: async (user: any, code: any, httpJwt: any) => {
        return (
            await httpJwt.get(CustomerAPI.PACKAGE_BY_CODE(code), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },
};
