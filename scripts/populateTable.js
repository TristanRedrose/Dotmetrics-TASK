function populateTableOrgranization(index, organizationName) {
    const table = document.querySelector(".data-table");
    const tableBody = document.createElement("tbody");
    tableBody.className = "data-table__table-body";

    let arrowClass =  index 
        ? "arrow"
        : "arrow arrow--active";

    const organizationRow = 
    `
    <tr class="table-body__organization-row">
        <th class="organization-row__organization-column" colspan="3">
            <div class="organization-column__arrowbox">
                <div class="${arrowClass}"></div>
            </div>
            <span>${organizationName}</span>
        </th> 
    </tr>
    `;

    tableBody.innerHTML = organizationRow;
    table.appendChild(tableBody);
}

function getStatus(statusCode) {
    const status = [
        {label:"N/A", icon:"blank"},
        {label:"Operational", icon:"green"},
        {label:"Not operational", icon:"red"},
        {label:"Partial", icon:"yellow"},
        {label:"Pending", icon:"yellow"},
        {label:"Stopped", icon:"gray"},
    ];

    return status[+statusCode];
}

function getWebsiteSectionHTML(section)  {
    const status = getStatus(section.status);
    const websiteSection =
    `
    <div class="websites-group__website-section">
        <div class="website-section__checkbox">
        </div>
        <span>${section.name}</span>
        <div class="website-section__icon-box">
            <div class="icon-box__status-icon ${status.icon}">
                <div class="status-icon__tooltip">
                    <p>${status.label}</p>
                </div>
            </div>
        </div>
        <div class="website-section__hover-menu">
            <div class="hover-menu__container">
                <div class="oval"></div>
                <div class="oval"></div>
                <div class="oval"></div>
                <div class="hover-menu__menu-body">
                    <div class="menu-body__header">
                        Generate tags as
                    </div>
                    <div class="menu-body__row">
                        Numeric ID
                    </div>
                    <div class="menu-body__row">
                        Amp Code
                    </div>
                    <div class="menu-body__row">
                        String Code
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return websiteSection;
}

function getGroupedSectionsHTML(sectionsGroup) {
    let groupedSections = 
    `
    <div class="body-container__websites-group">
        ${sectionsGroup}
    </div>    
    `;

    return groupedSections;
}

function getAllSectionsHTML(sections) {
    let websiteSectionsHTML = ``
    let sectionsGroup = ``
    sections.map((section, index) => {
        if (sections.length - 1 === 0) {
            websiteSectionsHTML += getGroupedSectionsHTML(getWebsiteSectionHTML(section));
        } else if (index % 4 === 0 && index === sections.length -1) {
            websiteSectionsHTML += getGroupedSectionsHTML(sectionsGroup) ;

            sectionsGroup = 
            `
            ${getWebsiteSectionHTML(section)}
            `;

            websiteSectionsHTML += getGroupedSectionsHTML(sectionsGroup);

        } else if (index === sections.length - 1) {
            sectionsGroup += getWebsiteSectionHTML(section);

            websiteSectionsHTML += getGroupedSectionsHTML(sectionsGroup);

        } else if (index > 0 && index % 4 === 0) {
            websiteSectionsHTML += getGroupedSectionsHTML(sectionsGroup) ;

            sectionsGroup = 
            `
            ${getWebsiteSectionHTML(section)}
            `;

        } else {
            sectionsGroup += getWebsiteSectionHTML(section);
        }
    });

    return websiteSectionsHTML;
}

function populateTableWebgroup(index, name, statusCode, sections) {
    const status = getStatus(statusCode)
    const tables = document.querySelectorAll(".data-table__table-body");
    const container = tables[tables.length - 1];
    const tableRow = document.createElement("tr");
    tableRow.className = index
        ? "table-body__webgroup-row"
        : "table-body__webgroup-row active";

    const webgroup = 
    `
    <td class="webgroup-row__webgroup-column">
        <div class="webgroup-column__checkbox">
        </div>
        <div class="webgroup-column__arrowbox">
            <div class="arrow"></div>
        </div>
        <img class="webgroup-column__icon" src="./assets/icons/icon.png" alt="webgroup-icon">
        <span>${name}</span>
    </td>
    <td class="webgroup-row__sections-column">
        ${sections.length}
    </td>
    <td class="webgroup-row__status-column">
        <div class="status-column__icon-box">
            <div class="icon-box__status-icon ${status.icon}"></div>
        </div>
        ${status.label}
    </td>
    `;

    tableRow.innerHTML = webgroup;
    container.appendChild(tableRow);

    const sectionsHeader = document.createElement("tr");
    sectionsHeader.className = "webgroup-row__website-section-header";
    sectionsHeader.innerHTML = 
    `
    <th class="website-section-header__column" colspan="3">
        Website Sections
    </th>
    `;
    container.appendChild(sectionsHeader);

    const sectionsHTML = getAllSectionsHTML(sections);
    const websiteSections = document.createElement("tr");
    websiteSections.className = "webgroup-row__website-section-body";
    websiteSections.innerHTML = 
    `
    <td class="website-section-body__websites-column" colspan="3">
        <div class="websites-column__body-container">
            ${sectionsHTML}
        </div>
    </td>
    `;
    container.appendChild(websiteSections);
}

async function populateTable() {
    const websitesData = await fetchPaginatedWebsitesData();
    setTotalCount(websitesData["total-count"]);
    websitesData.result.map((item, index) => {
        populateTableOrgranization(index, item.name);
        item.websites.map(item => {
            populateTableWebgroup(index, item.name, item.status, item.sections)
        });
    });
}

function clearTable() {
    const tableElements = document.querySelectorAll(".data-table__table-body");

    tableElements.forEach(element => {
        element.remove();
    })
}

async function loadNewPage() {
    clearTable();
    await populateTable();
    setPaginationItemsLabel();
    addToggleEvents();
    initCheckBoxValues();
    addWebgroupCheckBoxEvents();
}

async function pageInit() {
    await populateTable();
    addToggleEvents();
    addCheckBoxEvents();
    initPagination();
}

pageInit();
