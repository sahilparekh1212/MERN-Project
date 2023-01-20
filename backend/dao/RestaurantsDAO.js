let restaurants

export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.DB_TEMP).collection("restaurants");
        } catch (err) {
            console.log(`Error in retrieving data from DB_TEMP- ${err}`);
        }
    }

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPage = 20
    } = {}) {
        let query;
        if (filters) {
            if ("name" in filters) {
                //DB should have an index with name as "name" for it to work
                query = { $text: { $search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor;

        try {
            cursor = await restaurants.find(query);
        } catch (err) {
            console.log(`Cannot find cursor for query= ${query} , cursor=${cursor}`);
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPage).skip(restaurantsPage * page);

        try {
            const restaurantsList = await displayCursor.toArray();
            const totalNumRestaurants = await restaurants.countDocuments(query);
            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.log(`Cannot count displayCursor= ${displayCursor}`);
            return { restaurant20List: [], totalNumRestaurants: 0 }
        }

    }
}