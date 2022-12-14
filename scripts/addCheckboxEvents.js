const masterCheckBoxClassName = "table-head__checkbox";
const webgroupCheckBoxClassName = "webgroup-column__checkbox"
const websiteCheckBoxClassName = "website-section__checkbox";

let masterCheckBox
let webgroupCheckBoxes
let websiteCheckBoxes
let webgroupCheckBoxCount
let activeSelectorsCount

function initCheckBoxValues() {
    webgroupCheckBoxes = document.querySelectorAll(`.${webgroupCheckBoxClassName}`);
    websiteCheckBoxes = document.querySelectorAll(`.${websiteCheckBoxClassName}`);
    masterCheckBox = document.querySelector(`.${masterCheckBoxClassName}`);
    webgroupCheckBoxCount = {
        totalBoxCount: webgroupCheckBoxes.length,
        activeBoxCount: 0
    };
    updateHeaderCheckBox();
}

function getActiveItemCount (element, className) {
    return element.querySelectorAll(`.${className}.${className}--checked`).length;
}

function setCheckBoxStatus (element, checkedStatus) {
    let options = ["checked", "indeterminate", "unchecked"];
    if (options.includes(checkedStatus) && checkedStatus !== "unchecked") {
        element.className = `${element.className.split(" ")[0]} ${element.className.split(" ")[0]}--${checkedStatus}`;
    } else {
        element.className = `${element.className.split(" ")[0]}`;
    }
}

function updateHeaderCheckBox () {
    const {totalBoxCount, activeBoxCount} = webgroupCheckBoxCount;
    if (totalBoxCount === activeBoxCount) {
        setCheckBoxStatus(masterCheckBox, "checked");
    } else {
        setCheckBoxStatus(masterCheckBox, "unchecked");
    }
}

function updateWebgroupCheckBox (element, checkBoxCount) {
    const {totalBoxCount, activeBoxCount} = checkBoxCount
    if (totalBoxCount === activeBoxCount) {
        setCheckBoxStatus(element, "checked");
    } else if (activeBoxCount > 0) {
        setCheckBoxStatus(element, "indeterminate");
    } else {
        setCheckBoxStatus(element, "unchecked");
    }
}

function addMasterCheckBoxEvent () {
    masterCheckBox.addEventListener('click', () => {
        if (masterCheckBox.className !== `${masterCheckBoxClassName} ${masterCheckBoxClassName}--checked`) {
            setCheckBoxStatus(masterCheckBox, "checked");
            webgroupCheckBoxCount.activeBoxCount = webgroupCheckBoxes.length;
            webgroupCheckBoxes.forEach(selector => {
                setCheckBoxStatus(selector, "checked");
            });
            websiteCheckBoxes.forEach(checkBox => {
                setCheckBoxStatus(checkBox, "checked");
            });
        } else {
            setCheckBoxStatus(masterCheckBox, "unchecked");
            webgroupCheckBoxCount.activeBoxCount = 0;
            webgroupCheckBoxes.forEach(selector => {
                setCheckBoxStatus(selector, "unchecked");
            });
            websiteCheckBoxes.forEach(checkBox => {
                setCheckBoxStatus(checkBox, "unchecked");
            });
        }
    })
}

function addWebgroupCheckBoxEvents() {
    const organizations = document.querySelectorAll(".data-table__table-body");

    organizations.forEach(organization => {
        const webgroups = organization.querySelectorAll(".table-body__webgroup-row");

        webgroups.forEach(webgroup => {
            const sectionSelector = webgroup.querySelector(`.${webgroupCheckBoxClassName}`);
            const header = webgroup.nextElementSibling;
            const section = header.nextElementSibling;
            const checkBoxes = section.querySelectorAll(`.${websiteCheckBoxClassName}`);
            let websiteCheckBoxCount = {
                totalBoxCount: checkBoxes.length,
                activeBoxCount: 0
            }

            checkBoxes.forEach(checkBox => {
                checkBox.addEventListener('click', () => {
                    if (checkBox.className === `${websiteCheckBoxClassName}`) {
                        setCheckBoxStatus(checkBox, "checked");
                        websiteCheckBoxCount.activeBoxCount = getActiveItemCount(section,`${websiteCheckBoxClassName}`);
                        updateWebgroupCheckBox(sectionSelector, websiteCheckBoxCount);
                        webgroupCheckBoxCount.activeBoxCount = getActiveItemCount(document, `${webgroupCheckBoxClassName}`);
                        updateHeaderCheckBox();
                    } else {
                        setCheckBoxStatus(checkBox, "unchecked");
                        websiteCheckBoxCount.activeBoxCount = getActiveItemCount(section,`${websiteCheckBoxClassName}`);
                        updateWebgroupCheckBox(sectionSelector, websiteCheckBoxCount);
                        webgroupCheckBoxCount.activeBoxCount = getActiveItemCount(document, `${webgroupCheckBoxClassName}`);
                        updateHeaderCheckBox();
                    }
                })
            })
            
            sectionSelector.addEventListener('click', event => {
                event.stopPropagation();
                if (sectionSelector.className !== `${webgroupCheckBoxClassName} ${webgroupCheckBoxClassName}--checked`) {
                    setCheckBoxStatus(sectionSelector, "checked");
                    webgroupCheckBoxCount.activeBoxCount++;
                    updateHeaderCheckBox();
                    checkBoxes.forEach(checkBox => {
                        setCheckBoxStatus(checkBox, "checked");
                    })
                } else {
                    setCheckBoxStatus(sectionSelector, "unchecked");
                    webgroupCheckBoxCount.activeBoxCount--;
                    updateHeaderCheckBox();
                    checkBoxes.forEach(checkBox => {
                        setCheckBoxStatus(checkBox, "unchecked");
                    })
                }
            })      
        })
    })
}

function addCheckBoxEvents() {
    initCheckBoxValues();
    addMasterCheckBoxEvent();
    addWebgroupCheckBoxEvents();
}