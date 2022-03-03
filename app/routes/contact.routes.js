const express = require("express");
const contacts = require("../controllers/contact.controller");


module.exports = (app) => {
    const router = express.Router();

    router.post("/",contacts.create);

    
    router.get("/",contacts.findALL);

    
    router.get("/favorite",contacts.findALLFavorite);

    
    router.get("/:id",contacts.findONE);

    
    router.put("/:id",contacts.update);

    
    router.delete("/:id",contacts.delete);

    
    router.delete("/",contacts.deleteALL);

    app.use("/api/contacts", router);
};