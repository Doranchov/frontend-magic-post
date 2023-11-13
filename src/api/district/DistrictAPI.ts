export const DistrictAPI = {
    LIST: `/district/`,
    DISTRICT_BY_ID: (districtId: string) => `/district/${districtId}`,
    LIST_BY_PROVINCE_ID: (provinceId: string) => `/district/province/${provinceId}`,
};
