// global variables
let fontDivsArr = document.querySelectorAll(".fontDivs");
let colorDivsArr = document.querySelectorAll(".colorDivs");
let inputArr = document.querySelectorAll(".inp");
let periodBarChildsArr = document.querySelectorAll(".pomoNav");
let clockTime = document.querySelector(".time");
let rootSelector = document.querySelector(":root");
let progressBar = document.querySelector("circle");
let responsiveEventListenerForAllDevices = ["touchend", "click", ]



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
            (["+", "-", "e", "E"].includes(e.key)) ? e.preventDefault(): "";
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




// Menu Setup






class clockSetup {
    constructor() {
        // dom selecting variables 
        this.rootSelector = document.querySelector(":root");
        this.crossIcon = document.querySelector(".times");
        this.settingsMenu = document.querySelector(".settingsWrapper");
        this.applyBtn = document.querySelector(".apply");
        this.settingInputsArr = document.querySelectorAll(".inp");
        this.outsideClock = document.querySelector(".outsideClock");
        this.para = document.querySelector(".para");
        this.heading = document.querySelector(".head");
        this.periodBar = document.querySelector(".periodBar");
        periodBarChildsArr = document.querySelectorAll(".pomoNav");
        clockTime = document.querySelector(".time");
        this.pauseHead = document.querySelector(".pause");
        this.progressBar = document.querySelector("circle");
        this.alarmSound = new Audio("./sounds/alarm.mp3");
        this.fontDiv1 = document.querySelectorAll(".fontDivs")[0];
        this.colorSpan1 = document.querySelectorAll(".colorDivs")[0];

        // logic variables

        this.inputBarCheck = 3;
        this.inputStoreArr = [25, 5, 15];
        this.selectedFont = this.fontDiv1;
        this.selectedColor = this.colorSpan1;
        this.checkForCorrectInputs = false;
        this.pauseCheck = false;
        this.clockClicked = false;
        this.periodBarTracker = 0;
        this.minuteTracker = 24;
        this.secondTracker = 60;
        this.checkInterval = false;
        this.clearIntervalWhenChanged = 0;
        this.numberTime = 1000;

    }



    settBtnLogic() {
        this.applyBtn.addEventListener("click", () => {
            this.checkInterval = false;
            this.checkForCorrectInputs = false;
            this.pauseCheck = true;
            this.settingInputsArr.forEach(item => {
                if (Number(item.value > 60)) this.checkForCorrectInputs = true;
            });
            periodBarChildsArr.forEach(item => {
                item.style.pointerEvents = "auto";
            })
            if (this.checkForCorrectInputs == true) return;
            this.checkingForSettItems();
            this.setProgressBar();
            periodBarChildsArr.forEach(item => {
                if (item.classList.contains("sbBackground")) {
                    item.style.background = window.getComputedStyle(this.selectedColor).backgroundColor;
                    item.style.color = "#ffffffe7";
                }
                this.csbHelp();
            });

            clearInterval(this.numberInterval);

            this.clearIntervalWhenChanged += 1;
        })
    }

    checkingForSettItems() {
        this.inputStoreArr = [];

        this.settingInputsArr.forEach(item => {
            this.inputStoreArr.push(Number(item.value));
        });



        fontDivsArr.forEach(item => {
            (item.classList.contains("selectedFont")) ? this.selectedFont = item: "";
        })
        colorDivsArr.forEach(item => {
            (!item.classList.contains("notSelectedColor")) ? this.selectedColor = item: "";
        });
        // this.settingClockInputs();
        this.settingsMenu.style.display = "none";

    }

    changePeriodBarClasses() {
        periodBarChildsArr.forEach(item => {
            item.addEventListener("click", () => {
                clearInterval(this.numberInterval)
                if (item == periodBarChildsArr[0]) {
                    this.periodBarTracker = 0;
                } else if (item == periodBarChildsArr[1]) {
                    this.periodBarTracker = 1;
                } else {
                    this.periodBarTracker = 2;
                }
                this.progressBar.style.animationPlayState = "paused";
                periodBarChildsArr.forEach(item => {
                    item.classList.remove("sbBackground");
                    item.style.background = "";
                    item.style.pointerEvents = "auto";
                })
                item.style.pointerEvents = "none";

                item.classList.add("sbBackground");

                // item.style.background = window.getComputedStyle(this.selectedColor).backgroundColor;
                // item.style.color = "#ffffffe7";
                this.csbHelp();
                this.setProgressBar();
                this.clearIntervalWhenChanged++;
                if (this.clearIntervalWhenChanged > 1) {
                    clearInterval(this.numberInterval);
                }

                // this.numberSetup();
                this.pauseCheck = true;
            })
        })
    }



