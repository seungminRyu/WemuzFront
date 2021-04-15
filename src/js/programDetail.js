function Chart() {
    this.$target = document.querySelector('.chart-box');
    this.data = {
        options: {
            chart: {
                type: 'donut',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 600,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            series: [44, 55, 13, 33, 55, 13, 33, 55, 13, 33, 55, 13, 33],
            labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Mango', 'Orange', 'Watermelon', 'Mango', 'Orange', 'Watermelon', 'Mango', 'Orange', 'Watermelon'],
            responsive: [{
                breakpoint: 768,
                options: {
                    
                }
            }],
            plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 90,
                  customScale: 1,
                },
            },
            dataLabels: {
                enabled: false,
                dropShadow: {
                    enabled: false,
                }
            },
            stroke: {
                show: false
            },
            colors: ['#fc7474', '#ff9d55', '#ffba2b', '#8ec32a', '#16a522', '#10aeef', '#3996fb', '#4b5fe5'],
            legend: {
                position: 'bottom',
                markers: {
                    width: '16px',
                    height: '16px',
                    radius: '4px',
                },
                itemMargin: {
                    horizontal: 8,
                },
                labels: {
                    useSeriesColors: true,
                }
            }
        }
    }

    const initialize = () => {
        let chart = new ApexCharts(this.$target, this.data.options);

        chart.render();
    }

    initialize();
}

function ProgressBar(initialData) {
    this.$target = document.querySelector('.top-photo__progress-bar');
    this.data = initialData;
    this.elements = {};

    const initialize = () => {
        const slideNum = this.data.slideNum;
        if (slideNum) {
            for (let i=0; i < slideNum; i++) {
                const bar = document.createElement('div')
                bar.classList.add('bar');
                const innerBar = document.createElement('div')
                innerBar.classList.add('inner-bar');
                
                bar.appendChild(innerBar)
                this.$target.appendChild(bar);
            }
        }

        this.elements.$bars = this.$target.querySelectorAll('.inner-bar');
    }

    const initializeEvent = () => {
        document.querySelector('#prev').addEventListener('click', () => {
            clearTimeout(this.data.timer);
            if (this.data.curIndex > 0) {
                --this.data.curIndex;
                this.render();
            } else {
                this.data.curIndex = this.data.slideNum - 1;
                this.render();
            }
            console.log(this.data.curIndex);
        });

        document.querySelector('#next').addEventListener('click', () => {
            clearTimeout(this.data.timer);
            if (this.data.curIndex < this.data.slideNum-1) {
                ++this.data.curIndex;
                this.render();
            } else {
                this.data.curIndex = 0
                this.render();
            }
            console.log(this.data.curIndex);
        });
    }

    this.render = () => {
        const curIndex = this.data.curIndex;
        const prevBar = this.$target.querySelector('.--current');
        if (prevBar) {
            prevBar.classList.remove('--current');
        }
        
        this.elements.$bars.forEach((elem, i) => {
            if (i < curIndex) {
                elem.style.width = '100%';
            } else if (i === curIndex) {
                elem.classList.add('--current')
            } else {
                elem.style.width = '0';
            }
        }) 

        // css animation filled-up 과 시간을 맞춰야 한다.
        this.data.timer = setTimeout(() => {
            ++this.data.curIndex
            this.render()
        }, 6000);
    }

    initialize();
    initializeEvent();
    this.render();
}

window.addEventListener('load', () => {
    new Chart();
    new ProgressBar({
        slideNum: 8,
        curIndex: 0,
        timer: null,
    })
})