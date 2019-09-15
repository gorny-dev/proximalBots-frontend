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
<!--        <div class="menu-icons__item">-->
<!--            <div @mouseenter="showSupportUs=true" @mouseleave="showSupportUs=false">-->
<!--                <i class="fas fa-donate animated fadeIn"></i>-->
<!--                <span :class="{fadeIn: showSupportUs, 'd-none': !showSupportUs}" class="animated">-->
<!--                     Wesprzyj nas-->
<!--                    </span>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="menu-icons__item">-->
<!--            <div @mouseenter="showCookiesInfo=true" @mouseleave="showCookiesInfo=false">-->
<!--                <i class="fas fa-cookie-bite animated fadeIn"></i>-->
<!--                <span :class="{fadeIn: showCookiesInfo, 'd-none': !showCookiesInfo}" class="animated">-->
<!--                     Używamy cookies.-->
<!--                    </span>-->
<!--            </div>-->
<!--        </div>-->

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

            if(this.$session.exists() && this.$session.has('theme')){
                if(this.$session.get('theme') === 'light') this.colorSwitch('light');
                else if (this.$session.get('theme') === 'dark') this.colorSwitch('dark');
            }
            else this.colorSwitch(this.checkHour());
        },
        methods: {
            checkHour() {
                let hour = new Date().getHours();
                if (hour > 21 || hour < 5) return 'dark';
                return 'light';
            },
            //todo: add colors in some config file
            setLight(){
                let style = document.documentElement.style;
                this.$session.set('theme','dark');
                style.setProperty('--basecolor', '#009abd');
                style.setProperty('--background', '#222');
                style.setProperty('--primary', '#efefef');
            },
            setDark(){
                let style = document.documentElement.style;
                this.$session.set('theme','light');
                style.setProperty('--basecolor', '#025e73');
                style.setProperty('--background', '#fff');
                style.setProperty('--primary', '#343434');
            },
            colorSwitch(color) {
                this.colorMode = color;
                if (this.colorMode === 'dark') this.setLight();
                else if (this.colorMode === 'light') this.setDark();
            }
        }
    }
</script>