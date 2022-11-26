class CaseJeu
{

    _joueur
    _color
    constructor(id,name,color,x,y,son) {
        this.id = id
        this.nom = name
        this._color = color
        this._joueur = []
        this.positionXJoueur = x
        this.positionYJoueur = y
        this.son = son
    }
    addJoueur(joueur)
    {
        this._joueur.push(joueur)
    }
    removeJoueur(joueur)
    {
        this._joueur.remove(joueur)
    }
    actionCase(joueur)
    {
        this.son.play()
    }




}