export const CustomerAPI = {
    LIST_PACKAGE_BY_PHONE: (page: any, phone: any) => `/user/customer/search-order?page=${page}&phone=${phone}`,
    PACKAGE_BY_CODE: (code: any) => `/user/customer/search-order?code=${code}`,
};
