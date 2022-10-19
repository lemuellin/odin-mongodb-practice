//CH4 Lab1 - Logic Operators
db.zips.find({
    "$nor" : [
                {"pop":{"$gt":1000000}},
                {"pop":{"$lt":5000}}
            ]
}).count();


//CH4 Lab2 - Logic Operators
//solution 1
db.companies.find({
    "$or" : [
        {"founded_year": 2004, 
            "$or": [
                {"category_code":"social"},{"category_code":"web"}
            ]
        },
        
        {"founded_month": 10, 
            "$or": [
                {"category_code":"social"},{"category_code":"web"}
            ]
        }
    ]
}).count();

//solution 2
db.companies.find({
    "$and" : [
        {"$or": [
                {"founded_year": 2004},{"founded_month": 10}
        ]},
        
        {"$or": [
                {"category_code":"social"},{"category_code":"web"}
        ]}
    ]
}).count();

//CH4 Lab1 - $expr
db.companies.find({
    "$expr":{
        "$eq": ["$permalink", "$twitter_username"]
    }
}).count();

//CH4 Lab1 - Array Operators
db.listingsAndReviews.find({
    "accommodates":{"$gt":6},
    "reviews":{"$size":50}
}).pretty();

//CH4 Lab2 - Array Operators
db.listingsAndReviews.find({
    "property_type": "House",
    "amenities": {"$all": ["Changing table"]}
}).count();

//CH4 Lab - Array Operators and Projection
db.companies.find({
    "offices":{"$elemMatch":{"city": "Seattle"}}
}).count();

//CH4 Lab1 - Querying Arrays and Sub-Documents
db.trips.find({
    "start station location.coordinates.0": {"$lt": -74}
}).count();

//CH4 Lab2 - Querying Arrays and Sub-Documents
db.inspections.find({
    "address.city":"NEW YORK"
}).count();

//CH5 Lab - Aggregation Framework
db.listingsAndReviews.aggregate([
    {"$project":{"room_type":1, "_id":0}},
    {"$group":{"_id":"$room_type", "count":{"$sum":1}}}
]);

//CH5 Quiz 2: sort() and limit()
db.trips.find(
    {"birth year": {"$ne":""}},
    {"birth year": 1, "_id":0}).sort({"birth year": -1}).limit(3);