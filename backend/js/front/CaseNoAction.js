class CaseNoAction extends CaseJeu{
    constructor(id,name,color,x,y,son) {
        super(id,name,color,x,y,son)
    }
    actionCase(joueur) {
        super.actionCase();
        console.log("Case no action")

    }
}