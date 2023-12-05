import { CustomerAPI } from '@/api/user/CustomerAPI';

export const CustomerServices = {
    getPackage: async (user: any, page: any, httpJwt: any) => {
        return (
            await httpJwt.get(CustomerAPI.LIST_PACKAGE(page), {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            })
        ).data;
    },
};
