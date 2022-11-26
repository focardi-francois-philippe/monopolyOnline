class Jeu
{
    #_plateau
    constructor(plateau) {
        this.#_plateau = plateau;
    }
    static async init()
    {
        const plateau = await Plateau.init()
        return new Jeu(plateau)
    }

    get plateau() {
        return this.#_plateau;
    }
}