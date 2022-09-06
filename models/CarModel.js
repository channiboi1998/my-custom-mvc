const db = require('../util/database');
const queryBuilder = require('../util/querybuilder');

class CarModel {

    async getAllCars() {
        let querybuilder = new queryBuilder;
        let query = querybuilder.select(['id', 'name', 'year']).from('cars').create_query();
        return await db.execute(query);
    }
    
    async getCar(id) {
        let querybuilder = new queryBuilder;
        let query = querybuilder.select().from('cars').where(['id = ?']).create_query();
        return await db.execute(query, [id]);
    }
    
}

module.exports = new CarModel();