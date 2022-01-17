// global variables
let fontDivsArr = document.querySelectorAll(".fontDivs");
let colorDivsArr = document.querySelectorAll(".colorDivs");
let inputArr = document.querySelectorAll(".inp");
let sbChildrens = document.querySelectorAll(".pomoNav");
let clockTime = document.querySelector(".time");
let rootSelector = document.querySelector(":root");
let progressBar = document.querySelector("circle");




// functionality




function changeFontClass() {
    fontDivsArr.forEach(item => { // selecting all the font-divs
        item.addEventListener("click", () => { // function to change classes for selected fonts
            fontDivsArr.forEach(item => {
                item.classList.remove("selectedFont");
            })
            item.classList.add("selectedFont");
        })
    })
}

changeFontClass()


function changeColorClass() {
    colorDivsArr.forEach(item => { // selecting all the font-divs
        item.addEventListener("click", () => { // function to change classes for selected fonts
            colorDivsArr.forEach(item => {
                item.innerHTML = "";
                item.classList.add("notSelectedColor")
            })
            item.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
            item.classList.remove("notSelectedColor");
        })
    })
}
changeColorClass()

function setLengthToInput() {
    inputArr.forEach(item => {
        item.addEventListener("keydown", (e) => {
            (["+", "-", "e", "E", "."].includes(e.key)) ? e.preventDefault(): "";
            switch (e.key) {
                case "0":
                    (item.value.length < 1) ? e.preventDefault(): item.value += "0";
            }
        });
        item.addEventListener("input", () => {
            if (item.value > item.maxLength) item.value = item.value.slice(0, item.maxLength)
        })
    })
}
setLengthToInput();

// object Oriented Programming starts from here

class clockSetup {
    constructor() {
        // dom selecting variables

        this.rootSelector = document.querySelector(":root");
        this.settIcon = document.querySelector(".settIcon");
        this.crossIcon = document.querySelector(".times");
        this.settMenu = document.querySelector(".settingsWrapper");
        this.settBtn = document.querySelector(".apply");
        this.settInputs = document.querySelectorAll(".inp");
        this.outsideClock = document.querySelector(".outsideClock");
        this.para = document.querySelector(".para");
        this.heading = document.querySelector(".head");
        this.selectBar = document.querySelector(".selectBar");
        this.sbChildren = document.querySelectorAll(".pomoNav");
        this.clockTime = document.querySelector(".time");
        this.pauseHead = document.querySelector(".pause");
        this.progressBar = document.querySelector("circle");
        this.alarmSound = new Audio("./sounds/alarm.mp3");
        this.fontDiv1 = document.querySelectorAll(".fontDivs")[0];
        this.colorSpan1 = document.querySelectorAll(".colorDivs")[0];

        // logic variables

        this.inputBarCheck = 3;
        this.inputStoreArr = [1, 5, 15];
        this.selectedFont = this.fontDiv1;
        this.selectedColor = this.colorSpan1;
        this.checkForCorrectInputs = false;
        this.pauseCheck = false;
        this.clockClicked = false;
        this.selectBarTracker = 0;
        this.minuteTracker = 24;
        this.secondTracker = 60;
        this.checkInterval = false;
        this.clearIntervalWhenChanged = 0;
        this.numberTime = 1000;
    }

    get settBtnClick() {
        this.settIcon.addEventListener("click", () => {
            this.settMenu.style.display = "block";
            this.heading.style.opacity = "0.5";
            this.selectBar.style.opacity = "0.5";
            // this.selectBar.style.pointerEvents = "none";
            this.sbChildren.forEach(item => {
                item.style.pointerEvents = "none";
            })
        })
    }

    get crossClick() {
        this.crossIcon.addEventListener("click", () => {
            this.settMenu.style.display = "none";
            this.heading.style.opacity = "1";
            this.selectBar.style.opacity = "1";
            // this.selectBar.style.pointerEvents = "auto";
            this.sbChildren.forEach(item => {
                item.style.pointerEvents = "auto";
            })
        })
    }

    settBtnLogic() {
        this.settBtn.addEventListener("click", () => {
            this.checkInterval = false;
            this.checkForCorrectInputs = false;
            this.pauseCheck = true;
            this.settInputs.forEach(item => {
                if (Number(item.value > 60)) this.checkForCorrectInputs = true;
            });
            this.sbChildren.forEach(item => {
                item.style.pointerEvents = "auto";
            })
            if (this.checkForCorrectInputs == true) return;
            this.checkingForSettItems();
            this.changeSelectBarClasses();
            this.setProgressBar();
            // this.progressBar.classList.add("addStroke");
            this.sbChildren.forEach(item => {
                if (item.classList.contains("sbBackground")) {
                    item.style.background = window.getComputedStyle(this.selectedColor).backgroundColor;
                    item.style.color = "#ffffffe7";
                }
                this.csbHelp();
            });
            // if (this.clearIntervalWhenChanged == 0) {
            //     this.numberSetup();
            // } else {
            //     clearInterval(this.numberInterval)
            // }
            // if (this.clearIntervalWhenChanged == 0) {
            //     this.numberSetup();
            // }
            this.clearIntervalWhenChanged += 1;

            // else if (this.clearIntervalWhenChanged > 0) {
            //     clearInterval(this.numberInterval)
            // }
            // this.clockTime.innerText = this.settInputs[1].value + ":00";
        })
    }

