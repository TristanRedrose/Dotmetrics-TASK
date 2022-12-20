const organizationRowClassName = "table-body__organization-row";
const webgroupRowClassName = "table-body__webgroup-row";

function toggleElementIsActive(element, setAsActive) {
    element.className = setAsActive
        ? element.className + " active"
        : element.className.replace(" active", "");
}

function toggleArrowActive(element, setAsActive) {
    element.className = setAsActive
        ? `${element.className.split(" ")[0]} ${element.className.split(" ")[0]}--active`
        : `${element.className.split(" ")[0]}`;
}

function closeInnerSections(element) {
    let activeElements = element.querySelectorAll(".active");
    let activeArrows = element.querySelectorAll(".arrow--active");

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

function addWebgroupToggle() {
    const organizations = document.querySelectorAll(`.${organizationRowClassName}`);

    organizations.forEach(organization => {
        organization.addEventListener('click', () => {
            const parentElement = organization.parentNode;
            const arrow = parentElement.querySelector(".arrow");
            const webgroups = parentElement.querySelectorAll(`.${webgroupRowClassName}`);

            if (parentElement.querySelectorAll(".active").length !== 0) {
                closeInnerSections(parentElement)
            } else {
                webgroups.forEach(webgroup => {
                    toggleElementIsActive(webgroup, true);
                    if (arrow.className !== "arrow arrow--active") toggleArrowActive(arrow, true);  
                })
            }
        })
    })
};

function addSectionsToggle(element) {
    const webgroups = document.querySelectorAll(`.${webgroupRowClassName}`);

    webgroups.forEach(webgroup => {
        webgroup.addEventListener('click', () => {
            const arrow = webgroup.querySelector(".arrow");
            const sectionsHeader = webgroup.nextSibling;
            const websiteSections = sectionsHeader.nextSibling;

            if (sectionsHeader.className === `webgroup-row__website-section-header active`) {
                toggleElementIsActive(sectionsHeader, false);
                toggleElementIsActive(websiteSections, false);
                if (arrow.className !== `arrow`) toggleArrowActive(arrow, false);
            } else {
                toggleElementIsActive(sectionsHeader, true);
                toggleElementIsActive(websiteSections, true);
                if (arrow.className !== `arrow arrow--active`) toggleArrowActive(arrow, true);
            }
        })
    })
}

function addToggleEvents() {
    addWebgroupToggle();
    addSectionsToggle();
}