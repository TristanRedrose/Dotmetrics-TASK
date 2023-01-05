let page = 1;
let itemsPerPage = 25;
let totalCount = 0;
let awaitCompletion = false;

function getDelayedResults() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mocklist.result.filter((item, index) => (index >= ((page -1) * itemsPerPage)) && (index < ((page) * itemsPerPage))));
      }, 300);
    });
 }

async function fetchPaginatedWebsitesData() {
    const results = await getDelayedResults();

    setTotalCount(mocklist.result.length);
    return results;
}

function setTotalCount(itemCount) {
    totalCount = itemCount;
}

function setAwaitCompletion(completionPending) {
    awaitCompletion = completionPending;
}

function initPaginationContainer() {
    const container = document.querySelector(".pagination-container");
    if (container.className !== ".pagination-container.pagination-container--active" && totalCount > 25 ){
        container.className = "pagination-container pagination-container--active";
    }
}

function setPaginationItemsLabel() {
    const label = document.querySelector(".pagination-items--label");
    let hyphen = (page * itemsPerPage) < 100
    ? "\u2014"
    : "-";
    label.innerText = `${(page - 1)*itemsPerPage + 1} ${hyphen} ${(page * itemsPerPage < totalCount) ? page * itemsPerPage : totalCount} of ${totalCount}`;
}

function addPaginationMenuEvents() {
    const menuButton = document.querySelector(".pagination-container__menu-button");
    const menuButtonText = menuButton.querySelector(".menu-button__item-counter");
    const menu = document.querySelector(".pagination-container__item-count-dropdown-menu");
    const selectButtons = menu.querySelectorAll(".item-count-dropdown-menu__selector");
    
    menuButton.addEventListener('click', () => {
        menu.className = `${menu.className.split(" ")[0]} ${menu.className.split(" ")[0]}--active`
        menu.setAttribute('tabindex', 0);
        menu.focus();
    });

    menu.addEventListener("focusout", () => {
        menu.className = `${menu.className.split(" ")[0]}`
    })

    selectButtons.forEach(selectButton => {
        selectButton.addEventListener('click', async() => {

            const selectButtonText = selectButton.querySelector("span").innerText;

            if (selectButtonText !== menuButtonText.innerText) {
                setAwaitCompletion(true);
                menu.className = `${menu.className.split(" ")[0]}`
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
    initPaginationContainer();
    setPaginationItemsLabel();
    addPaginationMenuEvents();
    addPaginationButtonEvents();
}