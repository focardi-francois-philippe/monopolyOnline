class CasePropriete extends CaseJeu{

    #_price
    #_proprietaire
    #_loyer
    constructor(id,name,color,x,y,son) {
        super(id,name,color,x,y,son)
        const LOYER = 10
        const PRICE = 200
        this.#_price = PRICE
        this.#_loyer = LOYER
        this.#_proprietaire = undefined
    }
    actionCase(joueur) {
        super.actionCase();
    }

}