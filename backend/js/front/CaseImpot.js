class CaseImpot extends CaseJeu{
    constructor(id,name,color,x,y,son) {
        super(id,name,color,x,y,son)
        const IMPOT = 50
        this.inpot = IMPOT
    }
    actionCase(joueur) {
        super.actionCase();
        // joueur.solde -= this.inpot
        // this.inpot += IMPOT
        // 
        
    }
}