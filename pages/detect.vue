<template>
    <div>
        <v-row>
            <v-col cols="6">
                <v-card>
                    <template #title>
                        Данный сервис поможет в вашем выборе
                    </template>
                    <template #text>
                        Наш сервис умеет производить выделение цветов с фото, вырезая маски, а также производить
                        классификацию
                        этих цветов, чтобы вы могли самостоятельно определить, что за цветок перед вами, и получить
                        справку об
                        этих растениях.
                    </template>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <template #title>
                        <v-icon
                            color="red"
                            icon="mdi-alert-circle-outline"
                        />
                        Функционал ограничен
                    </template>
                    <template #text>
                        Обратите внимание: без подписки премиум у вас ограниченное количество распознавание
                        и отсутствует функция выбора модели
                    </template>
                </v-card>
            </v-col>
        </v-row>
        <v-img class="mt-4" :src="image" v-if="image" :height="200"/>
        <v-file-input v-model="file" class="mt-4" label="Загрузите изображение для распознавания" accept="image/*"/>
        <div class="d-flex justify-center">
            <v-btn :disabled="!file" :loading="loading" @click="loading = true">
                Распознать
            </v-btn>
        </div>
        <v-row class="mt-2" v-if="image && loaded">
            <v-col cols="4">
                <v-card>
                    <template #title>
                        <v-img :src="image0" height="150px"/>
                    </template>
                    <template #text>
                        Роза
                    </template>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <template #title>
                        <v-img :src="image1" height="150px"/>
                    </template>
                    <template #text>
                        Подсолнух
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import type { Result } from '~/pages/history.vue';

const file = shallowRef<File | null>(null);
const image = shallowRef<string | null>();
const loading = ref(false);
const loaded = ref(false);

watch(file, async () => {
    if (!file.value) {
        image.value = null;
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
        image.value = reader.result as string;
    });
    reader.readAsDataURL(file.value);
});

const images = import.meta.glob('../assets/*.jpeg', { eager: true, import: 'default' });

const image0 = images['../assets/0.jpeg'] as string;
const image1 = images['../assets/1.jpeg'] as string;

watch(loading, async (val) => {
    if (!val) return;

    await new Promise(resolve => setTimeout(resolve, 1000 * 5));

    try {
        localStorage.setItem('history', JSON.stringify([
            {
                id: 1,
                user: 2,
                image: image.value!,
                date: Date.now(),
                result: [
                    image0,
                    image1,
                ],
                categories: ['Роза', 'Подсолнух'],
            },
        ]));

        loaded.value = true;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        loading.value = false;
    }
});
</script>

<!--<style lang="scss" scoped>

</style>-->
