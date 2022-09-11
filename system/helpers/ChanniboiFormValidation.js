module.exports = class Validation {

    constructor(body, condition) {
        this.body = body;
        this.condition = condition;
    }

    validate_each_fields() {

        let data = {
            'status': 200,
            'message': [],
        };

        Object.keys(this.condition).forEach(object_key => {
            for (let i=0; i<this.condition[object_key].length; i++) {
                if (this.condition[object_key][i] === 'required') {
                    if (!this.body[object_key].length) {
                        data['message'].push(object_key + ' is required');
                    }
                }
                if (this.condition[object_key][i] === 'email') {
                    let at_symbol_count = 0;
                    for (let k=0; k<this.body[object_key].length; k++) {
                        if (this.body[object_key][k] === '@') {
                            at_symbol_count++;
                        }
                    }
                    if (at_symbol_count != 1) {
                        data['message'].push(object_key + ' needs to be valid email');
                    }
                }
            }
        });

        if (data.message.length) {
            data['status'] = 422;
        }

        return data;
    }

}