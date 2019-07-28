'use strict'

let fs = require('fs'),
    fabric = require('fabric').fabric,
    Canvas = require('canvas'),
    PDF = require('pdfkit');

class GroupPowerCard {
    constructor(powers) {
        this.powers = powers;
        this.sizePaper = {
            width: 1240,
            height: 1754
        };
        this.sizeCard = {
            width: 375,
            height: 523
        };

        this.spaceWidth = 57.5;
        this.spaceHeight = 92.5;

        this.pagination = {
          maxLine: 3,
          maxCol: 3
        };

        this.powerPagined = [];
        this.images = [];
    }

    generateForPrint() {
        let classParent = this;
        classParent.preparePagination();
        classParent.powerPagined.forEach(function(fabricGroups, index) {
            classParent.generateImg(fabricGroups);
        });
        this.generatePDF();
    }

    preparePagination() {
        let classParent = this;
        classParent.powerPagined = [];
        let maxElementByPage = this.pagination.maxLine * this.pagination.maxCol;
        let cpt = {
            line: 0,
            col: 0
        };
        let elementInPagePile = [];
        let elementInPageFace = [];
        this.powers.forEach(function (power, index) {
            if(elementInPageFace.length === maxElementByPage) {
                //Reinit all
                cpt = {
                    line: 0,
                    col: 0
                };

                classParent.powerPagined.push(elementInPageFace);
                classParent.powerPagined.push(elementInPagePile);

                elementInPageFace = [];
                elementInPagePile = [];
            }

            let groupFabricFace = power.generateCard().face;
            console.log(groupFabricFace);

            groupFabricFace.top = classParent.spaceHeight + classParent.sizeCard.height * cpt.line;
            groupFabricFace.left = classParent.spaceWidth + classParent.sizeCard.width * cpt.col;

            /*groupFabricFace.set({
                top: classParent.spaceHeight + classParent.sizeCard.height * cpt.line,
                left:classParent.spaceWidth + classParent.sizeCard.width * cpt.col
            });*/
            elementInPageFace.push(groupFabricFace);

            let groupFabricPile = power.generateCard().pile;

            groupFabricPile.top = classParent.spaceHeight + classParent.sizeCard.height * cpt.line;
            groupFabricPile.left = classParent.spaceWidth + classParent.sizeCard.width * (2 - cpt.col)
            /*groupFabricPile.set({
                top: classParent.spaceHeight + classParent.sizeCard.height * cpt.line,
                left:classParent.spaceWidth + classParent.sizeCard.width * (2 - cpt.col)
            });*/
            elementInPagePile.push(groupFabricPile);

            cpt.col++;
            if(cpt.col > 2) {
                cpt.col = 0;
                cpt.line++;
            }
        });

        classParent.powerPagined.push(elementInPageFace);
        classParent.powerPagined.push(elementInPagePile);
    }

    generateImg(fabricGroups) {
        let canvas2 = new fabric.StaticCanvas('c_background', this.sizePaper);

        fabricGroups.forEach(function(group) {
            canvas2.add(group);
        });

        let imgExport = canvas2.toDataURL({ format: 'png' });
        this.images.push(imgExport);
        /*const imageSrcExport = imgExport.replace(/^data:image\/png;base64,/, '');
        fs.writeFileSync(path, imageSrcExport, 'base64');*/
    }

    generatePDF() {
        let doc = new PDF({
            size: [this.sizePaper.width, this.sizePaper.height],
            margins : {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        });
        doc.pipe(fs.createWriteStream('testing_file.pdf'));

        this.images.forEach(function(image) {
            doc.image(new Buffer(image.replace('data:image/png;base64,',''), 'base64'), 0, 0, {
                align: 'center',
                valign: 'center'
            });
            doc.addPage();
        });

        doc.end();
    }
}


module.exports = {
  GroupPowerCard
};
