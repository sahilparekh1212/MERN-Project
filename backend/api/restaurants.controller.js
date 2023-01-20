import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {}
        if (req.query.cuisine) {
            // http://localhost:5000/api/v1/restaurants?cuisine=American
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode) {
            // http://localhost:5000/api/v1/restaurants?zipcode=10314
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {
            // http://localhost:5000/api/v1/restaurants?name=food-cave
            filters.name = req.query.name
        }

        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage
        })

        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }

        res.json(response);
    }
}