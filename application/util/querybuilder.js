module.exports = class QueryBuilder {

    constructor()  {
        this.select_query = '';
        this.from_query = '';
        this.where_query ='';
        this.query = '';
        return this;
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
        this.select_query = query;
        return this;
    }

    from(tablename) {
        this.from_query = ' FROM ' + tablename + ' ';
        return this;
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
        this.where_query = query; 
        return this;
    }

    create_query() {
        this.query = this.select_query + this.from_query + this.where_query;
        return this.query;
    }
    
}