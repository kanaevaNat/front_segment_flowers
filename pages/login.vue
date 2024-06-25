<template>
    <v-card>
        <template #title>
            Войти
        </template>
        <template #text>
            <v-row>
                <v-col cols="5">
                    <v-text-field v-model="login" type="email" label="Электронная почта"/>
                </v-col>
                <v-col cols="5">
                    <v-text-field v-model="password" type="password" label="Пароль"/>
                </v-col>
            </v-row>
        </template>
        <template #actions>
            <v-btn :disabled="!login || !password" @click="authorize()" variant="elevated">
                Войти
            </v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import type { User } from '~/types';

const login = ref<string | null>(null);
const password = ref<string | null>(null);
const isAuthorized = useCookie<User>('user');
const registered = useCookie<User>('registered');

const authorize = async () => {
    if (login.value === 'admin' && password.value === 'admin') {
        isAuthorized.value = {
            login: 'admin',
            firstName: 'Admin',
            role: 'admin',
        };
    }
    else if (registered.value?.login === login.value) {
        isAuthorized.value = registered.value;
    }

    location.reload();
};

if (isAuthorized.value) navigateTo('/');
</script>

<!--<style lang="scss" scoped>

</style>-->
