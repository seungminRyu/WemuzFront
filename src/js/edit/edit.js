import Avatar from "./Avatar.js";
import Alias from "./alias.js";
import BirthDate from "./BirthDate.js";
import Introduce from "./Introduce.js";

class App {
    constructor(target, initialData) {
        this.$target = target;
        this.data = initialData;
        this.elements = {
            $submitBtn: this.$target.querySelector('.submit-btn'),
        }
        this.components = {
            avatar: new Avatar({
                target: this.$target.querySelector('.basic-info__avatar')
            }),
            alias: new Alias({
                target: this.$target.querySelector('.basic-info__alias'),
            }),
            activityArea: 'activity-area component',
            birthData: new BirthDate({
                target: this.$target.querySelector('.basic-info__birth-date')
            }),
            introduce: new Introduce(
                this.$target.querySelector('.basic-info__introduce'),
            ),
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
    new App(
        document.querySelector('.edit-profile'),
        {},    
    );
})