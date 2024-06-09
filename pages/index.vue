<template>
    <div>
        <v-card>
            <template #title>
                Сервис распознавания цветов
            </template>
            <template #subtitle>
                Замануха
            </template>
            <template #text>
                Какие мы крутые!
            </template>
        </v-card>
        <v-row class="mt-2">
            <v-col v-for="i in 3" :key="i" cols="4">
                <div class="image"/>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'index',
});
</script>

<style lang="scss" scoped>
.image {
    height: 300px;
    background: green;
}
</style>
