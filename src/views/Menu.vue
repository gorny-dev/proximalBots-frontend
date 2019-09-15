<template>
    <div id="nav">
        <div :class="hamburgerClass">
            <button  @click="hamburgerClick('button')" :class="{active: hamburger}"></button>
        </div>
        <ul class="menu" :class="menuClass" @click="hamburgerClick()">
            <li v-for="link in menu">
                <router-link :to="'/' + link.slug">
                    <span @click="isStickyToTop = true">{{link.title}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
        data(){
            return{
                hamburger: false,
                url: undefined,
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
            }
        },
        methods: {
            hamburgerClick(source){
                if(this.url !== '/') source === 'button' ? this.hamburger = !this.hamburger : this.hamburger = false;
            }
        },
        mounted(){
            this.url = window.location.pathname;
        },
        computed: {
            hamburgerClass(){
                if(this.url === '/') return 'd-none';
                else return 'hamburger';
            },
            menuClass(){
               if(this.url === '/' || this.hamburger) return 'show';
            }
        },
        watch: {
            '$route': function() {
                this.url = window.location.pathname;
            }
        }
    }
</script>