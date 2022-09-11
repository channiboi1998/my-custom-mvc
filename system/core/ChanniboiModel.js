/***
 * This ChanniboiModel is the Main Model of this custom MVC. 
 */

const database = require('./database'); /* Importing the database connection file: application > core > database */

module.exports = class ChanniboiModel {

    constructor() {
        this.database = database;
    }

    /***
     * This is the `SELECT` method - custom query builder
     */
    select(parameters) {
        let query = 'SELECT ';
        if (parameters) {
            for (let i=0; i<parameters.length; i++) {
                if (i != parameters.length-1) {
                    query += ' '+parameters[i]+', '; 
                } else {
                    query += ' '+parameters[i]+' ';
                }
            }
        } else {
            query += ' * ';
        }
        return query;
    }

    /***
     * This is the `FROM` method - custom query builder
     */    
    from(tablename) {
        let query = ' FROM ' + tablename + ' ';
        return query;
    }

    /***
     * This is the `WHERE` method - custom query builder
     */    
    where(parameters) {
        let query = ' WHERE ';
        for(let i=0; i<parameters.length; i++) {
            if (i == parameters.length-1) {
                query += parameters[i];
            } else {
                query += parameters[i]+ ' AND '; 
            }
        }
        return query;
    }

    or_where(parameters) {
        let query = ' WHERE ';
        for(let i=0; i<parameters.length; i++) {
            if (i == parameters.length-1) {
                query += parameters[i];
            } else {
                query += parameters[i]+ ' OR '; 
            }
        }
        return query;
    }    

    join(method, table, condition) {
        let query = ' '+method+' JOIN ';
        query += ' '+table+ ' ';
        query += ' ON '+condition+ ' ';
        return query;
    }

    group_by(condtion) {
        return ' GROUP BY ' +condtion+ ' ';
    }

    /***
     * This is the `RUN` method - custom query builder
     */   
    async run(request, response, query, fields) {
        /***
         * Check if custom profiler is enabled
         */
        if (response.locals.profiler) {
            response.locals.profiler['query'] = query + '  ' + fields;
        }

        if (fields) {
            return await this.database.execute(query, fields);
        } else {
            return await this.database.execute(query);
        }

    }
    
}