    settingClockInputs() {
        this.minuteTracker = this.inputStoreArr[this.periodBarTracker];
        this.heading.style.opacity = "1";
        this.periodBar.style.opacity = "1";
        clockTime.style.fontFamily = window.getComputedStyle(this.selectedFont).fontFamily;
        this.progressBar.setAttribute("stroke", window.getComputedStyle(this.selectedColor).backgroundColor);
    }


    csbHelp() {
        if (periodBarChildsArr[1].classList.contains("sbBackground")) {

            this.rotateBackBar(1);

        } else if (periodBarChildsArr[2].classList.contains("sbBackground")) {
            this.rotateBackBar(2);

        } else {
            this.rotateBackBar(0);
        }
    }

    setProgressBar() {
        if (this.pauseCheck == false) {
            this.progressBar.classList.add("rotateBar");
        }
        // this.progressBar.style.animationDuration = `${this.inputStoreArr[0] * 60}s`
        this.progressBar.addEventListener("animationend", () => {
            // this.alarmSound.play();
            this.progressBar.classList.remove('rotateBar');
            clearInterval(this.numberInterval);
            this.minuteTracker = this.inputStoreArr[this.periodBarTracker];
            this.secondTracker = 0;
            clockTime.innerText = `${String(this.minuteTracker)}:${String(this.secondTracker)}0`;

            this.pauseCheck = true;


        }, { once: true })
    };

    rotateBackBar(num) {
        this.minuteTracker = this.inputStoreArr[this.periodBarTracker];
        this.secondTracker = 0;
        clockTime.innerText = `${String(this.minuteTracker)}:${String(this.secondTracker)}0`;
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
            setTimeout(() => {
                this.secondTracker -= 1;
                if (this.minuteTracker == 0 && this.secondTracker == 0) {
                    this.minuteTracker = this.inputStoreArr[this.periodBarTracker];
                    this.secondTracker = 0;
                    clockTime.innerText = `${String(this.minuteTracker)}:${String(this.secondTracker)}`;
                }
                if (this.secondTracker < 0) {
                    this.secondTracker = 60;
                    this.minuteTracker -= 1;
                }
                clockTime.innerText = `${String(this.minuteTracker)}:${String(this.secondTracker)}`;
                this.progressBar.style.animationPlayState = "running";
                this.setProgressBar();
            }, 5000);
        };

        if (this.pauseCheck == true) {
            clearInterval(this.numberInterval);
        } else {
            this.numberSetup();
        }
    };

    spaceBarPauseCheck() {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 32) {
                this.checkForPause();
            }
        });
    }

    checkForClockContClick() {
        let clockCont = document.querySelector(".clock");
        clockCont.addEventListener("click", () => {
            this.checkForPause();
        })
        clockCont.addEventListener("touch", () => {
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
            // if (this.periodBarTracker == 0) {
            //     this.minuteTracker = 5;
            //     this.secondTracker = 60;
            // };
            if (this.minuteTracker == 0 && this.secondTracker == 0) {
                clearInterval(this.numberInterval);
            }
            if (this.clearIntervalWhenChanged == 0) {
                this.minuteTracker = 24;
            }
            clockTime.innerText = `${String(this.minuteTracker)}:${String(this.secondTracker)}`;
            if (this.secondTracker < 10) {
                clockTime.innerText = `${String(this.minuteTracker)}:0${String(this.secondTracker)}`
            }
        }, 10);
    };


}


// let clockStp = new clockSetup();
// clockStp.settBtnLogic();
// clockStp.settBtnClick;
// clockStp.crossClick;
// clockStp.changePeriodBarClasses();
// clockStp.spaceBarPauseCheck();
// clockStp.checkForClockContClick();
// clockStp.checkForPause();








class menuSetup extends clockSetup {
    constructor() {
        super();
        this.settIcon = document.querySelector(".settIcon");
    };

    openSettingMenu() {
        this.settIcon.addEventListener("click", () => {
            this.changeThingsWhenSettingsBtnGotClicked("block", "0.5");
            this.PeriodBarChildsSelectionEventToNone();
        })
    };

    // change Stuff when settings button got clicked!

    changeThingsWhenSettingsBtnGotClicked(display, opacity) {
        this.settingsMenu.style.display = display;
        this.headingAndperiodBarOpacity(opacity);
    };

