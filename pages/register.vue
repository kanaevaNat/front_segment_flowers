<template>
    <v-card>
        <template #title>
            Регистрация
        </template>
        <template #text>
            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="firstName" label="Ваше имя"/>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="login" type="email" label="Электронная почта"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="password" name="password" type="password" label="Пароль"/>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="confirmPassword" type="password" label="Повторите пароль"/>
                </v-col>
            </v-row>
        </template>
        <template #actions>
            <v-btn
                :disabled="!firstName || !login || !password || password !== confirmPassword"
                @click="authorize()"
                variant="elevated"
            >
                Зарегистрироваться
            </v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import type { User, UserRole } from '~/types';

const login = ref<string | null>(null);
const firstName = ref<string | null>(null);
const password = ref<string | null>(null);
const confirmPassword = ref<string | null>(null);
const isAuthorized = useCookie('authorized');

const authorize = async () => {
    useCookie<User>('registered').value = {
        login: login.value!,
        firstName: firstName.value!,
        role: 'user',
    }
    navigateTo('/login')
};

if (isAuthorized.value) navigateTo('/');
</script>

<!--<style lang="scss" scoped>

</style>-->
