<template>
    <div class="pageContent__content">
        <preloader :loaded="loaded"/>
        <transition enter-active-class="animated fadeIn" name="contentFadeIn">
            <div class="study" v-if="loaded">
                <div class="study-page__title">
                    Wybierz algorytm
                </div>
                <div class="study__wrapper " >
                    <div class="study__taskList animated fadeIn" v-if="loaded">
                        <ul>
                            <li v-for="item in tasks">
                                <router-link :to="{name: 'StudyPage', params: {slug: item.slug}}">
                                    {{item.title}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <router-view/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Preloader from "../views/Preloader";

    export default {
        name: 'Study',
        components: {
            'preloader': Preloader,
        },
        data() {
            return {
                loaded: false,
                tasks: undefined,
            }
        },
        mounted() {
            this.axios.get(this.$apiUrl + this.$tasksUrl).then(response => {
                this.tasks = response.data;
                setTimeout(() => {
                    this.loaded = true;
                }, this.$preloadTime);
                }); //request for tasks
        },
    }
</script>
