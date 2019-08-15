<template>
    <ul class="menu">
        <li v-on:click="">{{aboutUs}}</li>
        <li v-on:click=" section = 'News' ">{{news}}</li>
        <li v-on:click=" section = 'Projects' ">{{projects}}</li>
        <li v-on:click="">{{study}}</li>
        <li v-on:click="">{{shop}}</li>
    </ul>

</template>

<script>
    export default {
        name: 'Menu',
        data: function () {
            return {
                aboutUs: 'O nas',
                news: 'Aktualności',
                projects: 'Projekty',
                study: 'Pomoce naukowe',
                shop: 'Sklep'
            }
        }
    }

</script>

<style lang="scss" scoped>


</style>