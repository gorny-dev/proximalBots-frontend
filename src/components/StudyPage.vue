<template>
    <div class="pageContent__content">
        <preloader :loaded="loaded"/>
        <transition enter-active-class="animated fadeIn" name="contentFadeIn">
            <div class="study-page" v-if="loaded && task">
                <div class="study-page__title">
                    {{task.title}}
                </div>
                <div class="study-page__description">
                    {{task.description}}
                </div>
                <div class="study__menu">
                    <ul>
                        <li v-for="language in taskLanguages" @click="changeActiveLanguage(language.slug)">
                            <div class="content" :class="{active: language.slug===taskActiveLanguage}">
                                <i :class="language.icon"></i>
                                {{language.name}}
                            </div>
                        </li>
                    </ul>
                </div>
                <preloader :loaded="taskLoaded"/>
                <transition enter-active-class="animated fadeIn" name="contentFadeIn">
                    <div v-if="taskLoaded && taskActiveSolution">
                        <div class="study-page__editor" v-for="solution in taskActiveSolution.solutions">
                            <div class="title">
                                {{solution.text}}
                            </div>
                            <div class="description">
                                {{solution.description}}
                            </div>
                            <div class="editor">
                                <AceEditor
                                        :fontSize="15"
                                        :name="solution.text"
                                        :readOnly="true"
                                        :value="solution.editor.content"
                                        :mode="solution.editor.lang"
                                        theme="dracula"
                                        width="100%"
                                        height="700px"
                                />
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
    import Preloader from "../views/Preloader";
    import {Ace as AceEditor} from 'vue2-brace-editor';
    import 'brace/mode/c_cpp';
    import 'brace/mode/html';
    import 'brace/mode/java';
    import 'brace/mode/javascript';
    import 'brace/mode/php';
    import 'brace/mode/python';
    import 'brace/mode/css';
    import 'brace/theme/dracula';

    export default {
        name: 'StudyPage',
        components: {
            'preloader': Preloader,
            AceEditor,
        },
        data() {
            return {
                loaded: false,
                task: undefined,
                taskLoaded: true,
                taskLanguages: undefined,
                taskActiveLanguage: undefined,
                taskActiveSolution: undefined,
            }
        },
        created() {

        },
        mounted() {
            this.axios.get(this.$apiUrl + this.$tasksUrl + '?slug=' + this.$route.params.slug).then(response => {
                this.task = response.data[0];
                this.taskLanguages = this.task.content;
                setTimeout(() => {
                    this.loaded = true;
                }, this.$preloadTime);
            }); //request for tasks
        },
        methods: {
            changeActiveLanguage(slug) {
                this.taskLoaded = false;
                this.taskActiveLanguage = slug;
                for (let solution in this.task.content) {
                    if (this.taskActiveLanguage === solution) this.taskActiveSolution = this.task.content[solution];
                }
                setTimeout(() => {
                    this.taskLoaded = true;
                }, this.$preloadTime)
            },
        },
    }
</script>