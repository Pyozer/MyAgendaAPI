class Tree {
    constructor(children = []) {
        this.children = children;
    }
}

function treeToString(tree) {
    let elemsStr = '';
    tree.children.forEach(function (elem) {
        elemsStr += nodeToString(elem);
    });
    return "{" + elemsStr + "}";
}

class Node {
    constructor(label, resID, children = []) {
        this.label = label;
        this.resID = resID;
        this.children = children;
    }
}

function nodeToString(node) {
    if (node.children.length < 1) {
        return "\"" + node.label + "\": " + node.resID + ",";
    } else {
        let elemsStr = '';
        node.children.forEach(function (elem) {
            elemsStr += nodeToString(elem);
        });
        return "\"" + node.label + "\": {" + elemsStr + "},";
    }
}

function pushToLevel(element, valueToPush, actualLevel, levelTarget) {
    if (!element.children) {
        element.children = [];
    }
    let level = element.children.length - 1;
    let next = element.children[level];

    if (actualLevel == levelTarget) {
        element.children.push(valueToPush);
    } else if (next != null) {
        pushToLevel(element.children[level], valueToPush, actualLevel + 1, levelTarget);
    }
}

function parseHTML() {
    let rows = document.querySelectorAll('div[class^="x-grid3-row"]');

    let element = new Tree();

    for (var i = 0; i < rows.length; i++) {
        let row = rows[i];

        if (row.hasAttribute('aria-level') && row.hasAttribute('data-resid') && row.hasAttribute('data-resname')) {
            let level = parseInt(row.getAttribute('aria-level'));
            let resID = row.getAttribute('data-resid');
            let resName = row.getAttribute('data-resname').replace(/"/g, "");
            if (resID == null) {
                resID = -1;
            } if (resName == null) {
                resName = "null";
            }
            pushToLevel(element, new Node(resName, resID), 1, level);
        }
    }

    let json = treeToString(element).replace(/,\}/g, '}').replace(/\}\}/g, '}}');
    console.log(json);
}