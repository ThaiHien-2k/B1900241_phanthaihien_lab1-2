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
