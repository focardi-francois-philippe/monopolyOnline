class CaseDessin
{
    static #LARGEUR = 50
    static #HAUTEUR = 70
    static nbrCaseLigne = 5
    static #parcoursCase = 0
    static allPosition  = []
    static objectPosition = {
        "x": 0,
        "y": 0,
        "largeur": 0,
        "hauteur": 0,
        "setAll": function (x,y,largeur,hauteur)
        {
            this.x = x
            this.y = y
            this.largeur = largeur
            this.hauteur = hauteur
        },
        "copy": function (x,y,largeur,hauteur)
        {
            return Object.assign({},this)
        }
     }

    constructor(canvas , cases) {
        this.canvas = canvas
        this.cases = cases
    }
    dessinerLigneBas()
    {
        const y = 400
        let x = 400
        this.canvas.strokeStyle  = "black"
        this.canvas.strokeStyle = this.cases[CaseDessin.#parcoursCase].color
        this.canvas.strokeRect(x , y, CaseDessin.#LARGEUR+40, CaseDessin.#HAUTEUR);
        CaseDessin.incrementParcoursCase()
        CaseDessin.objectPosition.setAll(x,y,CaseDessin.#LARGEUR+40,CaseDessin.#HAUTEUR)

        CaseDessin.allPosition.push(CaseDessin.objectPosition.copy())

        x -= CaseDessin.#LARGEUR+5
        for (let i = 0; i < CaseDessin.nbrCaseLigne-1; i++) {
            this.canvas.strokeStyle = this.cases[CaseDessin.#parcoursCase].color
            this.canvas.strokeRect(x, y, CaseDessin.#LARGEUR, CaseDessin.#HAUTEUR);
            CaseDessin.incrementParcoursCase()
            CaseDessin.objectPosition.setAll(x,y,CaseDessin.#LARGEUR,CaseDessin.#HAUTEUR)
            CaseDessin.allPosition.push(CaseDessin.objectPosition.copy())
            x -= CaseDessin.#LARGEUR+5
        }
        this.canvas.strokeStyle = this.cases[CaseDessin.#parcoursCase].color
        this.canvas.strokeRect(x - 20, y, CaseDessin.#LARGEUR+20, CaseDessin.#HAUTEUR);
        CaseDessin.incrementParcoursCase()
        CaseDessin.objectPosition.setAll(x,y,CaseDessin.#LARGEUR+20,CaseDessin.#HAUTEUR)
        CaseDessin.allPosition.push(Object.assign(CaseDessin.objectPosition.copy()))
        

    }
    dessinerLigneGauche()
    {
        let y = 345
        let x = 105

        for (let i = 0; i < CaseDessin.nbrCaseLigne - 1 ; i++) {
            this.canvas.strokeStyle = this.cases[CaseDessin.#parcoursCase].color
            this.canvas.strokeRect(x, y, CaseDessin.#HAUTEUR, CaseDessin.#LARGEUR); //Attention inversion hauteur deviens largeur
            CaseDessin.incrementParcoursCase()
            CaseDessin.objectPosition.setAll(x,y,CaseDessin.#HAUTEUR,CaseDessin.#LARGEUR)
            CaseDessin.allPosition.push(Object.assign(CaseDessin.objectPosition.copy()))
            y -= CaseDessin.#HAUTEUR -15
        }
        this.canvas.strokeStyle = this.cases[CaseDessin.#parcoursCase].color
        this.canvas.strokeRect(x, y - 20, CaseDessin.#HAUTEUR, CaseDessin.#LARGEUR + 20);
        CaseDessin.incrementParcoursCase()
        CaseDessin.objectPosition.setAll(x,y-20,CaseDessin.#HAUTEUR,CaseDessin.#LARGEUR+20)
        CaseDessin.allPosition.push(Object.assign(CaseDessin.objectPosition.copy()))
    }
    dessinerLigneHaut()
    {
        const y = 105
        let x = 180

        for (let i = 0; i < CaseDessin.nbrCaseLigne - 1; i++) {
            this.canvas.strokeStyle = this.cases[CaseDessin.#parcoursCase].color
            this.canvas.strokeRect(x, y, CaseDessin.#LARGEUR, CaseDessin.#HAUTEUR);
            CaseDessin.incrementParcoursCase()
            CaseDessin.objectPosition.setAll(x,y,CaseDessin.#HAUTEUR,CaseDessin.#LARGEUR)
            CaseDessin.allPosition.push(Object.assign(CaseDessin.objectPosition.copy()))
            x += CaseDessin.#HAUTEUR -10
        }
        this.canvas.strokeStyle = this.cases[CaseDessin.#parcoursCase].color

        this.canvas.strokeRect(x , y, CaseDessin.#LARGEUR+20, CaseDessin.#HAUTEUR);
        CaseDessin.incrementParcoursCase()
        CaseDessin.objectPosition.setAll(x,y,CaseDessin.#HAUTEUR,CaseDessin.#LARGEUR)
        CaseDessin.allPosition.push(Object.assign(CaseDessin.objectPosition.copy()))
        
    }
    dessinerLigneDroite()
    {
        let y = 180
        let x = 420

        for (let i = 0; i < CaseDessin.nbrCaseLigne - 1 ; i++) {
            this.canvas.strokeStyle = this.cases[CaseDessin.#parcoursCase].color
            this.canvas.strokeRect(x, y, CaseDessin.#HAUTEUR, CaseDessin.#LARGEUR);
            CaseDessin.incrementParcoursCase()
            CaseDessin.objectPosition.setAll(x,y,CaseDessin.#HAUTEUR,CaseDessin.#LARGEUR)
            CaseDessin.allPosition.push(Object.assign(CaseDessin.objectPosition.copy()))
            y += CaseDessin.#HAUTEUR -15
        }
    }
    async dessinerPlateau()
    {
        this.dessinerLigneBas()
        this.dessinerLigneGauche()
        this.dessinerLigneHaut()
        this.dessinerLigneDroite()
        this.ecrireNomCases()
    }
    ecrireNomCases()
    {
        for (let i = 0; i < Plateau.NBRMAXCASES; i++) {
            this.canvas.fillText(this.cases[i].name,CaseDessin.allPosition[i].x+15,CaseDessin.allPosition[i].y+10,50)
        }
    }


    static incrementParcoursCase()
    {
        CaseDessin.#parcoursCase+=1
    }

}