'use strict'

class NavMenu {
    constructor({target, initialData, onMenu}) {
        this.$target = target;
        this.data = initialData;

        console.log('NavMunu: ', this.$target, this.data);
    }

    render = () => {

    }

    setData = (nextData) => {
        this.data = nextData;
        this.render();
        console.log('NavMunu: ', this.data);
    }
}

class MainContent {
    constructor({target, initialData}) {
        this.$target = target;
        this.data = initialData;

        const initEvent = () => {
            this.$target.addEventListener('click', () => {
                
            })
        }

        console.log('MainContent: ', this.$target, this.data);
    }

    render = () => {
        
    }

    setData = (nextData) => {
        this.data = nextData;
        this.render();
        console.log('MainContent: ', this.data);
    }
}

class App {
    constructor({target, initialData}) {
        this.$target = target;
        this.data = initialData;

        const getCurrentMenu = () => {

        }

        const initData = () => {
            const url = new URL(this.data.url);
            const params = new URLSearchParams(url.search);
            this.data.curContent = params.get('content');
        }

        this.navMenu = new NavMenu({
            target: this.$target.querySelector('.nav-menu'),
            initialData: {
                curContent: '',
            },
            onMenu: () => {
                const nextData = {
                    curContent: 'team',
                }

                this.setData(nextData);
            }
        });
        
        this.mainContent = new MainContent({
            target: this.$target.querySelector('.main-content'),
            initialData: {
                curContent: '',
            }
        });

        initData();
    }

    setData = (nextData) => {
        this.navMenu.setData(nextData);
        this.mainContent.setData(nextData);
        console.log('App: ', this.data);
    }
}

window.addEventListener('load', () => {
    new App({
        target: document.querySelector('.profile-container'),
        initialData: {
            url: window.location.href,
            curContent: '',
        }
    })
})