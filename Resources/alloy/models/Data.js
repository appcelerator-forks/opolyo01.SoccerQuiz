var doc = {
    categories: [ {
        name: "Aquarium",
        values: {
            mainParameter: 10,
            secondaryParameter: 5
        }
    }, {
        name: "Arcade",
        values: {
            mainParameter: 10,
            secondaryParameter: 5
        }
    }, {
        name: "Art Gallery",
        values: {
            mainParameter: 20,
            secondaryParameter: 15
        }
    } ]
};

db.categories.insert(doc);

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("data", exports.definition, []);

collection = Alloy.C("data", exports.definition, model);

exports.Model = model;

exports.Collection = collection;