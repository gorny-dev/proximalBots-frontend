<template>
    <div id="app">
        <div :class="{ homeStickyToTop: isStickyToTop}" class="home">
            <transition enter-active-class="animated fadeIn">
                <div>
                    <logo />
                    <navigation />
                    <social v-if="!isStickyToTop" />
                </div>
            </transition>
            <div class="pageContent">
                <transition enter-active-class="animationEnter" leave-active-class="animationLeave" mode="out-in"
                            name="routerAnimation">
                    <router-view />
                </transition>
            </div>
            <transition enter-active-class="animated fadeIn">
                <menu-icons />
            </transition>
        </div>
    </div>
</template>

<script>
    import Social from "./views/Social";
    import Menu from "./views/Menu";
    import MenuIcons from "./views/MenuIcons";
    import Logo from "./views/Logo";
    export default {
        components: {
            'social': Social,
            'navigation': Menu, //nice to know the <menu> tag in HTML :)
            'logo': Logo,
            'menu-icons': MenuIcons
        },
        data() {
            return {
                isStickyToTop: false,
            }
        },
        mounted() {
            this.stickyToTop();
        },
        watch: {
            '$route.params': function () {
                this.stickyToTop();
            }
        },
        methods: {
            stickyToTop() {
                this.isStickyToTop = window.location.pathname !== '/';
            },
        }
    }
</script>