'use strict'
class App
{

    constructor() {
        this.jeu = undefined
        this.joueur = []
    }

    async initJeu(joueur1,joueur2)
    {
        
        this.joueur.push(joueur1)
        this.joueur.push(joueur2)
        this.jeu = await Jeu.init()
        this.jeu.plateau.addJoueur(this.joueur[0])
        this.jeu.plateau.addJoueur(this.joueur[1])
        this.jeu.plateau.dessinerJoueur(this.joueur[0])
        await this.jeu.plateau.dessinerJoueur(this.joueur[1])
        //let  i = 0
        // 
        // document.getElementById("joueur1h3").innerHTML += joueur1.nom
        // document.getElementById("joueur2h3").innerHTML += joueur2.nom
        // document.getElementById("soldej1").innerHTML =  "Solde : " +  app.joueur[0].solde
        // document.getElementById("soldej2").innerHTML =  "Solde : " +  app.joueur[1].solde
        
    }
    getJoueurByIdSocket(idSocket)
    {
        for(let i =0;i<this.joueur.length;i++)
        {
            if(this.joueur[i].idSocket == idSocket)
            {
                return this.joueur[i]
            }
        }
    }

}



//const valider = document.getElementById("valider")
const lancerDesJ1 = document.getElementById("desj1")
const lancerDesJ2 = document.getElementById("desj2")
const soldeJ1 = document.getElementById("soldej1")
const soldeJ2 = document.getElementById("soldej2")
// valider.addEventListener("click",() =>
// {
//     const joueur1 = {
//         nom: document.getElementById("joueur1").value,
//         color: document.getElementById("couleurJoueur1").value
//     }
//     const joueur2 = {
//         nom: document.getElementById("joueur2").value,
//         color: document.getElementById("couleurJoueur2").value
//     }
//     app.initJeu(joueur1,joueur2)
//     lancerDesJ1.removeAttribute("disabled");
//     valider.setAttribute("disabled",'' )
// })
// lancerDesJ1.addEventListener("click",()=>{
//     lancerDesJ1.setAttribute('disabled', '');
//     lancerDesJ2.removeAttribute("disabled");
//     let resultatLancer = 0
//     if (Joueur.peuJouer(app.joueur[0]))
//     {
//         //app.jeu.plateau.stopMusique(app.joueur[1])
//         resultatLancer = Joueur.lancerDes()
//         
//         app.jeu.plateau.enleverJoueur(app.joueur[0])
//         app.joueur[0].deplacement(resultatLancer)
//         app.jeu.plateau.dessinerJoueur(app.joueur[0])
//         app.jeu.plateau.actionCase(app.joueur[0])
//         soldeJ1.innerHTML = "Solde : " +  app.joueur[0].solde
//         soldeJ2.innerHTML = "Solde : " +  app.joueur[1].solde
//     }

// })
// lancerDesJ2.addEventListener("click",()=>{
//     let resultatLancer = 0
//     lancerDesJ2.setAttribute('disabled', '');
//     lancerDesJ1.removeAttribute("disabled");
//     Joueur.peuJouer(app.joueur[1])
//     resultatLancer = Joueur.lancerDes()
//     if (Joueur.peuJouer(app.joueur[1]))
//     {
//        // app.jeu.plateau.stopMusique(app.joueur[0])
//         resultatLancer = Joueur.lancerDes()
//         
//         app.jeu.plateau.enleverJoueur(app.joueur[1])
//         app.joueur[1].deplacement(resultatLancer)
//         app.jeu.plateau.dessinerJoueur(app.joueur[1])
//         app.jeu.plateau.actionCase(app.joueur[1])
//         soldeJ1.innerHTML = "Solde : " +  app.joueur[0].solde
//         soldeJ2.innerHTML = "Solde : " +  app.joueur[1].solde
//     }

// })
