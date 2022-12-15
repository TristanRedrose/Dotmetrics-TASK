const toggleElementIsActive = (element, setAsActive) => {
    element.className = setAsActive
        ? element.className + " active"
        : element.className.replace(" active", "");
}

const toggleArrow = (element, setAsActive) => {
    element.className = setAsActive
        ? element.className + " dropped"
        : element.className.replace(" dropped", "");
}

const closeInnerSections = (element) => {
    const activeElements = element.querySelectorAll(".active");
    const activeArrows = element.querySelectorAll(".dropped");

    activeElements.forEach(activeElement => {
        toggleElementIsActive(activeElement, false);
    });

    activeArrows.forEach(activeArrow => {
        toggleArrow(activeArrow, false);
    });
}

const addWebgroupToggle = () => {
    const organizations = document.querySelectorAll(".body-row--organization");

    organizations.forEach(organization => {
        organization.addEventListener('click', () => {
            const parentElement = organization.parentNode;
            const arrow = parentElement.querySelector(".arrow");
            const webgroupClassName = "body-row--webgroup";
            const arrowClassName = "arrow";
            const webgroups = parentElement.querySelectorAll(`.${webgroupClassName}`);

            webgroups.forEach(webgroup => {
                if (webgroup.className === `body-row--webgroup active`) {
                    toggleElementIsActive(webgroup, false);
                    if (arrow.className !== `${arrowClassName}`) toggleArrow(arrow, false);
                } else {
                    toggleElementIsActive(webgroup, true);
                    if (arrow.className !== `${arrowClassName} dropped`) toggleArrow(arrow, true);
                }
            })
        })
    })
};

const addSectionsToggle = (element) => {
    const webgroups = document.querySelectorAll(".body-row--webgroup");

    webgroups.forEach(webgroup => {
        webgroup.addEventListener('click', () => {
            const arrow = webgroup.querySelector(".arrow");
            const sectionsHeader = webgroup.nextSibling;
            const websiteSections = sectionsHeader.nextSibling;


            if (sectionsHeader.className === `website-sections--header active`) {
                toggleElementIsActive(sectionsHeader, false);
                toggleElementIsActive(websiteSections, false);
                if (arrow.className !== `arrow`) toggleArrow(arrow, false);
            } else {
                toggleElementIsActive(sectionsHeader, true);
                toggleElementIsActive(websiteSections, true);
                if (arrow.className !== `arrow dropped`) toggleArrow(arrow, true);
            }
        })
    })
}

const addToggleEvents = () => {
    addWebgroupToggle();
    addSectionsToggle();
}

setTimeout(() => {
    addToggleEvents();
}, 1000)
