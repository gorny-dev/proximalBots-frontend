<template>
    <div class="pageContent__content">
        <preloader :loaded="loaded"/>
        <transition enter-active-class="animated fadeIn" name="contentFadeIn">
            <div class="news" v-if="loaded">
                <div class="news__title">
                    Bądź z nami na bieżąco
                </div>
                <div @scroll="handleScroll" class="news__wrapper" id="js-news-wrapper">
                    <div class="news__item" v-for="post in getPosts">
                        <div class="content animated fadeIn">
                            <a :href="post.link" target="_blank">
                                <div class="content__wrapper">
                                    <div class="content__picture">
                                        <img v-lazy="post.photo">
                                    </div>
                                    <div class="date">{{post.created_at | moment("dddd, MMMM Do YYYY, h:mm") }}</div>
                                    <div class="title">
                                        {{post.title}}
                                    </div>
                                    <div class="icons">
                                        Zobacz więcej: <i class="fab fa-facebook-square"></i>
                                    </div>
                                </div>
                            </a>
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
        name: 'News',
        components:{
            'preloader': Preloader,
        },
        data() {
            return {
                posts: undefined,
                loaded: false,
                limitNumber: 6,
                scrolled: false,
                showLoading: true,
            }
        },
        mounted() {
            this.axios.get(this.$apiUrl + this.$postUrl).then(response => (this.posts = response.data)); //request for projects
        },
        created() {
            setTimeout(() => {
                this.loaded = true;
            }, this.$preloadTime);
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        computed: {
            getPosts(){
                return this.posts.slice(0, this.limitNumber)
            },
            getAmountOfPosts(){
                return this.posts.length;
            }
        },
        methods: {
            handleScroll() {
                let scrollPos = document.getElementById('js-news-wrapper').scrollTop;
                let winHeight = document.getElementById('js-news-wrapper').offsetHeight;
                let docHeight = document.getElementById('js-news-wrapper').scrollHeight;
                let percent = 100 * scrollPos / (docHeight - winHeight);
                if (percent > 99) {
                    if (this.limitNumber < this.getAmountOfPosts) this.limitNumber += 3;
                    else this.showLoading = false;
                }
            },
        }
    }

</script>