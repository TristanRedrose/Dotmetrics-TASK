let page = 1;
let itemsPerPage = 25;
let totalCount = 0;
let awaitCompletion = false;

async function fetchPaginatedWebsitesData() {
    return fetch(`https://demo-api.dotmetrics.net/v1/public/organizations/list?pageSize=${itemsPerPage}&page=${page}`, {method: "GET"})
        .then(res => res.json())
        .catch(err => console.warn("Something went wrong while fetching data", err));
}

function setTotalCount(itemCount) {
    totalCount = itemCount;
}

function setAwaitCompletion(completionPending) {
    awaitCompletion = completionPending;
}

function setPaginationItemsLabel() {
    const label = document.querySelector(".pagination-items--label");
    label.innerText = `${(page - 1)*itemsPerPage + 1} - ${(page * itemsPerPage < totalCount) ? page * itemsPerPage : totalCount} of ${totalCount}`;
}

function addPaginationMenuEvents() {
    const menuButton = document.querySelector(".pagination-container__menu-button");
    const menuButtonText = menuButton.querySelector(".menu-button__current-items-per-page");
    const menu = document.querySelector(".pagination-container__item-count-dropdown-menu");
    const selectButtons = menu.querySelectorAll(".item-count-dropdown-menu__selector");
    
    menuButton.addEventListener('click', () => {
        menu.style.display = "block";
        menu.setAttribute('tabindex', 0);
        menu.focus();
    });

    menu.addEventListener("focusout", () => {
        menu.style.display = "none";
    })

    selectButtons.forEach(selectButton => {
        selectButton.addEventListener('click', async() => {

            const selectButtonText = selectButton.querySelector("span").innerText;

            if (selectButtonText !== menuButtonText.innerText) {
                setAwaitCompletion(true);
                menu.style.display = "none";
                itemsPerPage = selectButton.querySelector("span").innerText;
                menuButtonText.innerText = itemsPerPage;
                page = 1;
                setPaginationItemsLabel();
                await loadNewPage();
                setAwaitCompletion(false);
            }
        })
    })
}

function addPaginationButtonEvents() {
    const nextPageButton = document.querySelector(".pagination-container__page-button.pagination-container__page-button--right");
    const previousPageButton = document.querySelector(".pagination-container__page-button");
    
    previousPageButton.addEventListener('click', async() => {
        if (page > 1 && !awaitCompletion) {
            setAwaitCompletion(true);
            page --;
            await loadNewPage();
            setAwaitCompletion(false);
        }
    })

    nextPageButton.addEventListener('click', async() => {
        if (page < Math.ceil(totalCount / itemsPerPage) && !awaitCompletion) {
            setAwaitCompletion(true);
            page ++;
            await loadNewPage();
            setAwaitCompletion(false);
        }
    })
}

function initPagination () {
    setPaginationItemsLabel();
    addPaginationMenuEvents();
    addPaginationButtonEvents();
}