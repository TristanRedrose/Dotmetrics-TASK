const fetchWebsitesData = async() => {
    return fetch("https://demo-api.dotmetrics.net/v1/public/organizations/list?pageSize=12&page=1", {method: "GET"})
        .then(res => res.json())
        .catch(err => console.warn("Something went wrong while fetching data", err));
}

const populateTableOrgranization = (organizationName) => {
    const table = document.querySelector(".main-table");
    const tableBody = document.createElement("tbody");
    tableBody.className = "table-body";

    const organizationRow = 
    `
    <tr class="body-row--organization">
        <th class="body-head--company" colspan="3">
            <div class="body-head--arrowbox">
                <div class="arrow"></div>
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

const populateTableWebgroups = (name, statusCode) => {
    const status = getStatus(statusCode)
    const tables = document.querySelectorAll(".main-table");
    const container = tables[tables.length - 1];
    const tableRow = document.createElement("tr");
    tableRow.className = "body-row--webgroup";

    const webgroup = 
    `
    <td class="body-row--column1">
        <div class="table-column--checkbox">
        </div>
        <div class="table-column--arrowbox">
            <div class="arrow"></div>
        </div>
        <img class="table-column--icon" src="./Assets/icon.png" alt="webgroup-icon">
        ${name}
    </td>
    <td class=body-row--column2>
        24
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
}

const populateTable = async() => {
    const websitesData = await fetchWebsitesData();
    websitesData.result.map(item => {
        populateTableOrgranization(item.name);
        item.websites.map(item => populateTableWebgroups(item.name, item.status))
    });
    

    console.log(websitesData);
}

populateTable();
