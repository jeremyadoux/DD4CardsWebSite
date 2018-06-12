class Card {
    static size() {
        return {
            width: 375,
            height: 523
        }
    }
}

class AVolonte extends Card {
    static imagePath (){
        return './images/cards/avolonte.png';
    }
    static imageDosPath() {
        return './images/cards/dosavolonte.png';
    }
}

class Quotidien extends Card {
    static imagePath (){
        return './images/cards/quotidien.png';
    }
    static imageDosPath() {
        return './images/cards/dosquotidien.png';
    }
}

class Rencontre extends Card {
    static imagePath (){
        return './images/cards/rencontre.png';
    }
    static imageDosPath() {
        return './images/cards/dosrencontre.png';
    }
}

class Trait extends Card {
    static imagePath (){
        return './images/cards/traits.png';
    }
    static imageDosPath() {
        return './images/cards/dostrait.png';
    }
}

class Utilitaire extends Card {
    static imagePath (){
        return './images/cards/utilitaire.png';
    }
    static imageDosPath() {
        return './images/cards/dosutilitaire.png';
    }
}

class UtilitaireAVolonte extends Card {
    static imagePath (){
        return './images/cards/utilitaireavolonte.png';
    }
    static imageDosPath() {
        return './images/cards/dosutilitaire.png';
    }
}

class UtilitaireQuotidien extends Card {
    static imagePath (){
        return './images/cards/utilitairequotidien.png';
    }
    static imageDosPath() {
        return './images/cards/dosutilitaire.png';
    }
}

class UtilitaireRencontre extends Card {
    static imagePath (){
        return './images/cards/utilitairerencontre.png';
    }
    static imageDosPath() {
        return './images/cards/dosutilitaire.png';
    }
}


class Inconnu extends Card {
    static imagePath (){
        return './images/cards/inconnue.png';
    }
    static imageDosPath() {
        return './images/cards/dosinconnue.png';
    }
}

module.exports = {
    AVolonte,
    Inconnu,
    Quotidien,
    Trait,
    Rencontre,
    Utilitaire,
    UtilitaireAVolonte,
    UtilitaireQuotidien,
    UtilitaireRencontre
};