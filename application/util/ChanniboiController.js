module.exports = class ChanniboiController {

    constructor() {
        //No idea what to put here smh
    }

    load_view(request, response, view_path, data) {
        if (response.locals.profiler) {
            response.locals.profiler['end_execution_time'] = Date.now();
            response.locals.profiler['executed_time'] = response.locals.profiler.end_execution_time - response.locals.profiler.start_execution_time + ' ms';
            data['profiler'] = response.locals.profiler;
        }
        return response.render(view_path, {data:data});
    }

    load_json(request, response, data) {
        if (response.locals.profiler) {
            response.locals.profiler['end_execution_time'] = Date.now();
            response.locals.profiler['executed_time'] = response.locals.profiler.end_execution_time - response.locals.profiler.start_execution_time + ' ms';
            data['profiler'] = response.locals.profiler;
        }
        return response.json(data);
    }

    divert(request, response, url) {
        return response.redirect(url);
    }

}