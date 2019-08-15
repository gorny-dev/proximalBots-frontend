<template>
    <div id="app">
        <div class="home" v-bind:class="{ homeStickyToTop: isStickyToTop}">

            <div class="home__title">
                <router-link to="/"><span @click="isStickyToTop = false">ProximalBots</span></router-link>
            </div>

            <div id="nav">
                <ul class="menu">
                    <li v-for="link in menu">
                        <router-link :to="'/' + link.slug">
                            <span @click="isStickyToTop = true">{{link.title}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <transition enter-active-class="animated fadeIn" name="contentFadeIn">
                <social v-if="!isStickyToTop"/>
            </transition>
            <div class="pageContent">

                <transition enter-active-class="animationEnter" leave-active-class="animationLeave" mode="out-in"
                            name="routerAnimation">
                    <router-view/>
                </transition>

            </div>

        </div>

    </div>
</template>

<script>

    import Social from "./views/Social";

    export default {

        components: {
            'social': Social,
        },

        data() {
            return {
                menu: {
                    about: {
                        title: 'O nas',
                        slug: 'o-nas'
                    },
                    news: {
                        title: 'Aktualnośći',
                        slug: 'aktualnosci'
                    },
                    projects: {
                        title: 'Projekty',
                        slug: 'projekty'
                    },
                    study: {
                        title: 'Pomoce naukowe',
                        slug: 'pomoce-naukowe'
                    },
                },
                isStickyToTop: false,
            }
        },
        mounted() {
            this.stickyToTop();
        },
        methods: {

            stickyToTop() {
                this.isStickyToTop = window.location.pathname !== '/';
            }
        }

    }

</script>