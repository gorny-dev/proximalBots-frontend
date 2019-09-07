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
                            <a href=" " target="_blank">
                                <div class="content__wrapper">
                                    <div
                                            class="content__picture">
                                        <img v-lazy="post.full_picture">

                                    </div>
                                    <div class="date">{{post.created_time | moment("dddd, MMMM Do YYYY, h:mm") }}</div>

                                    <div class="title">
                                        <!--                                    wyświetla tylko pierwsze zdanie-->
                                        <span v-for="word in post.message.split('.').slice(0,1)">
                                    {{word}}
                                     </span>
                                        <div class="title--sm">
                                        <span v-for="word in post.message.split('.').slice(1,40)">
                                            {{word}}
                                        </span>
                                        </div>
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
            <!--            <div class="preloader" v-if="showLoading">-->
            <!--                <div class="preloader__item"></div>-->
            <!--                <div class="preloader__item"></div>-->
            <!--                <div class="preloader__item"></div>-->
            <!--                <div class="preloader__item"></div>-->
            <!--            </div>-->
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
                posts: [],
                loaded: false,
                limitNumber: 6,
                scrolled: false,
                showLoading: true,
            }
        },
        mounted() {
            axios
                .get('https://graph.facebook.com/turniejlotnik/feed?fields=id,created_time,message,full_picture,comments&access_token=EAAj8O2D3ULIBAC5ALBXl6VZA2a9E8zYITPJnKDUTZCx3M8C2Ig1jZCxHEY68HQNrl69lcgXZCZAlrPxXeBayyB0PtF7xuCZBayunsCoAJo68XJTZBZB1u0fJtgBb4zo1tomXTvatxGipd5uHo8oP7DszfMKyMJiB29EE6tLQUeFK1xEtDca0126g4FvcM9feVTT8o1AMufh4G9wbXf9V3q3i')
                .then(response => (this.posts = response.data.data))
        },
        created() {
            setTimeout(() => {
                this.loaded = true;
            }, 500);
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        computed: {
            getPosts: function () {
                return this.posts.filter(function (u) {
                    return u.message
                }).slice(0, this.limitNumber)
            },
            getAmountOfPosts: function () {
                return this.posts.length;
            }
        },
        methods: {
            handleScroll() {
                let scrollPos = document.getElementById('js-news-wrapper').scrollTop;
                let winHeight = document.getElementById('js-news-wrapper').offsetHeight;
                let docHeight = document.getElementById('js-news-wrapper').scrollHeight;
                let perc = 100 * scrollPos / (docHeight - winHeight);
                if (perc > 99) {
                    if (this.limitNumber < this.getAmountOfPosts) this.limitNumber += 3;
                    else this.showLoading = false;
                }


            },
        }
    }

</script>