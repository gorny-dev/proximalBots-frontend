<template>
    <div class="pageContent__content">
        <preloader :loaded="loaded"/>
        <transition enter-active-class="animated fadeIn" name="contentFadeIn">
            <div class="study-page" v-if="loaded">
                <div class="study__menu">
                    <ul>
                        <li v-for="category in tasksCategories">
                            <router-link :to="{name: 'Study', params: {slug: category.slug}}">
                                <i :class="category.icon"></i>{{category.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="study-page__title">
                    {{task.title}}
                </div>
                <div class="study-page__description">
                    {{task.titleSm}}
                </div>
                <div class="study-page__editor" v-for="editor in task.content">
                    <div class="title">
                        {{editor.text}}
                    </div>
                    <div class="description">
                        {{editor.description}}
                    </div>
                    <div class="editor">
                        <AceEditor
                                :fontSize="14"
                                :highlightActiveLine="true"
                                :name="editor.text"
                                :readOnly="true"
                                :showGutter="true"
                                :showPrintMargin="true"
                                :value="editor.editor"
                                :mode="editor.mode"
                                theme="dracula"
                                width="100%"
                        />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Preloader from "../views/Preloader";
    import brace from 'brace';
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
                tasksCategories: undefined,
            }
        },
        created() {
            setTimeout(() => {
                this.loaded = true;
            }, this.$preloadTime);
        },
        mounted() {
            this.axios.get(this.$apiUrl + this.$tasksUrl + '?slug=' + this.$route.params.slug).then(response => (this.task = response.data[0])); //request for tasks
            this.axios.get(this.$apiUrl + this.$tasksCategoriesUrl).then(response => (this.tasksCategories = response.data)); //request for tasks categories

        },
        methods: {
            editorInit: function () {
                //required for editor
                require('brace/ext/language_tools');
                require('brace/mode/c_cpp');
                require('brace/theme/twilight');
                require('brace/snippets/javascript');

                if (this.$refs.editor1.editor) this.$refs.editor1.editor.setOption("readOnly", true);

            },
        }
    }
</script>