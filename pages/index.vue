<template>
    <div>
        <v-card>
            <template #title>
                Сервис распознавания цветов
            </template>
            <template #subtitle>
                Данный сервис поможет в вашем выборе
            </template>
            <template #text>
                Наш сервис умеет производить выделение цветов с фото, вырезая маски, а также производить классификацию
                этих цветов, чтобы вы могли самостоятельно определить, что за цветок перед вами, и получить справку об
                этих растениях.
            </template>
        </v-card>
        <v-row class="mt-2">
            <v-col v-for="i in 3" :key="i" cols="4">
                <div class="image">
                    <v-img :src="images[`../assets/home${i}.png`]"/>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'index',
});

const images = import.meta.glob('../assets/home*.png', {eager: true, import: 'default'}) as Record<string, string>
</script>

<style lang="scss" scoped>
.image {
    border-radius: 10px;
}
</style>
