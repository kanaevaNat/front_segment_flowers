<template>
    <div class="page">
        <header class="header">
            <v-container class="header_container">
                <v-btn variant="plain" to="/" class="header_logo">
                    Лого)
                </v-btn>
                <div class="header_user">
                    <template v-if="!store.authorized">
                        <div class="header_buttons">
                            <v-btn variant="tonal" to="/login">
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
                                    icon="mdi-account"
                                />
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
                    Какие мы крутые
                </div>
            </div>
        </header>
        <section class="header_nav bg-grey-darken-3">
            <v-tabs align-tabs="center" model-value="">
                <template v-if="!store.isAdmin">
                    <v-tab to="/detect">
                        Распознать
                    </v-tab>
                    <v-tab v-if="!store.isPremium">
                        Расширить возможности
                    </v-tab>
                    <v-tab v-else>
                        История распознаваний
                    </v-tab>
                </template>
                <template v-else>
                    <v-tab>
                        Пользователи
                    </v-tab>
                    <v-tab to="/create-model">
                        Обучение модели
                    </v-tab>
                    <v-tab>
                        История распознаваний
                    </v-tab>
                    <v-tab to="/models">
                        Модели
                    </v-tab>
                </template>
            </v-tabs>
        </section>
        <v-container>
            <slot/>
        </v-container>
        <v-footer class="d-flex bg-black justify-space-between">
            <span>Разработали дебилы</span>
            <v-btn href="mailto:yandex@yandex.ru" variant="tonal">
                Связаться с нами
            </v-btn>
        </v-footer>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store';

const store = useStore();

store.authorized = !!useCookie('authorized').value;
store.isAdmin = !!useCookie('admin').value;
store.isPremium = !!useCookie('premium').value;

const logout = () => {
    useCookie('authorized').value = undefined;
    useCookie('admin').value = undefined;
    useCookie('premium').value = undefined;
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
    }

    &_content {
        display: flex;
        align-items: center;
        justify-content: center;
        background: green;
        height: 300px;
    }

    &_buttons {
        display: flex;
        gap: 8px;
    }
}
</style>
