import { defineStore } from 'pinia';
import type { User } from '~/types';

export const useStore = defineStore('index', {
    state: () => ({
        user: null as User | null,
    }),
    getters: {
        authorized(): boolean {
            return !!this.user
        },
        isPremium(): boolean {
            return (this.user?.role === 'premium')
        },
        isAdmin(): boolean {
            return (this.user?.role === 'admin')
        }
    }
});
