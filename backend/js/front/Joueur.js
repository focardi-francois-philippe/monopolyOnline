class Joueur
{
    static _id = 1
    id
    idSocket
    #_nom
    _color
    #_solde
    #_idCases
    constructor(idSocket,nom,couleur) {
        this.id = Joueur._id
        this.idSocket = idSocket
        this.#_nom = nom
        this._color = couleur
        this.#_solde = 1500
        this.#_idCases = 0
        Joueur.incrementId()
    }
    static lancerDes()
    {
        return parseInt(Math.floor(Math.random() * (6  - 1 + 1)) + 1);
    }
    deplacement(value)
    {
        this.#_idCases = (this.#_idCases +  value) % 20
        
    }
    static peuJouer(joueur)
    {
        if (joueur.#_solde >= 0)
        {
            return true
        } 
        return false
    }


    get solde() {
        return this.#_solde;
    }

    get nom() {
        return this.#_nom
    }


    get idCases() {
        return this.#_idCases;
    }

    set solde(value) {
        this.#_solde = value;
    }


    get couleur() {
        return this._color;
    }
    get id()
    {
        return this.id
    }

    static incrementId() {
        this._id+=1;
    }


}