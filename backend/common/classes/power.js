let fs = require('fs'),
    fabric = require('fabric').fabric,
    Canvas = require('canvas');


let { AVolonte,
    Inconnu,
    Quotidien,
    Trait,
    Rencontre,
    Utilitaire,
    UtilitaireAVolonte,
    UtilitaireQuotidien,
    UtilitaireRencontre } = require("./card.js");

class Power {
    constructor(data) {
        this.name = data.name || '';
        this.textType = data.textType || '';
        this.originType = data.originType;
        this.orgineName = data.orgineName;
        this.level = data.level || 1;
        this.description = data.description || '';
        this.type = data.type;
        this.frequency = data.frequency;
        this.keywords = data.keywords || [];
        this.typeAction = data.typeAction;
        this.typeAttaque = data.typeAttaque;
        this.scope = data.scope;
        this.text = data.text.split('\n') || '';
        this.book = data.book || { name: '', page: '' };

        this.card = false;
    }

    generateCard() {
        if(!this.card) {
          let classParent = this;

          let cardObj = Inconnu;
          switch (this.type) {
            case 'A volonté':
              cardObj = AVolonte;
              break;
            case 'Quotidien':
              cardObj = Quotidien;
              break;
            case 'Rencontre':
              cardObj = Rencontre;
              break;
            case 'Trait':
              cardObj = Trait;
              break;
            case 'Utilitaire':
              cardObj = Utilitaire;
              break;
          }

          //Generate the Face card Group
          let groupFabricObjFace = [];
          //Generate the card background
          let img = new Canvas.Image();
          img.src = fs.readFileSync(cardObj.imagePath());
          groupFabricObjFace.push(new fabric.Image(img));


          //Add Name to card
          let sizeTextName = 30;
          if (classParent.name.length > 24) {
            sizeTextName = 25;
          }
          if (classParent.name.length > 30) {
            sizeTextName = 20;
          }
          if (classParent.name.length > 39) {
            sizeTextName = 15;
          }

          groupFabricObjFace.push(new fabric.Textbox(classParent.name, {
            fill: '#FFF',
            fontSize: sizeTextName,
            fontFamily: 'Arial',
            top: 0,
            left: 0,
            width: cardObj.size().width,
            textAlign: 'center'
          }));

          //Add textType to Card
          groupFabricObjFace.push(new fabric.Textbox(classParent.textType, {
            fill: '#FFF',
            fontSize: 20,
            fontFamily: 'Arial',
            top: 30,
            left: 0,
            width: cardObj.size().width,
            textAlign: 'center'
          }));

          //Add description to card
          groupFabricObjFace.push(new fabric.Textbox(classParent.description, {
            fill: '#000',
            fontSize: 10,
            fontFamily: 'Arial',
            fontStyle: 'italic',
            top: 75,
            left: 5,
            width: cardObj.size().width - 35,
            textAlign: 'center'
          }));


          let topTarget = 125;
          let nbBeforeTxt = 0;
          let text;
          //Add frequency and keyword to card
          if (classParent.frequency || classParent.keywords.length > 0) {
            text = classParent.frequency + ' * ' + classParent.keywords.join(', ');
            groupFabricObjFace.push(new fabric.Textbox(text, {
              fill: '#000',
              fontSize: 12,
              fontFamily: 'Arial',
              fontWeight: 'bold',
              top: topTarget,
              left: 5,
              width: cardObj.size().width - 35,
              textAlign: 'left'
            }));
            topTarget = topTarget + 20;
            nbBeforeTxt++;
          }


          //Add type action to card
          if (classParent.typeAction) {
            groupFabricObjFace.push(new fabric.Textbox(classParent.typeAction, {
              fill: '#000',
              fontSize: 13,
              fontFamily: 'Arial',
              fontWeight: 'bold',
              top: topTarget,
              left: 5,
              width: cardObj.size().width - 35,
              textAlign: 'left'
            }));
            topTarget = topTarget + 20;
            nbBeforeTxt++;
          }

          // add scope to card
          if (classParent.typeAttaque || classParent.scope) {
            text = classParent.typeAttaque + ' ' + classParent.scope;
            groupFabricObjFace.push(new fabric.Textbox(text, {
              fill: '#000',
              fontSize: 12,
              fontFamily: 'Arial',
              fontWeight: 'bold',
              top: topTarget,
              left: 5,
              width: cardObj.size().width - 35,
              textAlign: 'left'
            }));
            topTarget = topTarget + 20;
            nbBeforeTxt++;
          }

          //Add Text card
          let wrapSize = 60;
          let sizeText = 13;
          if(nbBeforeTxt === 0) {
            wrapSize = 60;
            sizeText = 13;

            if (classParent.calculNbLineAfterTransform(classParent.text, wrapSize) > 19) {
              sizeText = 12;
              wrapSize = 67;

              if (classParent.calculNbLineAfterTransform(classParent.text, wrapSize) > 24) {
                sizeText = 11;
                wrapSize = 73;
              }
            }
          } else {
              wrapSize = 60;
              sizeText = 13;
              if (classParent.calculNbLineAfterTransform(classParent.text, wrapSize) > 16) {
                sizeText = 12;
                wrapSize = 67;

                if (classParent.calculNbLineAfterTransform(classParent.text, wrapSize) > 19) {
                  sizeText = 11;
                  wrapSize = 73;
                }
              }
            }

            let textFull = this.prepareTextToAdd(wrapSize);

            groupFabricObjFace.push(new fabric.IText(textFull.text, {
                fill: '#000',
                fontSize: sizeText,
                fontFamily: 'Arial',
                top: topTarget,
                left: 5,
                width: cardObj.size().width - 35,
                textAlign: 'left',
                styles: textFull.style
            }));

            let groupFabricFace = new fabric.Group(groupFabricObjFace, {
                left: 0,
                top: 0,
                width: cardObj.size().width,
                height: cardObj.size().height
            });

            //Generate the group pile card
            let imgPile = new Canvas.Image();
            imgPile.src = fs.readFileSync(cardObj.imageDosPath());
            let imagePileFabric = new fabric.Image(imgPile);
            imagePileFabric.set({
                scaleX: 1.51,
                scaleY: 1.46
            });
            let groupFabricPile = new fabric.Group([imagePileFabric], {
                left: 0,
                top: 0,
                width: cardObj.size().width,
                height: cardObj.size().height
            });


            this.card = {face: groupFabricFace, pile: groupFabricPile};
        }

        return this.card;
    }

