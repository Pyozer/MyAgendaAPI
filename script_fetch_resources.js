class Tree {
    constructor(children = []) {
        this.children = children;
    }
}

Tree.prototype.toString = () => {
    let elemsStr = '';
    this.children.forEach(function (elem) {
        elemsStr += elem.toString();
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

Node.prototype.toString = () => {
    if (this.children.length < 1) {
        return "\"" + this.label + "\": " + this.resID + ",";
    } else {
        let elemsStr = '';
        this.children.forEach(function (elem) {
            elemsStr += elem.toString();
        });
        return "\"" + this.label + "\": {" + elemsStr + "},";
    }
}

const pushToLevel = (element, valueToPush, actualLevel, levelTarget) => {
    if (element.children == null) {
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

const parseHTML = () => {
    let rows = document.querySelectorAll('div[class^="x-grid3-row"]');

    let element = new Tree();

    for (var i = 0; i < rows.length; i++) {
        let row = rows[i];

        if (row.hasAttribute('aria-level') && row.hasAttribute('data-resid') && row.hasAttribute('data-resname')) {

            let level = row.getAttribute('aria-level');
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

    let json = element.toString().replace(/,\}/g, '}').replace(/\}\}/g, '}}');
    console.log(json);
}