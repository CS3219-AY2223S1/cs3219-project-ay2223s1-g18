
export default class Helper {
  static async save (Model, data) {
    const collection = new Model(data)
    return collection.save()
  }

  static async list (Model, query) {
    return Model.find(query).exec()
  }

  static async listOne (Model, query) {
    return Model.findOne(query).exec()
  }

  static async updateOne (Model, condition, set, newDoc) {
    return Model.findOneAndUpdate(condition, set, newDoc).exec()
  }

  static async deleteOne (Model, query) {
    return Model.deleteOne(query)
  }
}
