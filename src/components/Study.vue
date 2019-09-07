<template>
    <div class="pageContent__content">
        <preloader :loaded="loaded"/>
        <transition enter-active-class="animated fadeIn" name="contentFadeIn">
            <div class="study" v-if="loaded">
                <div class="study__menu">
                    <ul>
                        <li v-for="category in tasksCategories">
                            <router-link :to="{name: 'Study', params: {slug: category.slug}}">
                                <i :class="category.icon"></i>{{category.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="study__wrapper " >
                    <preloader :loaded="loadedTasks"/>
                    <div class="study__taskList animated fadeIn" v-if="loadedTasks">
                        <ul v-if="loadedTasks">
                            <li v-for="item in categoryTasks">
                                <router-link :to="{name: 'StudyPage', params: {slug: item.slug}}">
                                    {{item.title}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <router-view/>
                    <!--                    <div class="study__content">-->
                    <!--                        {{Task}}-->
                    <!--                        <div v-if="Task">-->
                    <!--                            <div class="title">{{task.title}}</div>-->
                    <!--                            <div class="title&#45;&#45;sm">-->
                    <!--                            </div>-->
                    <!--                            &lt;!&ndash;                        tutaj powinien być for... ale coż... życie... &ndash;&gt;-->

                    <!--                            <div class="description">-->
                    <!--                                {{Task.sol1_text}}-->
                    <!--                            </div>-->
                    <!--                            <div class="content">-->
                    <!--                                <editor @init="editorInit" height="500" lang="c_cpp" readOnly="true" ref="editor1"-->
                    <!--                                        theme="twilight" v-model="task.sol1_editor"-->
                    <!--                                        width="100%"></editor>-->
                    <!--                            </div>-->


                    <!--                        </div>-->


                    <!--                    </div>-->

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
                loadedTasks: true,
                tasks: undefined,
                tasksCategories: undefined,
                categorySlug: undefined,
                currentTaskSlug: 'maksymalna-wartosc-w-tablicy',
            }
        },
        created() {
            setTimeout(() => {
                this.loaded = true;
            }, 500);
        },
        watch: {
            '$route.params': function () {
                this.categorySlug = this.$route.params.slug;
                this.loadedTasks = false;
                setTimeout(() => {
                    this.loadedTasks = true;
                }, this.$preloadTime);
            }
        },
        computed: {
            categoryTasks() {
                let Tasks = []; //an object to be returned
                let task_index = 0; //an index variable for Projects[]
                if (this.categorySlug) { //if exist category slug
                    this.tasks.filter(task => { //filter projects (response from request)
                        for (let i in task.taskscategories) { //checking all areas in project
                            if (task.taskscategories[i].slug === this.categorySlug) { //if area of current project contains slug === this.categorySlug
                                Tasks[task_index] = task; //push project to Projects
                                task_index++; //make index variable for Projects[] +1
                            }
                        }
                    });
                }
                return Tasks; //return Projects into categoryProjects
            }
        },
        mounted() {
            this.axios.get(this.$apiUrl + this.$tasksUrl).then(response => (this.tasks = response.data)); //request for tasks
            this.axios.get(this.$apiUrl + this.$tasksCategoriesUrl).then(response => (this.tasksCategories = response.data)); //request for tasks categories
            if (this.$route.params.slug) this.categorySlug = this.$route.params.slug;
        },
    }
</script>
