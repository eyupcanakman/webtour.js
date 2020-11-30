export default class WebTour {
    constructor(options = {}) {
        this.options = {
            animate: true,
            opacity: 0.5,
            offset: 20,
            borderRadius: 3,
            allowClose: true,
            highlight: true,
            keyboard: true,
            width: '300px',
            zIndex: 10050,
            removeArrow: false,
            onNext: () => null,
            onBack: () => null,
            ...options,
        }

        this.Popper = Popper;
        this.steps = [];
        this.stepIndex = 0;
        this.isRunning = false;
        this.isPaused = false;

        //elements
        this.window = window;
        this.document = document;

        //events
        this.onClick = this.onClick.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.bind();
    }

    bind() {
        if (!('ontouchstart' in this.document.documentElement)) {
            this.window.addEventListener('click', this.onClick, false);
        } else {
            this.window.addEventListener('touchstart', this.onClick, false);
        }

        this.window.addEventListener('resize', this.onResize, false);
        this.window.addEventListener('keyup', this.onKeyUp, false);
    }

    onClick(e) {
        e.stopPropagation();
        if (e.target.classList.contains('wt-btn-next')) {
            this.next();
        }

        if (e.target.classList.contains('wt-btn-back')) {
            this.back();
        }

        if (e.target.classList.contains('wt-overlay')) {
            //if allowClose = true close when backdrop is click
            if (this.options.allowClose) {
                this.stop();
            }
        }
    }

    onKeyUp(event) {
        if (!this.isRunning || !this.options.keyboard) {
            return;
        }

        if (event.keyCode === 27 && this.options.allowClose) {
            this.stop();
            return;
        }

        //right key for next
        if (event.keyCode === 39) {           
           this.next();
        }
        //left key for back
        else if (event.keyCode === 37 ) {            
            this.back();
        }
    }

    //page is resize update popover
    onResize() {
        if (!this.isRunning) {
          return;
        }    

        this.clear();
        this.render(this.steps[this.stepIndex]);
    }

    //set popper instance if you want to use popper engine
    setPopperInstance(Popper){
        this.Popper = Popper;
    }

    //set web tour steps
    setSteps(steps) {
        this.steps = steps;
    }

    
    getSteps() {
        return this.steps;
    }

    //start the web tour
    start(startIndex = 0) {
        this.isRunning = true;
        this.stepIndex = startIndex;
        this.render(this.steps[this.stepIndex]);
    }

    pause() {
        this.isPaused = true;
    }

    resumeNext() {
        this.isPaused = false;
        this.next();
    }

    resumeBack() {
        this.isPaused = false;
        this.back();
    }

    stop() {
        this.clear();
        this.isRunning = false;
    }

    //show loader progress
    showLoader() {
        const popover = this.document.querySelector('.wt-popover');
        const loader = this.document.createElement('div');
        loader.classList.add('wt-loader');
        loader.style.zIndex = this.options.zIndex + 10;
        popover.prepend(loader);
    }

    /**go to next step */
    next() {
        //execute onNext function()
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onNext) this.steps[this.stepIndex].onNext();
        this.stepIndex++;

        if (this.isPaused) return;

        this.clear();

        if (this.steps.length === 0) return false;

        if (this.stepIndex >= this.steps.length) {
            this.stop();
            return;
        }

        this.render(this.steps[this.stepIndex]);
    }

    back() {
        //execute onBack function()
        if (this.steps[this.stepIndex] && this.steps[this.stepIndex].onBack) this.steps[this.stepIndex].onBack();
        this.stepIndex--;

        if (this.isPaused) return;

        this.clear();

        if (this.steps.length === 0) return false;

        if (this.stepIndex < 0) {
            this.stop();
            return;
        }

        this.render(this.steps[this.stepIndex]);
    }

    //add the popover to document
    render(step) {
        var element = step.element ? this.document.querySelector(step.element) : null;

        //check if element is present if not make it floating
        if (element) {
            element.style.position = !element.style.position ? 'relative' : element.style.position;
            const step_highlight = step.highlight ? true : step.highlight;
            //highlight is set to true
            if (this.options.highlight && step_highlight ) {
                element.setAttribute('wt-highlight', 'true');
            }
        }

        var overlay = document.createElement('div');
        overlay.classList.add('wt-overlay', 'open');
        overlay.style.zIndex = this.options.zIndex - 10;

        //popover
        const popover = this.document.createElement('div');
        const popoverInner = this.document.createElement('div');
        const arrow = this.document.createElement('div');
        const title = this.document.createElement('div');
        const content = this.document.createElement('div');
        const btnNext = this.document.createElement('button');
        const btnBack = this.document.createElement('button');

        popover.classList.add('wt-popover');
        popover.style.borderRadius = this.options.borderRadius + 'px';
        popover.style.zIndex = this.options.zIndex + 10;

        if (this.options.width) {
            if (typeof this.options.width === 'string') {
                popover.style.width = this.options.width;
            } else if (this.options.width > 0) {
                popover.style.width = this.options.width + 'px';
            }
        }

        if (step.width) {
            if (typeof step.width === 'string') {
                popover.style.width = step.width;
            } else if (step.width > 0) {
                popover.style.width = step.width + 'px';
            }
        }

        popoverInner.classList.add('wt-popover-inner');
        arrow.classList.add('wt-arrow');
        arrow.setAttribute('data-popper-arrow', 'true');
        title.classList.add('wt-title');
        content.classList.add('wt-content');
        btnNext.classList.add('wt-btns', 'wt-btn-next');
        btnBack.classList.add('wt-btns', 'wt-btn-back');
        if (step.placement) popover.classList.add(step.placement); //add user define placement to class for position in css

        //add text
        if (step.title) title.innerText = step.title;
        content.innerHTML = step.content;
        btnNext.innerHTML = (step.btnNext && step.btnNext.text ? step.btnNext.text : (this.stepIndex == this.steps.length - 1 ? 'Done' : 'Next &#8594;'));
        btnBack.innerHTML = (step.btnBack && step.btnBack.text ? step.btnBack.text : (this.stepIndex == 0 ? 'Close' : '	&#8592; Back'));

        //add styles
        btnNext.style.backgroundColor = (step.btnNext && step.btnNext.backgroundColor ? step.btnNext.backgroundColor : '#7cd1f9');
        btnBack.style.backgroundColor = (step.btnBack && step.btnBack.backgroundColor ? step.btnBack.backgroundColor : '#efefef;');
        btnNext.style.color = (step.btnNext && step.btnNext.textColor ? step.btnNext.textColor : '#fff');
        btnBack.style.color = (step.btnBack && step.btnBack.textColor ? step.btnBack.textColor : '#555');

        ///combine popover component
        if (step.title) popoverInner.append(title);
        popoverInner.append(content);
        popoverInner.append(btnBack);
        popoverInner.append(btnNext);
        popover.append(arrow);
        popover.append(popoverInner);

        //append to body        
        this.document.body.appendChild(overlay);
        this.document.body.appendChild(popover);

        //position popover
        if (this.Popper && element) {
            const arrow = popover.querySelector('.wt-arrow');

            this.Popper.createPopper(element, popover, {
                placement: step.placement ? step.placement : 'auto',
                strategy: step.strategy ? step.strategy : 'absolute',
                modifiers: [
                    {
                        name: 'arrow',
                        options: {
                            element: arrow,
                            padding: 5
                        },
                    },
                    {
                        name: 'offset',
                        options: {
                            offset: [0, this.options.offset],
                        },
                    },
                ],
            });
        }
        /**
         * if no popper instance but element is present
         */
        else if (!this.Popper && element) {
            this.calculatePosition(element, popover, arrow, step);
        }
        /**
         * No element is define 
         * Make popover floating (position center)
         */
        else {
            popover.classList.add('wt-slides');
            //remove arrow
            arrow.remove();
        }

        //add option to remove arrow because popper arrows are not positioning well
        //TODO: fix popper arrow
        if (this.options.removeArrow){
            arrow.remove();
        }

    }

    //remove popover
    clear() {
        var popup = this.document.querySelector('.wt-popover');
        var loader = this.document.querySelector('.wt-loader');
        var overlay = this.document.querySelector('.wt-overlay');

        if (popup) popup.remove();
        if (loader) loader.remove();
        if (overlay) overlay.remove();

        this.document.querySelectorAll('*[wt-highlight]').forEach((element) => {
            element.removeAttribute('wt-highlight');
        })
    }

    //position popover
    calculatePosition(element, popover, arrow, step) {
        var placement = step.placement ? step.placement : 'auto';
        var strategy = step.strategy ? step.strategy : 'absolute';

        popover.style.position = strategy;
        arrow.style.position = 'absolute';

        //if placement is not defined or auto then calculate location
        if (placement == 'auto' || placement == 'auto-start' || placement == 'auto-end') {
            const arrow = placement.replace('auto', '').trim();
            var new_arrow = '';

            //element is position to the bottom of the screen    
            //position popover to top
            if (element.getBoundingClientRect().top + (popover.offsetHeight + this.options.offset) > this.window.innerHeight - 100) {
                //divide the screen into 3 sections
                //if left is within section 1/3 of the screen then arrow is in the start position
                if (element.getBoundingClientRect().left < (this.window.innerWidth / 3)) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                //if left is within that section 3/3 of the screen then arrow is in the end position
                else if (element.getBoundingClientRect().left > (this.window.innerWidth - (this.window.innerWidth / 3))) {
                    new_arrow = arrow.length > 0 ? arrow : '-end';
                }
                placement = 'top' + new_arrow;
            }

            //element is position to the right side of the screen
            //position popover to the left
            if ((element.getBoundingClientRect().left + element.offsetWidth + popover.offsetWidth) > this.window.innerWidth) {
                //divide the screen into 3 sections
                //if left is within section 1/3 of the screen then arrow is in the start position
                if (element.getBoundingClientRect().top < (this.window.innerHeight / 3)) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                //if left is within that section 3/3 of the screen then arrow is in the end position
                else if (element.getBoundingClientRect().top > (this.window.innerHeight - (this.window.innerHeight / 3))) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                placement = 'left' + new_arrow;
            }

            //element is position to the left side of the screen
            //position popover to the right
            if (element.getBoundingClientRect().left < popover.offsetWidth && (element.offsetWidth + popover.offsetWidth) < this.window.innerWidth) {
                //divide the screen into 3 sections
                //if left is within section 1/3 of the screen then arrow is in the start position
                if (element.getBoundingClientRect().top < (this.window.innerHeight / 3)) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                //if left is within that section 3/3 of the screen then arrow is in the end position
                else if (element.getBoundingClientRect().top > (this.window.innerHeight - (this.window.innerHeight / 3))) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                placement = 'right' + new_arrow;
            }

            //element is position to the top of the screen    
            //position popover to bottom
            if (element.getBoundingClientRect().top < (popover.offsetHeight + this.options.offset) || element.getBoundingClientRect().top < 100) {
                //divide the screen into 3 sections
                //if left is within section 1/3 of the screen then arrow is in the start position
                if (element.getBoundingClientRect().left < (this.window.innerWidth / 3)) {
                    new_arrow = arrow.length > 0 ? arrow : '-start';
                }
                //if left is within that section 3/3 of the screen then arrow is in the end position
                else if (element.getBoundingClientRect().left > (this.window.innerWidth - (this.window.innerWidth / 3))) {
                    new_arrow = arrow.length > 0 ? arrow : '-end';
                }
                placement = 'bottom' + new_arrow;
            }

            //add to class for css
            popover.classList.add(placement);
        }

        //top
        if (placement == 'top') {
            popover.style.top = (element.getBoundingClientRect().top - (popover.offsetHeight + this.options.offset)) + 'px';
            popover.style.left = (element.getBoundingClientRect().left + ((element.offsetWidth / 2) - (popover.offsetWidth / 2))) + 'px';
        } else if (placement == 'top-start') {
            popover.style.top = (element.getBoundingClientRect().top - (popover.offsetHeight + this.options.offset)) + 'px';
            popover.style.left = element.getBoundingClientRect().left + 'px';
        } else if (placement == 'top-end') {
            popover.style.top = (element.getBoundingClientRect().top - (popover.offsetHeight + this.options.offset)) + 'px';
            popover.style.left = ((element.getBoundingClientRect().left + element.offsetWidth) - popover.offsetWidth) + 'px';
        }

        //bottom
        else if (placement == 'bottom') {
            popover.style.top = (element.getBoundingClientRect().top + element.offsetHeight) + this.options.offset + 'px';
            popover.style.left = (element.getBoundingClientRect().left + (element.offsetWidth / 2) - popover.offsetWidth / 2) + 'px';
        } else if (placement == 'bottom-start') {
            popover.style.top = (element.getBoundingClientRect().top + element.offsetHeight) + this.options.offset + 'px';
            popover.style.left = (element.getBoundingClientRect().left) + 'px';
        } else if (placement == 'bottom-end') {
            popover.style.top = (element.getBoundingClientRect().top + element.offsetHeight) + this.options.offset + 'px';
            popover.style.left = ((element.getBoundingClientRect().left + element.offsetWidth) - popover.offsetWidth) + 'px';
        }

        //left
        else if (placement == 'right') {
            popover.style.top = (element.getBoundingClientRect().top + (popover.offsetHeight / 2) - (element.offsetHeight / 2)) + 'px';
            popover.style.left = (element.getBoundingClientRect().left + (element.offsetWidth + this.options.offset)) + 'px';
        } else if (placement == 'right-start') {
            popover.style.top = element.getBoundingClientRect().top + 'px';
            popover.style.left = (element.getBoundingClientRect().left + (element.offsetWidth + this.options.offset)) + 'px';
        } else if (placement == 'right-end') {
            popover.style.top = ((element.getBoundingClientRect().top + element.offsetHeight) - popover.offsetHeight) + 'px';
            popover.style.left = (element.getBoundingClientRect().left + (element.offsetWidth + this.options.offset)) + 'px';
        }

        //right
        else if (placement == 'left') {
            popover.style.top = (element.getBoundingClientRect().top + (popover.offsetHeight / 2) - (element.offsetHeight / 2)) + 'px';
            popover.style.left = (element.getBoundingClientRect().left - (popover.offsetWidth + this.options.offset)) + 'px';
        } else if (placement == 'left-start') {
            popover.style.top = element.getBoundingClientRect().top + 'px';;
            popover.style.left = (element.getBoundingClientRect().left - (popover.offsetWidth + this.options.offset)) + 'px';
        } else if (placement == 'left-end') {
            popover.style.top = ((element.getBoundingClientRect().top + element.offsetHeight) - popover.offsetHeight) + 'px';
            popover.style.left = (element.getBoundingClientRect().left - (popover.offsetWidth + this.options.offset)) + 'px';
        }
    }
}