<template>
    <v-card>
        <template #title>
            Обучение модели
        </template>
        <template #text>
            <v-text-field v-model="text" label="Название модели"/>
            <v-file-input v-model="file" label="Загрузить датасет"/>
            <v-number-input
                label="Batch size"
                v-model="batch"
                :error-messages="isBatchInvalid ? ['Число должно быть кратно степени двойки'] : []"
            />
            <v-number-input
                label="Количество эпох"
                v-model="epoch"
            />
            <v-select v-model="select" :items="['VGG-16', 'VGG-19']" label="Классификатор" clearable/>
        </template>
        <template #actions>
            <v-btn
                @click="submit"
                variant="elevated"
                :disabled="!text || !file || !batch || isBatchInvalid || !epoch || !select"
            >
                Создать и обучить
            </v-btn>
        </template>
    </v-card>
</template>

<script lang="ts" setup>
import { VNumberInput } from 'vuetify/labs/VNumberInput';

const text = ref('');
const batch = ref(0);
const epoch = ref(0);
const select = ref<string | null>(null);
const file = shallowRef<null | File>(null);
const isBatchInvalid = computed(() => batch.value && (batch.value & (batch.value - 1)) !== 0);

const submit = async () => {
    const formData = new FormData();
    formData.set('file', file.value!);
    formData.set('name', text.value);
    formData.set('batch', batch.value.toString());
    formData.set('epoch', epoch.value.toString());
    formData.set('select', select.value?.toString() ?? '');

    await $fetch(`/model/train`, {
        body: formData,
    });

    navigateTo('/models');
};
</script>

<!--<style lang="scss" scoped>

</style>-->
