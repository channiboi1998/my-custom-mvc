/** Required: You must extend the MVC's `ChanniboiModel` when you are creating a controller **/
const ChanniboiModel = require('../../system/core/ChanniboiModel');

/** Required: You must export your model, to be used on your controller **/
module.exports = class SportsPlayersModel extends ChanniboiModel {

    async fetch_players(request, response) {

        let query = '';

        /***
         * Had to do delete request.query.player_name if it is empty, it is for the next `If` Statement. Because if it is empty, node still includes it in the `request.query` object.
         * 
         * I will find a way on how to fix this in the future.
         */
        if (request.query.player_name === '') {
            delete request.query.player_name;
        }

        if (Object.keys(request.query).length != 0) {
            /***
             * Means that there is fields that the client searched (Wether it be an input field or checkbox)
             */

            let parameters = request.query;

            query += this.select(['CONCAT(players.first_name, " ", players.last_name) AS name', 'players.profile_image']);
            query += this.from('player_sports');
            query += this.join('INNER', 'players', 'player_sports.player_id = players.id');
            query += this.join('INNER', 'sports', 'player_sports.sport_id = sports.id');

            /***
             * Base on the mini project i am creating, I want to fetch players in an `or_where` settings.
             * For example: If both `Male` and `Female` checkboxes are checked, show males and females.
             */
            let or_where_conditions = [];

            if (parameters.player_name) {
                or_where_conditions.push('players.first_name LIKE "%'+parameters.player_name+'%"');
            }

            if (parameters.gender) {
                if (typeof(parameters.gender) === 'string') {
                    or_where_conditions.push('players.gender LIKE "'+parameters.gender+'"');
                } else {
                    for (let i=0; i<parameters.gender.length; i++) {
                        or_where_conditions.push('players.gender LIKE "'+parameters.gender[i]+'"');
                    }
                }
            }

            if (parameters.sports) {
                if (typeof(parameters.sports) === 'string') {
                    or_where_conditions.push('sports.sport_name LIKE "'+parameters.sports+'"');
                } 
                else {
                    for (let i=0; i<parameters.sports.length; i++) {
                        or_where_conditions.push('sports.sport_name LIKE "'+parameters.sports[i]+'"');
                    }
                }
            }

            query += this.or_where(or_where_conditions);
            query += this.group_by('player_sports.player_id');

        } else {
            /***
             * Means that there are no search fields inputted by the client. Just fetch all players.
             */
            query += this.select(['CONCAT(players.first_name, " ", players.last_name) AS name', 'players.profile_image']);
            query += this.from('player_sports');
            query += this.join('INNER', 'players', 'player_sports.player_id = players.id');
            query += this.join('INNER', 'sports', 'player_sports.sport_id = sports.id');
            query += this.group_by('player_sports.player_id');

        }

        try {
            /***
             * Had to do 2 returns, for best practice
             */
            let [result] = await this.run(request, response, query);
            return new Promise((resolve, reject) => {
                resolve(result);
            });
        } catch (errors) {
            return new Promise((resolve, reject) => {
                reject(errors);
            });
        }
        

    }

}