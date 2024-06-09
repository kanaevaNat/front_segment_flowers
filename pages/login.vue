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
const isAuthorized = useCookie('authorized');

const authorize = async () => {
    const data = await $fetch<User>('/api/login', {
        method: 'POST',
        body: {
            login: login.value,
            password: password.value,
        },
    });

    if (data.role === 'admin') useCookie('admin').value = 'true';
    if (data.role === 'premium') useCookie('premium').value = 'true';

    useCookie('token').value = data.access_token;
    isAuthorized.value = 'true';
    location.reload();
};

if (isAuthorized.value) navigateTo('/');
</script>

<!--<style lang="scss" scoped>

</style>-->
