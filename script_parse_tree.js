class Tree {
    constructor(children = []) {
        this.children = children;
    }

    toString = () => {
        let elemsStr = '';
        this.children.forEach((elem) => {
            elemsStr += elem.toString();
        });
        return "{" + elemsStr + "}";
    }
}

class Node {
    constructor(label, resID, children = []) {
        this.label = label;
        this.originalLabel = label;
        this.resID = resID;
        this.children = children;
    }
    toString = () => {
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
}

function pushToLevel(element, valueToPush, actualLevel, levelTarget) {
    if (element == null) return;
    if (element.children == null) {
        element.children = [];
    }

    if (actualLevel === levelTarget) {
        let duplicateNumber = 0;
        element.children.forEach((value) => {
            if (value.originalLabel === valueToPush.originalLabel) {
                duplicateNumber++;
            }
        });
        if (duplicateNumber > 0) {
            valueToPush.label += ` (${duplicateNumber})`
        }
        element.children.push(valueToPush);
    } else {
        let level = element.children.length - 1;
        pushToLevel(element.children[level], valueToPush, actualLevel + 1, levelTarget);
    }
}

function parseHTML() {
    let rows = document.querySelectorAll('div[class^="treeline"], div[class^="treelineselected"]');

    let element = new Tree([]);

    for (var i = 0; i < rows.length; i++) {
        let row = rows[i];

        let level = row.firstChild.textContent.split("   ").length;
        console.log(level);


        let aTag = row.querySelector('.treebranch a, .treeitem a, .treecategory a');
        console.log(aTag);

        let resID;
        const href = `${aTag.href}`;
        if (!href.startsWith('javascript:checkCategory(')) {
            let match = href.match('([0-9]+)');
            console.log(match);

            if (match[1]) {
                resID = match[1];
            }
        }

        let resName = aTag.text.replace(/"/g, "").replace('  	', ' ');
        if (!resID) {
            resID = -1;
        }
        if (!resName) {
            resName = "null";
        }

        pushToLevel(element, new Node(resName, resID, []), 1, level);
    }

    console.log(element);

    let json = element.toString().replace(/,\}/g, '}').replace(/\}\}/g, '}}');
    console.log(json);
}