    prepareTextToAdd(wrap) {
        let classParent = this;
        let response = {text: '',style: {}};

        classParent.text.forEach(function(value, key) {
            classParent.text[key] = classParent.wordWrap(value, wrap)
        });

        response.text = classParent.text.join("\n");

        let sentenceSplit = response.text.split("\n");
        sentenceSplit.forEach(function(value, key) {
            let keyValue = key.toString();

            let returnStyleIndexOf = classParent.transformTextToStyleBold(value);

            response.style[keyValue] = returnStyleIndexOf;
        });

        response.text = response.text.replace(/\#/gi, '');

        return response;
    }

    calculNbLineAfterTransform(text, wrap) {
      let count = text.length;
      text.forEach(function(sentence) {
        count = count + Math.ceil(sentence.length / wrap);
      });

      return count;
    }

    wordWrap(str, maxWidth) {
        let newLineStr = "\n";
        let done = false;
        let res = '';
        do {
            let found = false;
            if (str.length < maxWidth) {
                done = true;
            } else {
                // Inserts new line at first whitespace of the line
                for (let i = maxWidth - 1; i >= 0; i--) {
                    if (this.testWhite(str.charAt(i))) {
                        res = res + [str.slice(0, i), newLineStr].join('');
                        str = str.slice(i + 1);
                        found = true;
                        break;
                    }
                }
                // Inserts new line at maxWidth position, the word is too long to wrap
                if (!found) {
                    res += [str.slice(0, maxWidth), newLineStr].join('');
                    str = str.slice(maxWidth);
                }
            }
        } while (!done);

        return res + str;
    }

    transformTextToStyleBold(text, style) {
        let styleObj = style || {};
        let regex = /\#(.*?)\#/i;
        let m;
        if(m = regex.exec(text)) {
            let offsetStart = m['index'];
            let offsetEnd = offsetStart + m[1].length;

            for(let i = offsetStart; i < offsetEnd; i++) {
                let keyObj = i.toString();
                styleObj[keyObj] = { "fontWeight":"bold" };
            }


            let newText = text.replace(regex, m[1]);
            return this.transformTextToStyleBold(newText, styleObj);
        } else {
            return styleObj;
        }
    }

    testWhite(x) {
        let white = new RegExp(/^\s$/);
        return white.test(x.charAt(0));
    };

    saveCardToImg() {
        let canvasGroup = this.generateCard().face;
        let canvas2 = new fabric.StaticCanvas('c_background', {height: canvasGroup.height, width: canvasGroup.width });

        canvas2.add(canvasGroup);

        return canvas2.toDataURL({ format: 'png' });
    }
}

module.exports = {
    Power
};
