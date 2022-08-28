
export default class Helper {
    save(Model, data) {
        const collection = new Model(data);
        return collection.save();
    };

    list(Model, query) { 
        return Model.find(query).exec(); 
    };

    update(Model, condition, set, newDoc) { 
        return Model.findOneAndUpdate(condition, set, newDoc).exec(); 
    };

    deleteOne(Model, query) { 
        return Model.deleteOne(query); 
    };
};

