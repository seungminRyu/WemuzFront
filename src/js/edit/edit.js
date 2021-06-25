class App {
    constructor({target, initialData}) {
        this.$target = target;
        this.data = initialData;
        this.elements = {
            $submitBtn: this.$target.querySelector('.submit-btn'),
        }
        this.components = {
            name: 'name component',
            alias: 'alias component',
            activityArea: 'activity-area component',
            birthData: 'birthData component',
            introduce: 'introduce component',
            position: 'position component',
            genre: 'genre component',
            links: 'links component',
        }

        this.initEvent();
    }

    initSubmitBtnEvent() {
        const loopComponents = () => {
            Object.keys(this.components).forEach(name => {
                console.log(this.components[name]);
            });
        }

        const checkAvailable = () => {
            let isAvailable = true;
            loopComponents();

            return false;
        }

        const onSubmitBtn = (e) => {
            const isAvailable = checkAvailable() ? true : false;
            
            if (!isAvailable) {
                e.preventDefault();
                console.log('불만족');
            }
        }

        this.elements.$submitBtn.addEventListener('click', onSubmitBtn);
    }

    initEvent() {
        this.initSubmitBtnEvent();
    }
}

window.addEventListener('load', () => {
    new App({
        target: document.querySelector('.edit-profile'),
        initialData: {

        }
    });
})