    headingAndperiodBarOpacity(opacity) {
        this.heading.style.opacity = opacity;
        this.periodBar.style.opacity = opacity;
    }

    //  setting Period Bar Childrens PointerEvents to none 

    PeriodBarChildsSelectionEventToNone() {
        return periodBarChildsArr.forEach(item => item.style.pointerEvents = "none");
    };


    //  setting Period Bar Childrens PointerEvents to none

    PeriodBarChildsSelectionEventToAuto() {
        return periodBarChildsArr.forEach(item => item.style.pointerEvents = "auto");
    };


    // Close Settings Menu

    closeSettingsMenu() {
        this.crossIcon.addEventListener("click", () => {
            this.changeThingsWhenSettingsBtnGotClicked("none", "1");
            this.PeriodBarChildsSelectionEventToAuto();
        });
    };

    setOpacity(opacity) {
        this.periodBar.style.opacity = opacity;
        this.heading.style.opacity = opacity;
    }


    // Same thing as above when apply btn got Clicked inside Settings Menu!

    applyBtnStuff() {
        this.applyBtn.addEventListener("click", () => {
            // this.changeThingsWhenSettingsBtnGotClicked("", "1");
        });
    }

}

let menuStp = new menuSetup();
menuStp.openSettingMenu();
menuStp.closeSettingsMenu();
menuStp.applyBtnStuff();


class settingMenuInputsToClock {
    constructor() {

        // dom selecting variables 

        this.applyBtn = document.querySelector(".apply");

        this.crossIcon = document.querySelector(".times");
        this.settingsMenu = document.querySelector(".settingsWrapper");
        this.applyBtn = document.querySelector(".apply");
        this.outsideClock = document.querySelector(".outsideClock");
        this.para = document.querySelector(".para");
        this.heading = document.querySelector(".head");
        this.periodBar = document.querySelector(".periodBar");
        this.progressBar = document.querySelector("circle");
        this.fontDiv1 = document.querySelectorAll(".fontDivs")[0];
        this.colorSpan1 = document.querySelectorAll(".colorDivs")[0];

        // logic variables

        this.inputBarCheck = 3;
        this.inputStoreArr = [25, 5, 15]; // default inputStoreArr;
        this.selectedFont = this.fontDiv1;
        this.selectedColor = this.colorSpan1;
        // this.checkForCorrectInputs = false;


        this.periodBarTracker = 0;
        this.minuteTracker = 25;
        this.secondTracker = `00`;
        this.numberTime = 1000;
    };


    applyBtnLogic() {
        this.applyBtn.addEventListener("click", () => this.settingMenuInuptsToClockFunc());
    };

    settingMenuInuptsToClockFunc() {
        if (this.checkForMenuPeriodInputs() === true) return; // if this.checkforMenuPeriodInputs function is true then settingMenuInuptsToClockFunc function will not do anything!
        this.setOpacityToHeadingAndPeriodBar("1");
        this.setMenuItemsToVariablesAndArr(); // setting Menu Items to variables and array For Clock and other stuff;
        this.settingsMenu.style.display = "none";
        this.setPeriodBarTrackerValue();
        this.settingClockInputs();
    };

    setOpacityToHeadingAndPeriodBar(opacity) { // set opacity as per the situation of settings Menu - open menu or close menu;
        this.periodBar.style.opacity = opacity;
        this.heading.style.opacity = opacity;
    }


    setMenuItemsToVariablesAndArr() {
        this.MenuInputsValueArr(); // storing Menu Inputs Value to an Array;
        this.MenuFontAndColorVarSetup(); // storing Font and Color Values to variables;
    };

    MenuInputsValueArr() {
        this.inputStoreArr = [];
        inputArr.forEach(item => this.inputStoreArr.push(Number(item.value))); // storing value of all the menuInputBars in inputStoreArr;
        return this.inputStoreArr;
    };

    MenuFontAndColorVarSetup() {
        fontDivsArr.forEach(item => (item.classList.contains("selectedFont")) ? this.selectedFont = item : ""); // this.selectedFont = item that contains selectedFont
        colorDivsArr.forEach(item => (!item.classList.contains("notSelectedColor")) ? this.selectedColor = item : ""); // this.selectedColor = item that contains notSelectedColor
    };

