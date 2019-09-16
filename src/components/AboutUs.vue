<template>
    <div class="pageContent__content">
        <preloader :loaded="loaded"/>
        <transition enter-active-class="animated fadeIn" name="contentFadeIn">
            <div class="aboutUs" v-if="loaded">
                <div class="aboutUs__icons">
                    <div class="item" v-for="item in area">
                        <router-link :to="'/projekty/' + item.slug">
                            <i :class="item.icon"></i>
                            <p>{{item.name}}</p>
                        </router-link>
                    </div>
                </div>
                <div class="aboutUs__title">
                    Nasz zespół
                </div>
                <div class="aboutUs__lorem">
                    <p>Jesteśmy uczniami IV LO "Lotnik" w Zielonej Górze. Przez zamiłowanie do informatyki i elektroniki
                        zajęliśmy się tworzeniem prototypów robotów, a także programów sterujących ich działaniem.

                        Założyliśmy nasze koło, aby wspólnie realizować nasze marzenia. Staramy się również być
                        inspiracją
                        dla naszych rówieśników, chcemy pokazać, że każdy może zacząć majsterkować i tworzyć
                        skomplikowane
                        urządzenia.</p>
                </div>
                <div class="aboutUs__team">
                    <div class="item" v-for="item in team">
                        <div class="item__avatar" v-if="item.avatar">
                            <img v-lazy="apiUrl + item.avatar.url ">
                        </div>
                        <div class="item__wrapper">
                            <div class="item__line-wrapper">
                                <div class="item__text item__text--name">{{item.name}}</div>
                                <div class="socialIcons">
                                    <div class="socialIcons__item" v-for="social in item.social">
                                        <a :href="social.link">
                                            <i :class="social.icon"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="item__text item__text--state">{{item.function}}</div>
                            <div class="item__text item__text--description">{{item.description}}</div>
                            <div class="item__icons">
                                <div class="icons-item" v-for="icon in item.icons">
                                    <i :class="icon.icon"></i>
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
        name: 'AboutUs',
        data() {
            return {
                area: undefined,
                team: undefined,
                loadedAreas: false,
                loadedTeam: false,
                apiUrl: this.$apiUrl, //api URL for displaying avatars
            }
        },
        created() {
            setTimeout(() => {
                this.loaded = true;
            }, this.$preloadTime); //preload animation
        },
        mounted() {
            this.axios.get(this.$apiUrl + this.$areasUrl).then(response => {
                this.area = response.data;
                this.loadedAreas = true;
            }); //request for areas
            this.axios.get(this.$apiUrl + this.$teamUrl).then(response => {
                this.team = response.data;
                this.loadedTeam = true;
            }); //request for team
        },
        computed:{
            loaded(){
                return this.loadedAreas && this.loadedTeam;
            }
        }
    }
</script>
