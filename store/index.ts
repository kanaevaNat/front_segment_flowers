import { defineStore } from 'pinia';

export const useStore = defineStore('index', {
    state: () => ({
        authorized: false,
        isPremium: false,
        isAdmin: false,
    }),
});
