const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const fs = require("fs")
const ipaddr = "127.0.0.1"
const crypto = require("crypto");

let nbrJoueur = 0
const joueurs = {"idSalon": undefined,joueurs:undefined}
const joueur = {idJeu:undefined,id: undefined,nomJoueur: "",couleur: "",ready: false,solde:1500,idCase:0}
let cases =  JSON.parse(fs.readFileSync(path.join(__dirname,'/js/front/case.json')))


const room = {}
const rooms = [

]

function auTourDe(idRoom,nomJoueur)
{
    io.sockets.in(idRoom).emit("auTourDe",nomJoueur)
}

Array.prototype.roomInArray = function(idRoom)
{
    for(let i =0;i<this.length;i++)
    {
        if(Object.keys(this[i])[0] == idRoom)
        {
            return true
        }
    }
    return false
}
Array.prototype.roomExist = function(idRoom)
{

    for(let i =0;i<this.length;i++)
    {
        if(Object.keys(this[i])[0] == idRoom)
        {
            
            return this[i][idRoom]
        }
    }
    return undefined
}
Array.prototype.pushJoueur = function(idRoom,joueur)
{
    for(let i =0;i<this.length;i++)
    {
        if(Object.keys(this[i])[0] == idRoom)
        {
            this[i][idRoom].push(joueur)
        }
    }
    return undefined
}
async function  joueurInRoom(arr,idRoom,idJoueur)
{
    const roomJoueurs = arr.roomExist(idRoom)

    for(let i =0;i<roomJoueurs.length;i++)
    {

        if(roomJoueurs[i]["id"] == idJoueur)
        {
            return roomJoueurs[i]
        }
    }
}
function roomReady(arr,idRoom)
{
    let retour = false
    for(let i =0;i<arr.length;i++)
    {

        if(Object.keys(arr[i])[0] == idRoom)
        {

            for(let y = 0 ;y<arr[i][idRoom].length;y++)
            {
                if(arr[i][idRoom][y]["ready"] == true)
                {
                    retour = true
                }
                else
                {
                    return false
                }
            }
        }
    }
    return retour
}
function updateJoueur(arr,idRoom,joueur)
{

    for(let i =0;i<arr.length;i++)
    {
        if(Object.keys(arr[i])[0] == idRoom)
        {
            for(let y =0;i<arr[y][idRoom].length;i++)
            {

                if(joueur.id == arr[y][idRoom]["id"])
                {
  
                    for(let keys in joueur)
                    {
                        arr[y][idRoom][keys] = joueur[keys]
                    }
                }
            }
            
            
        }
    }

}




app.get('/', (req, res) => {
    if(nbrJoueur < 2)
    {
        res.sendFile(path.join(__dirname,'/index.html'))
    }
    else
    {
        res.send("2 personnes jouent deja")
    }
})
app.get('/CaseDessin', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/CaseDessin.js'))
})
app.get('/Joueur', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/Joueur.js'))
})
app.get('/CaseJeu', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/CaseJeu.js'))
})
app.get('/CaseImpot', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/CaseImpot.js'))
})
app.get('/CasePropriete', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/CasePropriete.js'))
})
app.get('/CaseNoAction', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/CaseNoAction.js'))
})
app.get('/CaseDepart', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/CaseDepart.js'))
})
app.get('/Plateau', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/Plateau.js'))
})
app.get('/Jeu', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/Jeu.js'))
})
app.get('/App', (req, res) => {
    res.sendFile(path.join(__dirname,'/js/front/App.js'))
})
app.get("/creerSalon",(req,res)=>{
    const id = crypto.randomBytes(16).toString("hex");
    const salon = io.of("/"+id)
    
    res.redirect("/salon/idSalon="+id)
})
app.get("/salon/:idSalon",(req,res)=> {
    const idSalon =req.params.idSalon
    res.sendFile(path.join(__dirname,'/jeu.html'))
})
app.get("/musique/:songName",(req,res)=> {
    const songName =req.params.songName
    res.sendFile(path.join(__dirname,'/js/musique/'+songName))
})
app.get('/casesJson', (req, res) => {
    try {
        // Note that jsonString will be a <Buffer> since we did not specify an
        // encoding type for the file. But it'll still work because JSON.parse() will
        // use <Buffer>.toString().
        const jsonString = fs.readFileSync(path.join(__dirname,'/js/front/case.json'));
        const customer = JSON.parse(jsonString);
        res.send(JSON.stringify(customer))
      } catch (err) {
        
        return;
      }
})



