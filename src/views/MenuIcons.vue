<template>
    <div class="menu-icons">
        <div class="menu-icons__item">
            <div @click="colorSwitch('dark')" @mouseenter="showColorProp=true"
                 @mouseleave="showColorProp=false"
                 v-if="colorMode != 'dark'">
                <i class="fas fa-moon animated fadeIn"></i>
                <span :class="{fadeIn: showColorProp, 'd-none': !showColorProp}" class="animated">
                     Tryb ciemny
                    </span>
            </div>
            <div @click="colorSwitch('light')" @mouseenter="showColorProp=true"
                 @mouseleave="showColorProp=false"
                 v-if="colorMode != 'light'">
                <i class="fas fa-sun animated fadeIn"></i>
                <span :class="{fadeIn: showColorProp, 'd-none': !showColorProp}" class="animated">
                     Tryb jasny
                    </span>
            </div>
        </div>
        <div class="menu-icons__item">
            <div @mouseenter="showSupportUs=true" @mouseleave="showSupportUs=false">
                <i class="fas fa-donate animated fadeIn"></i>
                <span :class="{fadeIn: showSupportUs, 'd-none': !showSupportUs}" class="animated">
                     Wesprzyj nas
                    </span>
            </div>
        </div>
        <div class="menu-icons__item">
            <div @mouseenter="showCookiesInfo=true" @mouseleave="showCookiesInfo=false">
                <i class="fas fa-cookie-bite animated fadeIn"></i>
                <span :class="{fadeIn: showCookiesInfo, 'd-none': !showCookiesInfo}" class="animated">
                     Używamy cookies.
                    </span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'MenuIcons',
        data(){
            return{
                colorMode: 'light',
                showColorProp: false,
                showCookiesInfo: false,
                showSupportUs: false,
            }
        },
        mounted(){
            this.colorSwitch(this.checkHour());
        },
        methods: {
            checkHour() {
                var hour = new Date().getHours();
                if (hour > 21 || hour < 5) return 'dark';
                return 'light';
            },

            //todo: dodać kolory do wyboru w config-file jakims

            colorSwitch(color) {
                this.colorMode = color;
                var style = document.documentElement.style;
                if (this.colorMode == 'dark') {
                    style.setProperty('--basecolor', '#009abd');
                    style.setProperty('--background', '#222');
                    style.setProperty('--primary', '#efefef');
                } else if (this.colorMode == 'light') {
                    style.setProperty('--basecolor', '#025e73');
                    style.setProperty('--background', '#fff');
                    style.setProperty('--primary', '#343434');
                }
            }
        }
    }
</script>