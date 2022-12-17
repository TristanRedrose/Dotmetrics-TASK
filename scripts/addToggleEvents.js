const toggleElementIsActive = (element, setAsActive) => {
    element.className = setAsActive
        ? element.className + " active"
        : element.className.replace(" active", "");
}

const toggleArrowActive = (element, setAsActive) => {
    element.className = setAsActive
        ? element.className + " dropped"
        : element.className.replace(" dropped", "");
}

const closeInnerSections = (element) => {
    let activeElements = element.querySelectorAll(".active");
    let activeArrows = element.querySelectorAll(".dropped");

    if (activeElements.length !== 0) {
        activeElements.forEach(activeElement => {
            toggleElementIsActive(activeElement, false);
        });
    }

    if (activeArrows.length !== 0) {
        activeArrows.forEach(activeArrow => {
            toggleArrowActive(activeArrow, false);
        });
    }
}

const addWebgroupToggle = () => {
    const organizations = document.querySelectorAll(".body-row--organization");

    organizations.forEach(organization => {
        organization.addEventListener('click', () => {
            const parentElement = organization.parentNode;
            const arrow = parentElement.querySelector(".arrow");
            const webgroups = parentElement.querySelectorAll(".body-row--webgroup");

            if (parentElement.querySelectorAll(".active").length !== 0) {
                closeInnerSections(parentElement)
            } else {
                webgroups.forEach(webgroup => {
                    toggleElementIsActive(webgroup, true);
                    if (arrow.className !== "arrow dropped") toggleArrowActive(arrow, true);  
                })
            }
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
                if (arrow.className !== `arrow`) toggleArrowActive(arrow, false);
            } else {
                toggleElementIsActive(sectionsHeader, true);
                toggleElementIsActive(websiteSections, true);
                if (arrow.className !== `arrow dropped`) toggleArrowActive(arrow, true);
            }
        })
    })
}

const addToggleEvents = () => {
    addWebgroupToggle();
    addSectionsToggle();
}