io.on('connection', (socket) => {
    
    const idSalon = socket.handshake.query.idSalon
    const idRoom = JSON.parse(JSON.stringify(socket.handshake.query))["idSalon"]
    const idClientRequest = socket.id
    const clients = io.sockets.adapter.rooms.get(idSalon);//all clients room
    //const salonExist = joueur.find((o) => o.idSalon == idSalon)
    // //

    if(clients == undefined || clients.size < 2)
    {
    //     //salonExist.nbrJoueur +=1
        socket.join(idSalon)
        const joueursCopy = Object.assign({},joueur)
        const roomCopy = Object.assign({})
        joueursCopy.id = socket.id

        roomCopy[idSalon] = [joueursCopy]

        
        if(!rooms.roomInArray(idSalon))
        {
            roomCopy[idSalon]["idProchainJoueur"] = undefined
            roomCopy[idSalon]["nomProchainJoueur"] = undefined
            Object.assign(roomCopy[idSalon],JSON.parse(JSON.stringify(cases)))
            rooms.push(roomCopy)
        }
        else
        {
            rooms.pushJoueur(idSalon,joueursCopy)
        }
        

    //     io.to(salonExist.idSalon).emit("ready",1);
    }
    else
    {
        
    }



    socket.on('disconnect', async () => {
        try
        {
            const idRoom = JSON.parse(JSON.stringify(socket.handshake.query))["idSalon"]
            const idClientRequest = socket.id
            const clients = io.sockets.adapter.rooms.get(idRoom);//all clients room
            const client = [...clients][0]
            const joueur = await joueurInRoom(rooms,idRoom,client)
            io.sockets.in(idRoom).emit("fin",JSON.stringify(joueur))
            io.in(idRoom).disconnectSockets()
        }catch(err)
        {   

        }

    });
    socket.on('addJoueur', async (nomJoueur,couleur) => {
        try {
            
        
        const idRoom = JSON.parse(JSON.stringify(socket.handshake.query))["idSalon"]
        const idClientRequest = socket.id
        const clients = io.sockets.adapter.rooms.get(idRoom);//all clients room

        const joueur = await joueurInRoom(rooms,idRoom,idClientRequest)

        joueur.ready = true
        joueur.nomJoueur = nomJoueur
        joueur.couleur = couleur
        io.sockets.in(idRoom).emit("addHistorique",nomJoueur + " est pret ")
        
        if(roomReady(rooms,idRoom) && clients.size == 2)
        {
            const room = rooms.roomExist(idRoom)
            const client = Array.from(clients).filter((x) => x!=socket.id)

            const joueur1 = await joueurInRoom(rooms,idRoom,client)
            joueur1.idJeu = 1
            joueur.idJeu = 2
            console.table(room[0])
            console.table(room[1])
            room.idProchainJoueur = joueur.id
            room.nomProchainJoueur = joueur.nomJoueur
            console.table(io.sockets.adapter.rooms.get(idRoom))
            io.sockets.in(idRoom).emit("ready",JSON.stringify(joueur1),JSON.stringify(joueur))
            auTourDe(idRoom,joueur.nomJoueur)
        }
    }catch (error) {
            
        }
    });
    socket.on("acheter",async ()=>{
        const idRoom = JSON.parse(JSON.stringify(socket.handshake.query))["idSalon"]
        const idClientRequest = socket.id
        const clients = io.sockets.adapter.rooms.get(idRoom);//all clients room
        const setToArray = Array.from(clients)

        const room = rooms.roomExist(idRoom)
        const joueur =  await joueurInRoom(rooms,idRoom,idClientRequest)
        
        
        
        let nouveauJoueur
        if(setToArray[0] == idClientRequest )
        {
            nouveauJoueur = await joueurInRoom(rooms,idRoom,setToArray[1])
            
            
        }
        else
        {
            nouveauJoueur = await joueurInRoom(rooms,idRoom,setToArray[0])
        }
        console.log("-------------")
        console.log(room)
        console.log("-------------")
        console.log("-------------ROOMS")
        console.log(rooms)
        console.log("-------------")
        joueur.solde -= room["cases"][joueur.idCase].prix
        room["cases"][joueur.idCase].proprietaire = joueur.id

        room.nomProchainJoueur = nouveauJoueur.nomJoueur
        room.idProchainJoueur = nouveauJoueur.id
        io.sockets.in(idRoom).emit("addHistorique",joueur.nomJoueur + " viens d'acheter "+  room["cases"][joueur.idCase].name + " pour " + room["cases"][joueur.idCase].prix + " il dispose maintenant de  " + joueur.solde)
        auTourDe(idRoom,nouveauJoueur.nomJoueur)
        io.sockets.in(idRoom).emit("joueurAcheter",room["cases"][joueur.idCase].name,room["cases"][joueur.idCase].color,joueur.solde,idClientRequest)
        
    })
    socket.on("prochainJoueur",async ()=>{
        const idRoom = JSON.parse(JSON.stringify(socket.handshake.query))["idSalon"]
        const idClientRequest = socket.id
        const clients = io.sockets.adapter.rooms.get(idRoom);//all clients room
        const setToArray = Array.from(clients)
        const indexJoueur = setToArray.indexOf(idClientRequest)
        const room = rooms.roomExist(idRoom)
        
        if(indexJoueur == 0)
        {
            const prochainJoueur = await joueurInRoom(rooms,idRoom,setToArray[1])
            room.idProchainJoueur = prochainJoueur.id
            room.nomProchainJoueur = prochainJoueur.nomJoueur
        }
        else
        {
            const prochainJoueur = await joueurInRoom(rooms,idRoom,setToArray[0])
            room.idProchainJoueur = prochainJoueur.id
            room.nomProchainJoueur = prochainJoueur.nomJoueur
        }
        auTourDe(idRoom,room.nomProchainJoueur)
    })
    socket.on("sendChat",async(msg)=>{
        const idRoom = JSON.parse(JSON.stringify(socket.handshake.query))["idSalon"]
        const idClientRequest = socket.id
        const clients = io.sockets.adapter.rooms.get(idRoom);//all clients room
        const joueur = await joueurInRoom(rooms,idRoom,idClientRequest)

        io.sockets.in(idRoom).emit("receiveChat",joueur.nomJoueur,msg)

    })
    socket.on('lancerDes',async () => {
        const idRoom = JSON.parse(JSON.stringify(socket.handshake.query))["idSalon"]
        const idClientRequest = socket.id

        if(rooms.roomExist(idRoom).idProchainJoueur == idClientRequest)
        {
            const clients = io.sockets.adapter.rooms.get(idRoom);//all clients room
            const setToArray = Array.from(clients)
            const indexJoueur = setToArray.indexOf(idClientRequest)

            const room = rooms.roomExist(idRoom)
            const resultDes = Math.floor((Math.random() * 6)+1)
            let nouveauJoueur = undefined
            let currentJoueur =  undefined
            if(indexJoueur == 1)
            {
                nouveauJoueur = await joueurInRoom(rooms,idRoom,setToArray[0])
                currentJoueur = await joueurInRoom(rooms,idRoom,setToArray[1])
 
            }
            else
            {
                nouveauJoueur = await joueurInRoom(rooms,idRoom,setToArray[1])
                currentJoueur = await joueurInRoom(rooms,idRoom,setToArray[0])
            }
            currentJoueur.idCase = (currentJoueur.idCase +resultDes) % 20

            if(currentJoueur.solde <= -200)
            {
                io.sockets.in(idRoom).emit("fin",JSON.stringify(nouveauJoueur))
            }
            else
            {
                io.sockets.in(idRoom).emit("resultDes",resultDes,setToArray[indexJoueur])
            }
            

            
            
            
            if(room["cases"][currentJoueur.idCase].categorie == "propriete" && room["cases"][currentJoueur.idCase].proprietaire == null && currentJoueur.solde >= room["cases"][currentJoueur.idCase].prix)
            {
                io.to(idClientRequest).emit("achat",room["cases"][currentJoueur.idCase].name,room["cases"][currentJoueur.idCase].prix)
                
            }
            else if(room["cases"][currentJoueur.idCase].proprietaire != null)
            {
                
                if(room["cases"][currentJoueur.idCase].proprietaire != idClientRequest)
                {
                    nouveauJoueur.solde += room["cases"][currentJoueur.idCase].loyer
                    currentJoueur.solde -= room["cases"][currentJoueur.idCase].loyer
                    io.sockets.in(idRoom).emit("addHistorique",currentJoueur.nomJoueur + " est tombe a " +  room["cases"][currentJoueur.idCase].name + " la case appartiens a " + nouveauJoueur.nomJoueur + " il lui verse donc un  loyer de " + room["cases"][currentJoueur.idCase].loyer)
                    
                    if(nouveauJoueur.idJeu == 1)
                    {
                        io.sockets.in(idRoom).emit("majSolde",nouveauJoueur.solde ,currentJoueur.solde)
                    }
                    else
                    {
                        io.sockets.in(idRoom).emit("majSolde",currentJoueur.solde ,nouveauJoueur.solde)
                    }
                    
                    
                }
                room.nomProchainJoueur = nouveauJoueur.nomJoueur
                room.idProchainJoueur = nouveauJoueur.id
                room["cases"][currentJoueur.idCase].loyer *=2
                io.sockets.in(idRoom).emit("addHistorique","le loyer de : " + room["cases"][currentJoueur.idCase].name + " deviens " + room["cases"][currentJoueur.idCase].loyer)
                auTourDe(idRoom,room.nomProchainJoueur)
               
            }
            else
            {

                room.nomProchainJoueur = nouveauJoueur.nomJoueur
                room.idProchainJoueur = nouveauJoueur.id
                auTourDe(idRoom,room.nomProchainJoueur)

            }
            
        }
        
    });
    
  });

server.listen(port,() => {
  
})


