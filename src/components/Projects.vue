<template>
    <div class="pageContent__content">
        <preloader :loaded="loaded"/>
        <transition enter-active-class="animated fadeIn" name="contentFadeIn">
            <div class="projects" v-if="loaded">
                <div class="projects__title">
                    Poznaj nasze projekty
                </div>
                <div class="projects__wrapper">
                    <div class="projects__menu">
                        <ul>
                            <li :class="{active: !categorySlug}" @click="routerPush()">
                                <i class="fa fa-stream"></i>
                                Wszystkie
                            </li>
                            <li :class="{active: categorySlug===item.slug}" @click="routerPush(item.slug)"
                                v-for="item in area">
                                <i :class="item.icon"></i>
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="projects__content">
                        <preloader :loaded="loadCategory"/>
                        <div class="animated fadeIn" v-if="loadCategory">
                            <div v-if="!categoryProjects[0]">
                                <div class="project py-3">
                                    Tutaj jeszcze nic nie ma.
                                </div>
                            </div>
                            <div v-else-if="projects">
                                <div class="project" v-for="project in categoryProjects">
                                    <div class="project__title">{{project.title}}
                                    </div>
                                    <div class="project__description">{{project.description}}</div>
                                    <div class="project__social">
                                        <router-link :to="{name: 'ProjectPage', params: {slug: project.slug}}">
                                            <div class="more">Poznaj szczegóły <i class="fas fa-search"></i></div>
                                        </router-link>
                                        <div class="icons">
                                            <div class="item" v-for="item in project.link_icon">
                                                <a :href="item.link"><i :class="item.icon"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Preloader from "../views/Preloader";
    export default {
        components: {
            'preloader': Preloader,
        },
        name: 'Projects',
        data() {
            return {
                categorySlug: undefined,
                loadCategory: false, //preloader param
                loaded: false, //preloader param
            }
        },
        created() {
            setTimeout(() => {
                this.loaded = true; //preload param
                this.loadCategory = true; //preload param
            }, this.$preloadTime); //preloader timeout animation
        },
        watch: {
            '$route.params': function () {
                this.loadCategory = false; //preloader param
                setTimeout(() => {
                    this.categorySlug = this.$route.params.area; //fire categoryProjects() computed
                    this.loadCategory = true; //preloader param
                }, this.$preloadTime); //preloader timeout animation
            }
        },
        mounted() {
            this.axios.get(this.$apiUrl + this.$projectsUrl).then(response => (this.projects = response.data)); //request for projects
            this.axios.get(this.$apiUrl + this.$areasUrl).then(response => (this.area = response.data)); //request for areas
            if (this.$route.params.area) this.categorySlug = this.$route.params.area; //fire categoryProjects() computed
        },
        computed: {
            categoryProjects() {
                let Projects = []; //an object to be returned
                let project_index = 0; //an index variable for Projects[]
                if (this.categorySlug) { //if exist category slug
                    this.projects.filter(project => { //filter projects (response from request)
                        for (let i in project.areas) { //checking all areas in project
                            if (project.areas[i].slug === this.categorySlug) { //if area of current project contains slug === this.categorySlug
                                Projects[project_index] = project; //push project to Projects
                                project_index++; //make index variable for Projects[] +1
                            }
                        }
                    });
                    return Projects; //return Projects into categoryProjects
                } else return this.projects; //if category slug does not exist return all projects from response to categoryProjects
            }
        },
        methods: {
            routerPush(slug) { //function called when clicked on any menu item, slug - slug of area that wanna be displayed
                //todo: make the router paths variables depends on fe. language
                if (slug && this.$route.params.area !== slug) this.$router.push('/projekty/' + slug); // if slug was given and it is not the current one push the param to path
                else if (!slug && this.$route.params.area) this.$router.push('/projekty'); //if slug was not given and the current one area is defined don't push param to path
            },
        }
    }
</script>