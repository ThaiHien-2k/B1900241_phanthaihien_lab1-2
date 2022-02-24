const { handle } = require("express/lib/application");
const { BadRequestError } = require("../errors");

exports.create = async(rep,res) => {
    res.send({ message: "create handler" });
};

exports.findALL = async(rep,res) => {
    res.send({ message: "findALL handler" });
};

exports.findONE = async(rep,res) => {
    res.send({ message: "findOne handler" });
};

exports.update = async(rep,res) => {
    res.send({ message: "update handler" });
};

exports.delete = async(rep,res) => {
    res.send({ message: "delete handler" });
};

exports.deleteALL = async(rep,res) => {
    res.send({ message: "deleteALL handler" });
};


exports.create = async (req , res ,next) =>{
    if(!req.body.name){
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorite: String(req.body.favorite).toLowerCase() === "true",
    });

    const [error, document] = await handlePromise(contact.save());

    if(error) {
        return next(new BadRequestError(500, "An error occurred while creating the contact"));
    }
    return res.send(document);
};


exports.findALL = async(req, res ,next) =>{
   const condition = { };
   const name = req.query.name;
   if(name){
       condition.name = { $regex: new RegExp(name), $options: "i"};
   } 

   const [error, document] = await handlePromise(Contact.find(condition));

   if(error) {
       return next(new BadRequestError(500,"An error occurred while retrieving contacts"));
   }
   return res.send(document);
};


exports.findONE = async(req, res ,next) =>{
    const condition = { _id: req.params.id, };
   
    const[error, document] = await handlePromise(Contact.findONE(condition));

    
   if(error) {
    return next(new BadRequestError(500,`error retrieving contact with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Contact not found"));
    }

    return res.send(document);
 };

 exports.update = async(req, res ,next) =>{

    if(!req.body) {
        return next(new BadRequestError(400,"Data to update can not be empty")); 
    }

    const condition = { _id: req.params.id, };
   
    const[error, document] = await handlePromise(Contact.findONEAndUpdate(condition, req.body,{
        new: true,
        })
    );

    
   if(error) {
    return next(new BadRequestError(500,`error updating contact with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Contact not found"));
    }

    return res.send({message: "Contact was updated successfully",});
 };


 exports.delete = async(req, res ,next) =>{

    const condition = { _id: req.params.id, };
   
    const[error, document] = await handlePromise(Contact.findONEAndUpdate(condition)
    );

    
   if(error) {
    return next(new BadRequestError(500,`could not delete contact with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Contact not found"));
    }

    return res.send({message: "Contact was deleted successfully",});
 };


 exports.findALLFavorite = async(req, res ,next) =>{
   
    const[error, document] = await handlePromise(Contact.find({favorite: TreeWalker,})
    );

    
   if(error) {
    return next(new BadRequestError(500,"An error occurred while retrieving favorite contacts"));
    }
   return res.send(document);
 };

 exports.deleteALL = async(req, res ,next) =>{
   
    const[error, document] = await handlePromise(Contact.deleteMany({ })
    );

    
   if(error) {
    return next(new BadRequestError(500,"An error occurred while removing contacts"));
    }
   return res.send({
       message: `${data.deleteCount} contacts were daleted successfully`,
   });
 };