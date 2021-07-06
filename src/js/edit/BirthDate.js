export default class BirthDate {
    constructor({ target }) {
        this.$target = target;
        this.state = {
            isValid: false,
        }
        this.elements = {
            $year: this.$target.querySelector('.birth-year'),
            $month: this.$target.querySelector('.birth-month'),
            $day: this.$target.querySelector('.birth-day'),
        }

        this.init();
        this.initEvent();
    }

    setOptions() {
        const setYearOptions = () => {
            const today = new Date();
            const year = parseInt(today.getFullYear());
            let yearOptionList = [];

            for (let i = year; i > 1930; i--) {
                const yearOptionItem = `<option value="${i}">${i}</option>`;
                yearOptionList.push(yearOptionItem);
            }

            this.elements.$year.innerHTML += yearOptionList.join('')
        }

        const setMonthOptions = () => {
            let monthOptionList = [];

            for (let i = 12; i > 0; i--) {
                const monthOptionItem = `<option value="${i}">${i}</option>`;
                monthOptionList.push(monthOptionItem);
            }

            this.elements.$month.innerHTML += monthOptionList.join('')
        }

        const setDayOptions = () => {
            let dayOptionList = [];

            for (let i = 31; i > 0; i--) {
                const dayOptionItem = `<option value="${i}">${i}</option>`;
                dayOptionList.push(dayOptionItem);
            }

            this.elements.$day.innerHTML += dayOptionList.join('');
        }

        setYearOptions();
        setMonthOptions();
        setDayOptions();
    }

    initSelectEvent() {
        const checkSelectedAll = () => {
            if (!this.elements.$year.value) return false
            if (!this.elements.$month.value) return false
            if (!this.elements.$day.value) return false

            return true
        }

        const setValidState = (validState) => {
            this.state.isValid = validState;
        }

        const onOptionSelect = () => {
            const isSelectedAll = checkSelectedAll();
            setValidState(isSelectedAll);
        }

        this.elements.$year.addEventListener('change', onOptionSelect);
        this.elements.$month.addEventListener('change', onOptionSelect);
        this.elements.$day.addEventListener('change', onOptionSelect);
    }

    initEvent() {
        this.initSelectEvent();
    }

    init() {
        this.setOptions();
    }
}