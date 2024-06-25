<template>
    <div class="models">
        <h1>
            История распознаваний
        </h1>
        <v-data-table :headers :items hide-default-footer>
            <template #[`item.image`]="{ item }">
                <a class="pa-2" :href="item.image" target="_blank">
                    <v-img :src="item.image"/>
                </a>
            </template>
            <template #[`item.date`]="{ item }">
                {{ formatter.format(item.date) }}
            </template>
            <template #[`item.result`]="{ item }">
                <div class="d-flex flex-wrap" style="gap: 8px;">
                    <a class="pa-2" :href="image" target="_blank" v-for="(image, index) in item.result" :key="index">
                        <v-img :src="image" :width="100"/>
                    </a>
                </div>
            </template>
            <template #[`item.categories`]="{ item }">
                {{ item.categories.join(', ') }}
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts" setup>
export interface Result {
    id: number;
    user: number;
    image: string;
    date: number;
    result: string[];
    categories: string[];
}

const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

const headers = [
    {
        title: 'ID распознавания',
        value: 'id',
    },
    {
        title: 'ID пользователя',
        value: 'user',
    },
    {
        title: 'Вход. картинка',
        value: 'image',
    },
    {
        title: 'Дата создания',
        value: 'date',
    },
    {
        title: 'Результат',
        value: 'result',
    },
    {
        title: 'Категории',
        value: 'categories',
    },
];

const items = typeof window === 'undefined' ? [] : JSON.parse(localStorage.getItem('history') ?? '[]');
</script>

<!--<style lang="scss" scoped>

</style>-->
