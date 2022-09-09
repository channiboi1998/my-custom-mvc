const database = require('../core/database');

module.exports = class ChanniboiModel {

    constructor() {
        this.database = database;
    }

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

    from(tablename) {
        let query = ' FROM ' + tablename + ' ';
        return query;
    }

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

    async run(request, response, query, fields) {

        if (response.locals.profiler) {
            response.locals.profiler['query'] = query + '  ' + fields;
        }
        
        return await this.database.execute(query, fields);
    }
    
}