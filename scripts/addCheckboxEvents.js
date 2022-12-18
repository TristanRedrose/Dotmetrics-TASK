const addCheckboxEvents = () => {
    const organizations = document.querySelectorAll(".table-body");

    organizations.forEach(organization => {
        const webgroups = organization.querySelectorAll(".body-row--webgroup");

        webgroups.forEach(webgroup => {
            const sectionSelector = webgroup.querySelector(".table-column--checkbox");
            const header = webgroup.nextElementSibling;
            const section = header.nextElementSibling;
            const checkBoxes = section.querySelectorAll(".website-section--checkbox");
            const itemCount = checkBoxes.length;
            let activeItemCount = section.querySelectorAll(".website-section--checkbox.checked").length;

            checkBoxes.forEach(checkBox => {
                checkBox.addEventListener('click', () => {
                    if (checkBox.className === "website-section--checkbox") {
                        checkBox.className = "website-section--checkbox checked";
                        activeItemCount ++;
                        if (activeItemCount === itemCount) {
                            sectionSelector.className = "table-column--checkbox checked";
                        } else  {
                            sectionSelector.className = "table-column--checkbox indeterminate";
                        }
                    } else {
                        checkBox.className = "website-section--checkbox";
                        activeItemCount --;
                        if (activeItemCount > 0) {
                            sectionSelector.className = "table-column--checkbox indeterminate";
                        } else  {
                            sectionSelector.className = "table-column--checkbox";
                        }
                    }
                })
            })
            
            sectionSelector.addEventListener('click', () => {
                if (sectionSelector.className === "table-column--checkbox") {
                    sectionSelector.className = "table-column--checkbox checked";
                    checkBoxes.forEach(checkBox => {
                        checkBox.className = "website-section--checkbox checked";
                        activeItemCount = itemCount;
                    })
                } else {
                    sectionSelector.className = "table-column--checkbox";
                    checkBoxes.forEach(checkBox => {
                        checkBox.className = "website-section--checkbox";
                        activeItemCount = 0;
                    })
                }
            })  
        })
    })
}