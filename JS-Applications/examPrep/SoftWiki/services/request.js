const request = async (method, url, body) => {// body е аргумента, който ще държи мейл и парола . Те от своя страна ще ни трябват, зада разберем дали сме аутентикирани за определения рекуест. 
    let options = {
        method,
    };

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ ...body, returnSecureToken: true })
        });
    }

    let response = await fetch(url, options);
    let data = await response.json();
    return data;
};

export default {
    get: request.bind(this, "GET"),
    post: request.bind(this, "POST"),
    put: request.bind(this, "PUT"),
    patch: request.bind(this, "PATCH"),
    delete: request.bind(this, "DELETE")
}