    checkForMenuPeriodInputs() {
        this.checkForCorrectInputs = false;
        inputArr.forEach(item => (Number(item.value > 60)) ? this.checkForCorrectInputs = true : ""); // checkForCorrectInputs = true; when any of the item value is greater than 60;
        return this.checkForCorrectInputs;
    };

    // setting Menu Inputs to clock

    settingClockInputs() {
        this.setMenuStuffToDocument()
        this.setClockTime();
    };

    setClockTime() {
            this.minuteTracker = (this.inputStoreArr[this.periodBarTracker]);
            clockTime.innerText = `${this.minuteTracker}:${this.secondTracker = `00`}`;
    };

    setMenuStuffToDocument() {
        clockTime.style.fontFamily = window.getComputedStyle(this.selectedFont).fontFamily; //  this.selectedFont = div that contains "selected" class;
        this.progressBar.setAttribute("stroke", window.getComputedStyle(this.selectedColor).backgroundColor); // progress Bar is the circular bar and stroke is the the border of the svg;
    };

    setPeriodBarTrackerValue() {
        for (let i = 0; i <= 2; i++) { this.setPeriodBarTrackerValueHelperFunc(i) };
    };

    setPeriodBarTrackerValueHelperFunc(ind) {
        if (!periodBarChildsArr[ind].classList.contains("sbBackground")) return;
        this.periodBarTracker = ind;
        return this.periodBarTracker;
    };


};

let setNewInputsToClock = new settingMenuInputsToClock();
setNewInputsToClock.applyBtnLogic();


// 

class clock extends settingMenuInputsToClock {
    constructor() {
        super();
        this.rootSelector = document.querySelector(":root");
        this.pauseHead = document.querySelector(".pause");
        this.alarmSound = new Audio("./sounds/alarm.mp3");
        this.pauseCheck = false;
        this.clockClicked = false;
        this.checkInterval = false;
        this.clearIntervalWhenChanged = 0;
        this.numberIncrementer = 1;
        this.pomodoroTracker = 0;
    };


    clockLogic() {
        // do something;
    }

    applyBtnClickEvent() {
        this.applyBtn.addEventListener("click", () => this.applyBtnStuff());
        // this.applyBtn.addEventListener("touchend", () => this.applyBtnStuff);
    }

    applyBtnStuff() {
        if (this.checkForMenuPeriodInputs() === true) return;
            this.pauseCheck = true;
            this.removeClassFromLastTimeLeftChildInPeriodBar();
            this.setMenuItemsToVariablesAndArr();
            this.clearIntervalOfClock();
            this.checkForPause();
            this.setClockTime();
            this.setNumIncrementerToDefault();
            this.setProgressBarToStartPos();
            this.setBackgroundForPeriodBarAccordingToMenu();
            // this.setAllPeriodBarChildsSelectionToAuto();
    }

    // CHANGING BETWEEN PERIOD BAR CHILDS

    switchChildsOfPeriodBar() {
        periodBarChildsArr.forEach(item => item.addEventListener("click", () => { 
            this.switchperiodBar(item);
        }));
    };

    switchPeriodBarMobileVersion() {
        periodBarChildsArr.forEach(item => {
            item.addEventListener("touchend", () => {
                this.switchperiodBar(item);
            })
        })
    }

    switchperiodBar(item) {     
        this.changePeriodBarChildsStuff(item);
        this.setPeriodBarTrackerValue();
        this.setMenuItemsToVariablesAndArr();
        this.setClockTime();
        this.clearIntervalOfClock();
        this.rotateBackBar();
        this.pauseCheck = true;
        this.checkForPause();
        this.setNumIncrementerToDefault()
        this.setProgressBarToStartPos();
        // this.setPomodoro();
        this.setBackTotheTrackOfSetPomodoro();
        this.setBackgroundForPeriodBarAccordingToMenu();
    }

    setBackgroundForPeriodBarAccordingToMenu() {
        periodBarChildsArr.forEach(item => {
            item.style.backgroundColor = "";
            if(item.classList.contains("sbBackground")) {
                item.style.backgroundColor = window.getComputedStyle(this.selectedColor).backgroundColor;
            }
        })
    }
    setNumToDefault() {};
    setNumIncrementerToDefault() {
        return this.numberIncrementer = 1;
    }

    changePeriodBarChildsStuff(child) { // adding class to clicked child of Period Bar;
        periodBarChildsArr.forEach(item => this.changePeriodBarChildsHelperFunc(item, item.classList.remove("sbBackground"), "auto"));
        this.changePeriodBarChildsHelperFunc(child, child.classList.add("sbBackground"), "none");
    };

