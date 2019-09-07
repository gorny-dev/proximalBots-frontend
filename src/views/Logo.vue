<template>
    <div class="home__title">
        <router-link to="/"><span @click="isStickyToTop = false">ProximalBots</span></router-link>
    </div>
</template>
<script>
    export default {
        name: 'Logo'
    }
</script>