function displayResourcesId() {
    let rows = document.querySelectorAll("div[class^='x-grid3-row']:not([data-resname]):not([data-resid])")

    // For each row
    for (var i = 0; i < rows.length; i++) {
        let row = rows[i];

        // Check if row contains resources data
        let rowNodes = row.getElementsByClassName('x-tree3-node');
        if (rowNodes.length > 0) {
            // Get row data element
            let rowNode = rowNodes[0];
            // Get resource id from id attribute
            let resID = rowNode.getAttribute('id').replace('Direct Planning Tree_', '');
            let nameElem = rowNode.getElementsByClassName('x-tree3-node-text')[0];
            let resourceName = nameElem.innerHTML.replace(/"/g, '').replace(/\s\s+/g, ' ');
            row.setAttribute('data-resid', resID);
            row.setAttribute('data-resname', resourceName);
            console.log(resID, resourceName)
        }
    }
}

document.getElementsByClassName('x-grid3-scroller')[0].onscroll = displayResourcesId;