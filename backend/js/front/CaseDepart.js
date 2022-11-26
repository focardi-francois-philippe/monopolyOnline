class CaseDepart extends CaseJeu{
    constructor(id,name,color,x,y,son) {
        super(id,name,color,x,y,son)
    }
    actionCase(joueur) {
        super.actionCase();
        //joueur.solde += 200
        //console.log("Case Depart")
    }
}