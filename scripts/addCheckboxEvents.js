const masterCheckBoxClassName = "table-head--checkbox";
const webgroupCheckBoxClassName = "table-column--checkbox"
const websiteCheckBoxClassName = "website-section--checkbox";

let masterCheckBox
let sectionSelectors
let websiteCheckBoxes
let sectionSelectorsCount
let activeSelectorsCount

const initCheckBoxValues = () => {
    sectionSelectors = document.querySelectorAll(`.${webgroupCheckBoxClassName}`);
    websiteCheckBoxes = document.querySelectorAll(`.${websiteCheckBoxClassName}`);
    masterCheckBox = document.querySelector(`.${masterCheckBoxClassName}`);
    sectionSelectorsCount = sectionSelectors.length;
    activeSelectorsCount = getActiveItemCount(document, `${webgroupCheckBoxClassName}`);
    adjustElementCheckbox(masterCheckBox, activeSelectorsCount, sectionSelectors);
}

const getActiveItemCount = (element, className) => {
    return element.querySelectorAll(`.${className}.checked`).length;
}

const setCheckboxStatus = (element, checkedStatus) => {
    let options = ["checked", "indeterminate", "unchecked"];
    if (options.includes(checkedStatus) && checkedStatus === "unchecked") {
        element.className = `${element.className.split(" ")[0]}`;
    } else {
        element.className = `${element.className.split(" ")[0]} ${checkedStatus}`;
    }
}

const adjustElementCheckbox = (element, activeItems, allItems) => {
    if (activeItems === allItems) {
        setCheckboxStatus(element, "checked");
    } else if (activeItems > 0) {
        setCheckboxStatus(element, "indeterminate");
    } else {
        setCheckboxStatus(element, "unchecked");
    }
}

const addMasterCheckBoxEvent = () => {
    masterCheckBox.addEventListener('click', () => {
        if (masterCheckBox.className === `${masterCheckBoxClassName}`) {
            setCheckboxStatus(masterCheckBox, "checked");
            activeSelectorsCount = sectionSelectorsCount;
            sectionSelectors.forEach(selector => {
                setCheckboxStatus(selector, "checked");
            });
            websiteCheckBoxes.forEach(checkBox => {
                setCheckboxStatus(checkBox, "checked");
            });
        } else {
            setCheckboxStatus(masterCheckBox, "unchecked");
            activeSelectorsCount = 0;
            sectionSelectors.forEach(selector => {
                setCheckboxStatus(selector, "unchecked");
            });
            websiteCheckBoxes.forEach(checkBox => {
                setCheckboxStatus(checkBox, "unchecked");
            });
        }
    })
}

const addWebgroupCheckBoxEvents = () => {
    const organizations = document.querySelectorAll(".table-body");

    organizations.forEach(organization => {
        const webgroups = organization.querySelectorAll(".body-row--webgroup");

        webgroups.forEach(webgroup => {
            const sectionSelector = webgroup.querySelector(`.${webgroupCheckBoxClassName}`);
            const header = webgroup.nextElementSibling;
            const section = header.nextElementSibling;
            const checkBoxes = section.querySelectorAll(`.${websiteCheckBoxClassName}`);
            const itemCount = checkBoxes.length;

            checkBoxes.forEach(checkBox => {
                checkBox.addEventListener('click', () => {
                    if (checkBox.className === `${websiteCheckBoxClassName}`) {
                        setCheckboxStatus(checkBox, "checked");
                        let activeItemCount = getActiveItemCount(section,`${websiteCheckBoxClassName}`);
                        adjustElementCheckbox(sectionSelector, activeItemCount, itemCount);
                        activeSelectorsCount = getActiveItemCount(document, `${webgroupCheckBoxClassName}`);
                        adjustElementCheckbox(masterCheckBox, activeSelectorsCount, sectionSelectorsCount);
                    } else {
                        setCheckboxStatus(checkBox, "unchecked");
                        let activeItemCount = getActiveItemCount(section,`${websiteCheckBoxClassName}`);
                        adjustElementCheckbox(sectionSelector, activeItemCount, itemCount);
                        activeSelectorsCount = getActiveItemCount(document, `${webgroupCheckBoxClassName}`);
                        adjustElementCheckbox(masterCheckBox, activeSelectorsCount, sectionSelectorsCount);
                    }
                })
            })
            
            sectionSelector.addEventListener('click', event => {
                event.stopPropagation();
                if (sectionSelector.className !== `${webgroupCheckBoxClassName} checked`) {
                    setCheckboxStatus(sectionSelector, "checked");
                    activeSelectorsCount++;
                    adjustElementCheckbox(masterCheckBox, activeSelectorsCount, sectionSelectorsCount);
                    checkBoxes.forEach(checkBox => {
                        setCheckboxStatus(checkBox, "checked");
                    })
                } else {
                    setCheckboxStatus(sectionSelector, "unchecked");
                    activeSelectorsCount--;
                    adjustElementCheckbox(masterCheckBox, activeSelectorsCount, sectionSelectorsCount);
                    checkBoxes.forEach(checkBox => {
                        setCheckboxStatus(checkBox, "unchecked");
                    })
                }
            })      
        })
    })
}

const addCheckBoxEvents = () => {
    initCheckBoxValues();
    addMasterCheckBoxEvent();
    addWebgroupCheckBoxEvents();
}