    changePeriodBarChildsHelperFunc(childrenOfPeriodBar, classFunc, pointerEvents) {
        classFunc; // classFunc is basically the function of what classList function you want to apply for specific children of PeriodBar;
        childrenOfPeriodBar.style.pointerEvents = pointerEvents; // pointerEvents parameter refers to what pointerEvents you want to apply for the btn;
    };

    removeClassFromLastTimeLeftChildInPeriodBar() {
        return periodBarChildsArr.forEach(item => {
            this.changePeriodBarChildsHelperFunc(item, item.style.backgroundColor = "", "auto");
            this.PeriodBarChildsPointerEventsToNone(item);
        });
    }

    PeriodBarChildsPointerEventsToNone(item) {
        return (item.classList.contains("sbBackground")) ? item.style.pointerEvents = "none" : "";
    }



    rotateBackBar() {
        this.progressBar.classList.add('rotateBack');
    } 



    checkForPause() {
        this.pauseCheck = (this.pauseCheck == false) ? true : false;
        this.checkForClockTimeAndProgressBarWhenPauseCheckFuncIsCalled(this.pauseCheck);
    };


    checkForClockTimeAndProgressBarWhenPauseCheckFuncIsCalled(pauseCheckVar) { // clear interval or resume interval according to the situation of pause;
        if (pauseCheckVar == false) {
            clearInterval(this.numberInterval);
        } else {
            this.clockTimeTickingFunction();
            this.resumeClock();
        }
    };
    
    resumeClock() {
        setTimeout(() => {
            this.restartClockFunc();
            this.changeClockTimeText("");
            this.checkIfSecondTrackerIsLessThanTen();
        }, 1000);
    }

    restartClockFunc() { // reset timer again when user clicks the timer when minute and seconds are 0;
        if (this.minuteTracker == 0 && this.secondTracker == 0) {
            this.setClockTime();
            this.setPomodoro();
            clearInterval(this.numberInterval);
            this.pausecheck = false;
            this.checkForPause();
            this.setNumIncrementerToDefault();
            this.setBackgroundForPeriodBarAccordingToMenu();
            this.alarmSound.play();
        }
    }

