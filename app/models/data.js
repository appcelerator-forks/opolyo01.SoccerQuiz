var doc = {
	"categories" : [{
		"name" : "Aquarium",
		"values" : {
			"mainParameter" : 10,
			"secondaryParameter" : 5
		}
	}, {
		"name" : "Arcade",
		"values" : {
			"mainParameter" : 10,
			"secondaryParameter" : 5
		}
	}, {
		"name" : "Art Gallery",
		"values" : {
			"mainParameter" : 20,
			"secondaryParameter" : 15
		}
	}]
}; 

db.categories.insert(doc);
