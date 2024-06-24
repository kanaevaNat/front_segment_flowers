<template>
    <div>
        <v-row>
            <v-col cols="6">
                <v-card>
                    <template #title>
                        Данный сервис поможет в вашем выборе
                    </template>
                    <template #text>
                        Наш сервис умеет производить выделение цветов с фото, вырезая маски, а также производить классификацию
                        этих цветов, чтобы вы могли самостоятельно определить, что за цветок перед вами, и получить справку об
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
            <v-col v-for="i in 3" :key="i" cols="4">
                <v-card>
                    <template #title>
                        <v-img :src="image" height="150px"/>
                    </template>
                    <template #text>
                        ААААААААААА
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import type { Model } from '~/types';

const file = shallowRef<File | null>(null);
const image = shallowRef<string | null>();
const loading = ref(false);
const loaded = ref(false);
const data = ref<null | {
    labels: {
        label: string
        index: number
        probability: number
    }[]
}>()

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

watch(loading, async (val) => {
    if (!val) return;

    const formData = new FormData()
    formData.set('file', file.value!);

    try {
       data.value = await $fetch(`/api/image/personified/${ models.data.value?.[0].name }`, {
            body: formData,
        });

        loaded.value = true;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
});

const models = await useAsyncData(async () => {
    return $fetch<Model[]>('/api/models');
});
</script>

<!--<style lang="scss" scoped>

</style>-->