    spaceBarPauseCheck() {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 32) {
                this.checkForPause();
            }
        });
    }

    checkForClockContClick() {
        let clockCont = document.querySelector(".time");
        clockCont.addEventListener("click", () => this.checkForPause())
    }



    clockTimeTickingFunction() {

        this.numberInterval = setInterval(() => {
            this.secondTracker -= 1;
            this.numberIncrementer += 1;
            this.restartClockFunc();
            this.checkIfSecondTrackerIsZero();
            this.changeClockTimeText("");
            this.checkIfSecondTrackerIsLessThanTen();
            this.rotateProgressBar();
        }, 1000);

    };

    changeClockTimeText(addSomething) {
        return clockTime.innerText = `${this.minuteTracker}:${addSomething}${this.secondTracker}`
    }

    clearIntervalOfClock() {
        return clearInterval(this.numberInterval);
    }

    // clocktimeTicking function's helper functions

    checkIfSecondTrackerIsZero() {
        if (this.secondTracker < 0) {
            this.minuteTracker -= 1;
            this.secondTracker = 59;
        }
    }

    checkIfTheClockTimeIsZero() { // if clock time is zero then clear Interval or stop the clock time;
        if (this.minuteTracker == 0 && this.secondTracker == 0) {
            clearInterval(this.numberInterval);
            this.pauseCheck = false;
            this.setNumIncrementerToDefault();
            this.alarmSound.play();
        };
    }

    checkIfSecondTrackerIsLessThanTen() { // to add zero infront of the secondTracker;
        if(this.secondTracker < 10 && this.secondTracker > 0)  this.changeClockTimeText("0");
    }



    // progress bar logic
    rotateProgressBar() {
        this.progressBar.style.strokeDashoffset = this.getOneRotateValue () * this.numberIncrementer;
        this.progressBar.style.strokeLinecap = "round";
    };

    getOneRotateValue() {
        this.getMinuteForProgressBar = this.inputStoreArr[this.periodBarTracker];
        this.oneTimeRotateValue = 1310 / (this.getMinuteForProgressBar * 60) ;
        return this.oneTimeRotateValue;
    }

    setProgressBarToStartPos() {
        this.progressBar.style.strokeDashoffset = 0;
    }
    
    // set pomodoros;
    /**
     *  The Pomodoro Technique was developed in the late 1980s by then university student Francesco Cirillo. Cirillo was struggling to focus on his studies and complete assignments.
     *  Feeling overwhelmed, he asked himself to commit to just 10 minutes of focused study time. Encouraged by the challenge, he found a tomato (pomodoro in Italian) shaped kitchen timer,
     *  and the Pomodoro technique was born.
     */
      
    setPomodoro() {
        if(this.periodBarTracker == 0) {
            this.setPomodoroHelper(1, 0);
        } else if(this.periodBarTracker == 1) {
            this.setPomodoroHelper(1, 0);
        } else if(this.periodBarTracker == 2) {
            this.setPeriodBarTrackerValueToZero();
            this.setPomodoroHelper(0, 2);
        }
    }
    
    setPeriodBarTrackerValueToZero() {
        if(this.periodBarTracker < 2) return;
        return this.periodBarTracker = 0;
    }

    setPomodoroHelper(n, prevTrackerValue) {
        this.changingPrevTrackerBarValueItemStuffInSetPomodoroFunc(prevTrackerValue);
        this.switchingBetweenPomodoroAndShortBreakPeriods(n);
        this.switchingBetweenPomodoroAndLongBreakPeriods();
        // this.periodBarTracker += n;
        this.setClockTime();
    };

    changingPrevTrackerBarValueItemStuffInSetPomodoroFunc(prevTrackerVal) {
        periodBarChildsArr[this.periodBarTracker].style.background = "";
        periodBarChildsArr[this.periodBarTracker].classList.remove("sbBackground");
        periodBarChildsArr[this.periodBarTracker].style.pointerEvents = "auto";
    }

    switchingBetweenPomodoroAndShortBreakPeriods(n) {
        if(this.pomodoroTracker > 4) return; // when this.pomodoroTracker is greater than 4 or starts with 5; then we want to switch to the longBreakMode;
        this.pomodoroTracker++;
        // alert(this.pomodoroTracker);

        if(this.pomodoroTracker % 2 == 0) {
            // alert('even')
            this.setPeriodBackgroundClassAddFunc(-1);
            this.periodBarTracker -= 1;
            this.setClockTime();
            
        } else {
            this.setPeriodBackgroundClassAddFunc(1);
            this.periodBarTracker += 1;
            this.setClockTime();
        }
    }

    setPeriodBackgroundClassAddFunc(num) {
        periodBarChildsArr[this.periodBarTracker + num].classList.add("sbBackground");
        periodBarChildsArr[this.periodBarTracker + num].style.pointerEvents = "none";
    }
    setPeriodBackgroundClassRemoveFunc(num) {
        periodBarChildsArr[this.periodBarTracker + num].classList.remove("sbBackground");
        periodBarChildsArr[this.periodBarTracker + num].style.pointerEvents = "auto";
    }
    
    switchingBetweenPomodoroAndLongBreakPeriods() {
        if(this.pomodoroTracker < 5 || this.pomodoroTracker > 7) return;
        this.pomodoroTracker++;
        if(this.pomodoroTracker == 6) {
            this.periodBarTracker = 2;
            this.setClockTime();
            this.setPeriodBackgroundClassAddFunc(0);
            this.setPeriodBackgroundClassRemoveFunc(-1);
            
        } else {
            this.pomodoroTracker = 0;
            this.setPeriodBackgroundClassRemoveFunc(2);
            this.periodBarTracker = 0;
            this.setPeriodBackgroundClassAddFunc(0);
            this.setClockTime();
        }
        
    };
    
    setBackTotheTrackOfSetPomodoro() {
        if(this.periodBarTracker == 2) {
            // alert(5);
            this.pomodoroTracker = 5;
            this.switchingBetweenPomodoroAndLongBreakPeriods();
        } else if(this.periodBarTracker == 1) {
            this.pomodoroTracker = 0;
            this.periodBarTracker = 0;
            this.switchingBetweenPomodoroAndShortBreakPeriods();
            // this.setPeriodBackgroundClassRemoveFunc(0);
        } else {
            this.pomodoroTracker = 0;
        }
    };

};

// Invoking clock Class functions;
let clockClassVar = new clock();
clockClassVar.checkForClockContClick();
clockClassVar.spaceBarPauseCheck();
clockClassVar.switchChildsOfPeriodBar();
clockClassVar.switchPeriodBarMobileVersion();
clockClassVar.applyBtnClickEvent();
clockClassVar.removeClassFromLastTimeLeftChildInPeriodBar();