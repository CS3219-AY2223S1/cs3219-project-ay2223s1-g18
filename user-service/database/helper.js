
export default class Helper {
    static save(Model, data) {
        const collection = new Model(data);
        return collection.save();
    };

    static list(Model, query) { 
        return Model.find(query).exec(); 
    };

    static update(Model, condition, set, newDoc) { 
        return Model.findOneAndUpdate(condition, set, newDoc).exec(); 
    };

    static deleteOne(Model, query) { 
        return Model.deleteOne(query); 
    };
};

