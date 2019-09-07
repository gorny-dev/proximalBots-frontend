<template>
    <div class="preloader" v-if="!loaded">
        <div class="preloader__item"></div>
        <div class="preloader__item"></div>
        <div class="preloader__item"></div>
        <div class="preloader__item"></div>
    </div>
</template>

<script>
    export default{
        props: ['loaded'],
        name: 'Preloader',
    }
</script>