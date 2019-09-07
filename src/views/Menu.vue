<template>
    <div id="nav">
        <ul class="menu">
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
        }
    }
</script>