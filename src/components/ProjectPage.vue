<template>
    <div class="pageContent__content">
        <preloader :loaded="loaded"/>
        <transition enter-active-class="animated fadeIn" name="contentFadeIn">
            <div class="project-page" v-if="loaded && project">
                <div class="project-page__area">
                    <div class="item" v-for="item in area">
                        <span :class="doesBelong(item.id)">
                            <a :href="'../' + projectsLink + item.slug">
                                <i :class="item.icon">
                                </i>
                            </a>
                        </span>
                    </div>
                </div>
                <div class="project-page__title">
                    {{project.title}}
                </div>
                <div class="project-page__description">
                    {{project.description}}
                </div>
                <div class="project-page__content">
                    <span v-html="project.content"></span>
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
        name: 'ProjectPage',
        data() {
            return {
                area: undefined,
                projectsLink: 'projekty/', //todo: make links depends on fe. language
                project: undefined,
                loadedProject: undefined,
                loadedAreas: undefined 
            }
        },
        mounted() {
            this.axios.get(this.$apiUrl + this.$projectsUrl + '?slug=' + this.$route.params.slug).then(response => {
                this.project = response.data[0];
                this.loadedProject = true; 
                }
            )
                .catch(() => this.project = []); //request for current project
            this.axios.get(this.$apiUrl + this.$areasUrl).then(response => {
                this.area = response.data;
                this.loadedAreas = true;
                }
            ); //request for areas
        },
        methods: {
            doesBelong(id) { //check if area belongs to project
                for (let i in this.project.areas) { //check every area
                    if (this.project.areas[i].id === id) { //if any area of project contains id === id
                        return 'active'; // return 'active' as class
                    }
                }
            }
        },
        computed: {
            loaded(){
                return this.loadedProject && this.loadedAreas;
            }
        }
    }
</script>