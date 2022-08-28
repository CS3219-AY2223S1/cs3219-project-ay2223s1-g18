module.exports.save = (Model, data) => {
    const collection = new Model(data);
    return collection.save();
};

module.exports.list = (Model, query) => Model.find(query).exec();
module.exports.deleteOne = (Model, query) => Model.deleteOne(query);
module.exports.update = (Model, condition, set, newDoc) =>
    Model.findOneAndUpdate(condition, set, newDoc).exec();
