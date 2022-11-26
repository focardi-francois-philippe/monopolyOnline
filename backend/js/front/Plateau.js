class Plateau
{
    static NBRMAXCASES = 20
    #_cases
    #_caseD

    constructor(canvas , cases,caseDesinObj) {
        this.canvas = canvas
        this.#_cases = cases;
        this.#_caseD = caseDesinObj
        this.dessiner()
    }
    static async init()
    {
        const canv =  document.getElementById("canvas").getContext("2d")
        const cases = await Plateau.getCasesFile()
        console.log(new CaseDessin(canv,cases))
        return new Plateau(canv,await Plateau.instantiateAllCase(cases),new CaseDessin(canv,cases))
    }
    dessinerJoueur(joueur)
    {
        console.log(joueur.couleur)
        this.canvas.beginPath()
        this.canvas.fillStyle = joueur.couleur
        console.log(joueur)
        this.canvas.arc(this.#_cases[joueur.idCases].positionXJoueur[joueur.id-1],this.#_cases[joueur.idCases].positionYJoueur[joueur.id-1], 5, 0, 2 * Math.PI)
        this.canvas.fill();
        this.canvas.closePath()
        this.#_cases[joueur.idCases].actionCase(joueur)
    }
    enleverJoueur(joueur)
    {
            this.canvas.beginPath()
            this.canvas.fillStyle = "#FFFFFF"
            this.canvas.arc(this.#_cases[joueur.idCases].positionXJoueur[joueur.id-1], this.#_cases[joueur.idCases].positionYJoueur[joueur.id-1], 5, 0,2*Math.PI);
            this.canvas.fill();
            this.canvas.closePath()
            this.stopMusique(joueur)

    }

    stopMusique(joueur)
    {
        this.#_cases[joueur.idCases].son.pause()
        this.#_cases[joueur.idCases].son.currentTime = 0
    }




    static async instantiateAllCase(casesFile) {
        let allCases = []
        let cases = casesFile
        
        for (const item of cases) {
            const path = "js/front/musique/"
            const audio = new Audio("/musique/"+item.son)
            if (item.categorie == "propriete")
            {
                
                allCases.push(new CasePropriete(item.id,item.name,item.color,item.x,item.y,audio))
            }
            else if (item.categorie == "depart")
            {
                allCases.push(new CaseDepart(item.id,item.name,item.color,item.x,item.y,audio))
            }
            else if (item.categorie == "impot")
            {
                allCases.push(new CaseImpot(item.id,item.name,item.color,item.x,item.y,audio))
            }
            else
            {
                allCases.push(new CaseNoAction(item.id,item.name,item.color,item.x,item.y,audio))
            }
        }
        return allCases
    }
    static async  getCasesFile()
    {
        const response = await fetch("/casesJson")
        const rep =  await response.json()
        return rep["cases"]
    }
    dessiner()
    {
        this.#_caseD.dessinerPlateau()

    }
    addJoueur(joueur)
    {
        this.#_cases[joueur.idCases].addJoueur(joueur)
    }
    removeJoueur(joueur)
    {
        this.#_cases[joueur.idCases].removeJoueur(joueur)
    }
    actionCase(joueur)
    {
        this.#_cases[joueur.idCases].actionCase(joueur)
    }

}