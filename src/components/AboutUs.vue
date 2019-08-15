<template>
    <div class="pageContent__content">
        <div class="preloader" v-if="!loaded">
            <div class="preloader__item"></div>
            <div class="preloader__item"></div>
            <div class="preloader__item"></div>
            <div class="preloader__item"></div>
        </div>
        <transition enter-active-class="animated fadeIn" name="contentFadeIn">
            <div class="aboutUs" v-if="loaded">
                <div class="aboutUs__icons">
                    <div class="item" v-for="item in area">
                        <i :class="item.icon"></i>
                        <p>{{item.title}}</p>
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
                        <div class="item__avatar">
                            <img :src="item.avatar">
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
                            <div class="item__text item__text--state">{{item.state}}</div>
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

    export default {
        name: 'AboutUs',
        data() {
            return {
                area: {
                    arduino: {
                        title: 'Arduino',
                        icon: 'fas fa-car-battery',
                    },
                    games: {
                        title: 'Gry',
                        icon: 'fas fa-gamepad',
                    },
                    tournaments: {
                        title: 'Turnieje eSportowe',
                        icon: 'fas fa-trophy',
                    },
                    mobile: {
                        title: 'Aplikacje mobilne',
                        icon: 'fas fa-mobile',
                    },
                    websites: {
                        title: 'Strony internetowe',
                        icon: 'fas fa-globe-europe',
                    },
                    electrics: {
                        title: 'Elektronika',
                        icon: 'fas fa-plug',
                    },

                },
                team: {
                    1: {
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR95Ahbudl_KiZlmMVMh_9yVp9sNO_O-oJWO9Kgw410e85xPB0B',
                        name: 'Michał Korczak',
                        state: 'Programista',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum mollitia nam ratione. Autem beatae, cumque eaque eius eligendi, illum, impedit magni nam odio officiis possimus rem totam ut voluptatem.',
                        social: {
                            1: {
                                icon: 'fab fa-github',
                                link: 'http://github.com',
                            },
                            2: {
                                icon: 'fab fa-slack',
                                link: 'http://slack.com',
                            }
                        },
                        icons: {
                            1: {
                                icon: 'fab fa-js'
                            },
                            2: {
                                icon: 'fab fa-vuejs'
                            },
                            3: {
                                icon: 'fab fa-sass'
                            },
                        }
                    },
                    2: {
                        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR95Ahbudl_KiZlmMVMh_9yVp9sNO_O-oJWO9Kgw410e85xPB0B',
                        name: 'Jakub Korczak',
                        state: 'Technik',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab harum mollitia nam ratione. Autem beatae, cumque eaque eius eligendi, illum, impedit magni nam odio officiis possimus rem totam ut voluptatem.',
                        social: {
                            1: {
                                icon: 'fab fa-github',
                                link: 'http://github.com',
                            },
                            2: {
                                icon: 'fab fa-facebook-f',
                                link: 'http://slack.com',
                            }
                        },
                        icons: {
                            1: {
                                icon: 'fab fa-node-js'
                            },
                            2: {
                                icon: 'fab fa-laravel'
                            },
                            3: {
                                icon: 'fab fa-git'
                            },
                            4: {
                                icon: 'fab fa-html5'
                            },
                            5: {
                                icon: 'fab fa-symfony'
                            },

                        },
                    }

                },
                loaded: false,
            }
        },
        created() {
            setTimeout(() => {
                this.loaded = true;
            }, 500);
        }

    }
</script>
