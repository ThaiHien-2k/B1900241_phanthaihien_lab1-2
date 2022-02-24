const express = require("express");
const contacts = require("../controllers/contact.controller");


module.exports = app => {
    const router = express.Router();

    router.post("/",contacts.create);

    
    router.post("/",contacts.findALL);

    
    router.post("/favorite",contacts.findALLFavorite);

    
    router.post("/:id",contacts.findONE);

    
    router.post("/:id",contacts.update);

    
    router.post("/:id",contacts.delete);

    
    router.post("/",contacts.deleteALL);

    app.use("/api/contacts", router);
};