import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/DefaultLayout.vue'),
            children: [
                // home page
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/views/HomeView.vue'),
                },

                // admin routes
                {
                    path: 'admin/gathering',
                    children: [
                        {
                            path: 'account',
                            name: 'admin-gathering-account',
                            component: () => import('@/views/admin/ManageGatheringAccountView.vue'),
                        },

                        {
                            path: 'goods',
                            name: 'admin-gathering-goods',
                            component: () => import('@/views/admin/ManageGatheringGoodsView.vue'),
                        },
                    ],
                },

                {
                    path: 'admin/transaction',
                    children: [
                        {
                            path: 'account',
                            name: 'admin-transaction-account',
                            component: () => import('@/views/admin/ManageTransactionAccountView.vue'),
                        },

                        {
                            path: 'goods',
                            name: 'admin-transaction-goods',
                            component: () => import('@/views/admin/ManageTransactionGoodsView.vue'),
                        },
                    ],
                },

                // customer routes

                {
                    path: 'search',
                    name: 'search',
                    component: () => import('@/views/customer/SearchGoodsView.vue'),
                },

                // manager routes

                {
                    path: 'manage/gathering',
                    children: [
                        {
                            path: 'account',
                            name: 'manager-gathering-account',
                            component: () => import('@/views/manager/gathering/ManageAccountView.vue'),
                        },

                        {
                            path: 'goods',
                            name: 'manager-gathering-goods',
                            component: () => import('@/views/manager/gathering/ManageGoodsView.vue'),
                        },
                    ],
                },

                {
                    path: 'manage/transaction',
                    children: [
                        {
                            path: 'account',
                            name: 'manager-transaction-account',
                            component: () => import('@/views/manager/transaction/ManageAccountView.vue'),
                        },

                        {
                            path: 'goods',
                            name: 'manager-transaction-goods',
                            component: () => import('@/views/manager/transaction/ManageGoodsView.vue'),
                        },
                    ],
                },

                // staff routes

                {
                    path: 'staff/gathering',
                    children: [
                        {
                            path: 'goods',
                            name: 'staff-gathering-goods',
                            component: () => import('@/views/staff/gathering/OrderStats.vue'),
                        },

                        {
                            path: 'create-package',
                            name: 'staff-gathering-package',
                            component: () => import('@/views/staff/gathering/CreateGoodsView.vue'),
                        },
                    ],
                },

                {
                    path: 'staff/transaction',
                    children: [
                        {
                            path: 'goods',
                            name: 'staff-transaction-goods',
                            component: () => import('@/views/staff/transaction/OrderStats.vue'),
                        },

                        {
                            path: 'create-package',
                            name: 'staff-transaction-package',
                            component: () => import('@/views/staff/transaction/CreateGoodsView.vue'),
                        },
                    ],
                },

                // about page

                {
                    path: 'about',
                    name: 'about',
                    component: () => import('@/views/AboutView.vue'),
                },
            ],
        },
    ],
});

export default router;
