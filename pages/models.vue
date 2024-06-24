<template>
    <div class="models">
        <h1>
            Список моделей
        </h1>
        <v-data-table :headers :items hide-default-footer>
            <template #[`item.percent`]="{ item }">
                <template v-if="!item.percent">
                    -
                </template>
               <template v-else>
                   {{ item.percent }}%
               </template>
            </template>
            <template #[`item.error`]="{ item }">
                <template v-if="!item.error">
                    -
                </template>
                <template v-else>
                    {{ item.error }}
                </template>
            </template>
            <template #[`item.date`]="{ item }">
               {{ formatter.format(item.date) }}
            </template>
            <template #[`item.status`]="{ item }">
               <template v-if="item.status === 'educated'">
                   Обучена
               </template>
                <template v-else>
                    Обучается
                </template>
            </template>
            <template #[`item.default`]="{ item }">
                <v-radio :true-value="item.title" :false-value="false" :model-value="item.isDefault ? item.title : false" @input="$event && [items.forEach(x => x.isDefault = false), item.isDefault = true]"/>
            </template>
            <template #[`item.premium`]="{ item }">
                <v-checkbox style="justify-content: flex-start; grid-template-areas: none; grid-template-columns: none" v-model="item.isPremium"/>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts" setup>
interface Model {
    title: string;
    percent?: number;
    error?: number;
    date?: number;
    status: 'educated' | 'educating';
    isDefault: boolean;
    isPremium: boolean;
}

const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})

const headers = [
    {
        title: 'Название модели',
        value: 'title',
    },
    {
        title: 'Процент точности',
        value: 'percent',
    },
    {
        title: 'Ошибка',
        value: 'error',
    },
    {
        title: 'Дата создания',
        value: 'date',
    },
    {
        title: 'Статус',
        value: 'status',
    },
    {
        title: 'Default',
        value: 'default',
    },
    {
        title: 'Premium',
        value: 'premium',
    },
];

const items = reactive<Model[]>([
    {
        title: 'Модель 1',
        status: 'educating',
        date: Date.now(),
        isDefault: false,
        isPremium: true,
    },
    {
        title: 'Модель 2',
        status: 'educated',
        error: 228,
        percent: 85,
        date: Date.now(),
        isDefault: true,
        isPremium: false,
    },
]);
</script>

<!--<style lang="scss" scoped>

</style>-->
