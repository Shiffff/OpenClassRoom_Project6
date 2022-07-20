const Sauce = require('../models/Sauce');
const fs = require ('fs');


exports.createSauce = (req, res, next) => {     // création de la logique de la route createSauce
  const sauceObject = JSON.parse(req.body.sauce);       // Recuperation de la requete post
  delete sauceObject._id;                                // Suppression de l'id crée par la requete crée automatiquement par mongoDB
  const sauce = new Sauce({                               // Création d'un nouveau schema sauce + initialisation du nombre de like 0 par default
    ...sauceObject,
    // Genère l'url de l'image
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,   // On recupére les deux éléments de la requete la sauce et l'image
  });
  sauce.save()                                            // Save dans la base de données
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};


  exports.getAllSauces = (req, res, next) => {                  //get toutes les sauces éxistantes
    Sauce.find()                                                // find dans la base de données tout les schema sauces
    .then(sauces => res.status(200).json(sauces))               // renvoie en format json la reponse (all schema) qui sera traduite côté front
    .catch(error => res.status(400).json({ error }));
};


exports.getOneSauces = (req, res, next) => {                  //get une seul sauce éxistantes
  Sauce.findOne({ _id: req.params.id})                        // find dans la base de données le schema qui correspond a l'id qui ce trouve dans la requete
  .then(sauce => res.status(200).json(sauce))                 // renvoie en format json la reponse (all schema) qui sera traduite côté front
  .catch(error => res.status(400).json({ error }));
};



exports.putSauces = (req, res, next) => {                     // Modif d'une sauce
    Sauce.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id})     // comme juste en haut on séléctionne une sauce, puis on "l'update" on récupére le champs des formulaire via et on vérif l'id
      .then(() => res.status(200).json({ message: 'objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };                                                                                 

  exports.deleteSauces = (req, res, next) => {          //Delete une sauce
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {      // si id de la requete (sauce.userID) est different de l'id présent dans auth pas autorisé
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];       
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };                                                                              

 
 exports.likeSauces = (req, res, next) => {     
     // récupère le champs likes
     const like = req.body.like;
     // récupère l'id de l'URL
     const sauceId = req.params.id;
     // récupère le userId
     const userId = req.body.userId;

     switch(like) {   // use switch car bcp de conditions 


      // Le front renvoie 1, -1 ou 0
      case 1:         // 
          Sauce.updateOne({ _id: sauceId}, {  // cherche dans mongoDB le bon ID grace a la fonction uptadeOne et a l'id dans les parametre de requette
              $inc: { likes: +1 },             // modifie la valeur de likes a +1 dans mongodb
              $push: { usersLiked: req.body.userId }  // push le nom du user qui a efféctuer le like dans le tableau users ($inc et push sont des commande pour intéragir avec mongoDB)
          })
          .then(() => res.status(201).json({ message: 'Ajout du like '}))
          .catch(error => res.status(400).json({ error }));
          break;



      case -1:            // meme choses pour les dislike

          Sauce.updateOne({ _id: sauceId}, {
              $inc: { dislikes: +1 },
              $push: { usersDisliked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: "Ajout d'un dislike  "}))
          .catch(error => res.status(400).json({ error }));
          break;



      case 0: // le front renvoie la valeur 0 si unlike ou un dislike
          Sauce.findOne({ _id: sauceId })       // Je recherche la sauce en question dans mongoDB grace a l'id présent dans les parametre de la requete
          .then(sauce => {
              if(sauce.usersLiked.includes(userId)){      // si dans le schema mongoDB le tableau inclue l'id du user qui emet la requete
                  Sauce.updateOne({ _id: sauceId},
                      {
                          $inc: { likes: -1 },              //J'enleve le likes et le user dans le tableau users
                          $pull: { usersLiked: userId}
                      })
                  .then(() => res.status(201).json({ message: "Suppression du like "}))
                  .catch((error) => res.status(400).json({ error }));

              } else if(sauce.usersDisliked.includes(userId)) {       // meme chose pour les dislike
                  Sauce.updateOne({_id: sauceId},
                      {
                          $inc: { dislikes: -1},                          //J'enleve le likes et le user dans le tableau users
                          $pull: { usersDisliked: userId}                 // pull pour retiré la valeur dans le schema mongodb (commande mongoDB)
                      })
                  .then(() => res.status(201).json({ message: "Suppression du dislike"}))
                  .catch((error) => res.status(400).json({ error }));
              } else {
                  res.status(403).json({ message: "requête impossible !"})
              }
          })
          .catch(() => res.status(404).json({ message: "Sauce introuvable !"}));
          break;
  }
};                                                                              