<template>
    <div class="page">
        <header class="header">
            <v-container class="header_container">
                <v-btn variant="plain" to="/" class="header_logo">
                    <img alt="Логотип" src="@/assets/logo.png" width="64">
                </v-btn>
                <div class="header_user">
                    <template v-if="!store.authorized">
                        <div class="header_buttons">
                            <v-btn variant="flat" to="/login" color="primary">
                                Войти
                            </v-btn>
                            <v-btn to="/register">
                                Зарегистрироваться
                            </v-btn>
                        </div>
                    </template>
                    <v-menu v-else>
                        <template v-slot:activator="{ props }">
                            <div class="d-flex align-center">
                                <v-chip
                                    v-if="store.isPremium"
                                >
                                    Премиум
                                </v-chip>
                                <v-btn
                                    variant="text"
                                    v-bind="props"
                                    color="primary"
                                >
                                    <template #prepend>
                                        <v-icon>mdi-account</v-icon>
                                    </template>
                                    {{ store.user?.firstName }}
                                </v-btn>
                            </div>
                        </template>
                        <v-list>
                            <v-list-item @click="logout" value="">
                                <v-list-item-title>
                                    Выход
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-container>
            <div class="header_content">
                <div class="header_content_text">
                    Сервис по распознаванию цветов
                </div>
            </div>
        </header>
        <section class="header_nav bg-grey-darken-3">
            <v-tabs align-tabs="center" model-value="">
                <v-tab to="/">
                    Главная
                </v-tab>
                <v-tab to="/history">
                    История распознаваний
                </v-tab>
                <template v-if="!store.isAdmin">
                    <v-tab to="/detect">
                        Распознать
                    </v-tab>
                    <v-tab v-if="!store.isPremium">
                        Расширить возможности
                    </v-tab>
                </template>
                <template v-else>
                    <v-tab>
                        Пользователи
                    </v-tab>
                    <v-tab to="/create-model">
                        Обучение модели
                    </v-tab>
                    <v-tab to="/models">
                        Модели
                    </v-tab>
                </template>
            </v-tabs>
        </section>
        <v-container class="page_content">
            <slot/>
        </v-container>
        <v-footer class="d-flex bg-black justify-space-between">
            <span>Разработано студентами группы ПРИМ-122 Канаевой Натальей и Волковым Ильёй</span>
            <v-btn href="kanaeva.natashenka@mail.ru" variant="tonal">
                Связаться с нами
            </v-btn>
        </v-footer>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store';
import type { User } from '~/types';

const store = useStore();
const isAuthorized = useCookie<User>('user');

if(isAuthorized.value) store.user = isAuthorized.value

const logout = () => {
    useCookie('user').value = undefined;
    location.reload();
};
</script>

<style lang="scss" scoped>
.header {
    &_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        inset: 0;
        height: 56px;
    }

    &_logo {
        text-decoration: none;
    }

    &_content {
        display: flex;
        align-items: center;
        justify-content: center;
        background: url(@/assets/flower-bg.png) center / cover;
        height: 300px;
        color: #fff;
        font-size: 32px;
        font-weight: 600;
    }

    &_buttons {
        display: flex;
        gap: 8px;
    }
}

.page {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;

    &_content {
        flex: 1 0 auto;
    }

    .v-footer {
        flex: none !important;
    }
}
</style>
