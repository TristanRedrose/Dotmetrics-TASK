let page = 1;
let itemsPerPage = 25;
let totalCount = 0;
let awaitCompletion = false;

const fetchPaginatedWebsitesData = async() => {
    return fetch(`https://demo-api.dotmetrics.net/v1/public/organizations/list?pageSize=${itemsPerPage}&page=${page}`, {method: "GET"})
        .then(res => res.json())
        .catch(err => console.warn("Something went wrong while fetching data", err));
}

const setTotalCount = (itemCount) => {
    totalCount = itemCount;
}

const setAwaitCompletion = (completionPending) => {
    awaitCompletion = completionPending;
}

const setPaginationItemsLabel = () => {
    const label = document.querySelector(".pagination-items--label");
    label.innerText = `${(page - 1)*itemsPerPage + 1} - ${(page * itemsPerPage < totalCount) ? page * itemsPerPage : totalCount} of ${totalCount}`;
}

const addPaginationMenuEvents = () => {
    const menuButton = document.querySelector(".pagination-menu--button");
    const menu = document.querySelector(".pagination-dropdown--menu");
    const selectButtons = menu.querySelectorAll(".pagination-menu--select");
    const menuButtonText = menuButton.querySelector(".pagination-menu--text");
    
    menuButton.addEventListener('click', () => {
        menu.style.display = "block";
    });

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
            } else {
                menu.style.display = "none";
            }  
        })
    })
}

const addPaginationButtonEvents = () => {
    const nextPageButton = document.querySelector(".next-page--button");
    const previousPageButton = document.querySelector(".previous-page--button");
    
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