    checkingForSettItems() {
        this.inputStoreArr = [];

        this.settInputs.forEach(item => {
            this.inputStoreArr.push(Number(item.value));
        });



        fontDivsArr.forEach(item => {
            (item.classList.contains("selectedFont")) ? this.selectedFont = item: "";
        })
        colorDivsArr.forEach(item => {
            (!item.classList.contains("notSelectedColor")) ? this.selectedColor = item: "";
        })
        this.settingClockInputs();
        this.settMenu.style.display = "none";

    }

    changeSelectBarClasses() {
        this.sbChildren.forEach(item => {
            item.addEventListener('click', () => {
                clearInterval(this.numberInterval)
                if (item == this.sbChildren[0]) {
                    this.selectBarTracker = 0;
                } else if (item == this.sbChildren[1]) {
                    this.selectBarTracker = 1;
                } else {
                    this.selectBarTracker = 2;
                }
                this.progressBar.style.animationPlayState = "paused";
                this.sbChildren.forEach(item => {
                    item.classList.remove("sbBackground");
                    item.style.background = "";
                    item.style.pointerEvents = "auto";
                })
                item.style.pointerEvents = "none";

                item.classList.add("sbBackground");
                item.style.background = window.getComputedStyle(this.selectedColor).backgroundColor;
                item.style.color = "#ffffffe7";
                this.csbHelp();
                this.setProgressBar();
                this.clearIntervalWhenChanged++;
                if (this.clearIntervalWhenChanged > 1) {
                    clearInterval(this.numberInterval);
                    console.log("intervalCleared");
                }

                // this.numberSetup();
                this.pauseCheck = true;
            })
        })
    }



    settingClockInputs() {
        this.minuteTracker = this.inputStoreArr[this.selectBarTracker];
        this.heading.style.opacity = "1";
        this.selectBar.style.opacity = "1";
        this.clockTime.style.fontFamily = window.getComputedStyle(this.selectedFont).fontFamily;
        this.progressBar.setAttribute("stroke", window.getComputedStyle(this.selectedColor).backgroundColor);
    }


    csbHelp() {
        if (this.sbChildren[1].classList.contains("sbBackground")) {

            this.rotateBackBar(1);

        } else if (this.sbChildren[2].classList.contains("sbBackground")) {
            this.rotateBackBar(2);

        } else {
            this.rotateBackBar(0);
        }
    }

    setProgressBar() {
        this.progressBar.classList.add("rotateBar");
        // this.progressBar.style.animationDuration = `${this.inputStoreArr[0] * 60}s`
        this.progressBar.addEventListener("animationend", () => {
            this.alarmSound.play();
            this.progressBar.classList.remove('rotateBar');
            this.clockTime.innertext = "0:00";
        })
    }
    rotateBackBar(num) {
        this.minuteTracker = this.inputStoreArr[this.selectBarTracker];
        this.secondTracker = 0;
        this.clockTime.innerText = `${String(this.minuteTracker)}:${String(this.secondTracker)}0`;
        this.rootSelector.style.setProperty('--animateDuration', `${this.inputStoreArr[num] * 60}s`);
        this.progressBar.style.animationDuration = window.getComputedStyle(this.rootSelector).getPropertyValue('--animateDuration');


        this.progressBar.classList.add('rotateBack');
        setTimeout(() => {
            this.progressBar.classList.remove('rotateBack')
        }, 500);
    }

    checkForPause() {
        (this.pauseCheck == false) ? this.pauseCheck = true: this.pauseCheck = false;
        if (this.pauseCheck == true) {
            this.progressBar.style.animationPlayState = "paused";
        } else {
            this.secondTracker -= 1;
            if (this.secondTracker < 0) this.secondTracker = 59;
            this.clockTime.innerText = `${String(this.minuteTracker)}:${String(this.secondTracker)}`;
            this.progressBar.style.animationPlayState = "running";
            this.setProgressBar()
        }
        if (this.pauseCheck == true) {
            clearInterval(this.numberInterval);
        } else {
            this.numberSetup();
        }
    }
    checkForSpace() {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 32) {
                this.checkForPause();
            }
        });
    }

    checkForDocumentClick() {
        let clockCont = document.querySelector(".clock");
        clockCont.addEventListener('click', () => {
            this.checkForPause();
        })
    }

    numberSetup() {

        this.numberInterval = setInterval(() => {
            if (this.secondTracker < 0) {
                this.minuteTracker -= 1;
                this.secondTracker = 59;
            }
            this.secondTracker -= 1;
            // this.secondTracker -= 1;
            // if (this.selectBarTracker == 0) {
            //     this.minuteTracker = 5;
            //     this.secondTracker = 60;
            // };
            if (this.minuteTracker == 0 && this.secondTracker == 0) {
                clearInterval(this.numberInterval);
            }
            if (this.clearIntervalWhenChanged == 0) {
                this.minuteTracker = 24;
            }
            this.clockTime.innerText = `${String(this.minuteTracker)}:${String(this.secondTracker)}`;
            if (this.secondTracker < 10) {
                this.clockTime.innerText = `${String(this.minuteTracker)}:0${String(this.secondTracker)}`
            }
        }, 1000);
    };


}

let clockStp = new clockSetup();
clockStp.settBtnLogic();
clockStp.settBtnClick;
clockStp.crossClick;
clockStp.changeSelectBarClasses();
clockStp.checkForSpace();
clockStp.checkForDocumentClick();
clockStp.checkForPause();