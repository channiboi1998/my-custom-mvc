/***
 * This ChanniboiController is the Main Controller of this custom MVC. 
 * 
 * As of 10/09/2022
 * - has methods such as `load_view`, `load_json`, `divert`.
 * 
 */

module.exports = class ChanniboiController {

    constructor() {
        //No idea what to put here at the moment
    }

    /***
     * This method should accept `request`, `response`, `view_path` and the data. This method is responsible for displaying view templates.
     */
    load_view(request, response, view_path, data) {
        /***
         * I have a code here that checks if the profiler is ON. If it is, attach the profiler information to the response data.
         */
        if (response.locals.profiler) {
            response.locals.profiler['end_execution_time'] = Date.now();
            response.locals.profiler['executed_time'] = response.locals.profiler.end_execution_time - response.locals.profiler.start_execution_time + ' ms';
            data['profiler'] = response.locals.profiler;
        }
        return response.render(view_path, {data:data});
    }

    /***
     * This method should accept 3 parameters, which are the `request`, `response` and the `data` that will be passed.
     */
    load_json(request, response, data) {
        /***
         * I have a code here that checks if the profiler is ON. If it is, attach the profiler information to the response data.
         */
        if (response.locals.profiler) {
            response.locals.profiler['end_execution_time'] = Date.now();
            response.locals.profiler['executed_time'] = response.locals.profiler.end_execution_time - response.locals.profiler.start_execution_time + ' ms';
            data['profiler'] = response.locals.profiler;
        }
        return response.json(data);
    }

    /***
     * This method should accept 3 parameters, which are the `request`, `response` and the `url`.
     */
    divert(request, response, url) {
        return response.redirect(url);
    }

}