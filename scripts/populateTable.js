const populateTableOrgranization = (index, organizationName) => {
    const table = document.querySelector(".main-table");
    const tableBody = document.createElement("tbody");
    tableBody.className = "table-body";

    let arrowClass =  index 
        ? "arrow"
        : "arrow dropped";

    const organizationRow = 
    `
    <tr class="body-row--organization">
        <th class="body-head--company" colspan="3">
            <div class="body-head--arrowbox">
                <div class="${arrowClass}"></div>
            </div>
            ${organizationName}
        </th> 
    </tr>
    `;

    tableBody.innerHTML = organizationRow;
    table.appendChild(tableBody);
}

const getStatus = (statusCode) => {
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

const getWebsiteSectionHTML = (section) => {
    const status = getStatus(section.status);
    const websiteSection =
    `
    <div class="website-section">
        <div class="website-section--checkbox">
        </div>
        ${section.name}
        <div class="website-section--iconbox" >
            <div class="status-icon ${status.icon}">
                <div class="tooltip">
                    <p>${status.label}</p>
                </div>
            </div>
        </div>
        <div class="website-section--menu">
            <div class="dropdown-menu--container">
                <div class="oval"></div>
                <div class="oval"></div>
                <div class="oval"></div>
                <div class="dropdown-menu">
                    <div class="dropdown-menu--header">
                        Generate tags as
                    </div>
                    <div class="dropdown-menu--row">
                        Numeric ID
                    </div>
                    <div class="dropdown-menu--row">
                        Amp Code
                    </div>
                    <div class="dropdown-menu--row">
                        String Code
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return websiteSection;
}

const addSectionsGroup = (sectionsGroup) => {
    let groupedSections = 
    `
    <div class="website-sections--container">
        ${sectionsGroup}
    </div>    
    `;

    return groupedSections;
}

const getAllSectionsHTML = (sections) => {
    let websiteSectionsHTML = ``
    let sectionsGroup = ``
    sections.map((section, index) => {
        if (sections.length - 1 === 0) {
            websiteSectionsHTML += addSectionsGroup(getWebsiteSectionHTML(section));
        } else if (index % 4 === 0 && index === sections.length -1) {
            websiteSectionsHTML += addSectionsGroup(sectionsGroup) ;

            sectionsGroup = 
            `
            ${getWebsiteSectionHTML(section)}
            `;

            websiteSectionsHTML += addSectionsGroup(sectionsGroup);

        } else if (index === sections.length - 1) {
            sectionsGroup += getWebsiteSectionHTML(section);

            websiteSectionsHTML += addSectionsGroup(sectionsGroup);

        } else if (index > 0 && index % 4 === 0) {
            websiteSectionsHTML += addSectionsGroup(sectionsGroup) ;

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

const populateTableWebgroup = (index, name, statusCode, sections) => {
    const status = getStatus(statusCode)
    const tables = document.querySelectorAll(".table-body");
    const container = tables[tables.length - 1];
    const tableRow = document.createElement("tr");
    tableRow.className = index
        ? "body-row--webgroup"
        : "body-row--webgroup active";

    const webgroup = 
    `
    <td class="body-row--column1">
        <div class="table-column--checkbox">
        </div>
        <div class="table-column--arrowbox">
            <div class="arrow"></div>
        </div>
        <img class="table-column--icon" src="./assets/icon.png" alt="webgroup-icon">
        ${name}
    </td>
    <td class=body-row--column2>
        ${sections.length}
    </td>
    <td class="body-row--column3">
        <div class="status-iconbox">
            <div class="status-icon ${status.icon}"></div>
        </div>
        ${status.label}
    </td>
    `;

    tableRow.innerHTML = webgroup;
    container.appendChild(tableRow);

    const sectionsHeader = document.createElement("tr");
    sectionsHeader.className = "website-sections--header";
    sectionsHeader.innerHTML = 
    `
    <th class="website-header" colspan="3">
        Website Sections
    </th>
    `;
    container.appendChild(sectionsHeader);

    const sectionsHTML = getAllSectionsHTML(sections);
    const websiteSections = document.createElement("tr");
    websiteSections.className = "website-sections--row";
    websiteSections.innerHTML = 
    `
    <td colspan="3">
        <div class="website-sections--body">
            ${sectionsHTML}
        </div>
    </td>
    `;
    container.appendChild(websiteSections);
}

const populateTable = async() => {
    const websitesData = await fetchPaginatedWebsitesData();
    setTotalCount(websitesData["total-count"]);
    websitesData.result.map((item, index) => {
        populateTableOrgranization(index, item.name);
        item.websites.map(item => {
            populateTableWebgroup(index, item.name, item.status, item.sections)
        });
    });

    console.log(websitesData);
}

const clearTable = () => {
    const tableElements = document.querySelectorAll(".table-body");

    tableElements.forEach(element => {
        element.remove();
    })
}

const loadNewPage = async() => {
    clearTable();
    await populateTable();
    setPaginationItemsLabel();
    addToggleEvents();
}

const pageInit = async() => {
    await populateTable();

    addToggleEvents();
    setPaginationItemsLabel();
    addPaginationMenuEvents();
    addPaginationButtonEvents();
}

pageInit();
