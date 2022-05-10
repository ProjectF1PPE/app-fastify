const authorizedOnly = async (request, reply) => {
    console.log(request.headers);

    const {authorization, authHeader} = request.headers;

    if (!authHeader) {
        return reply.unauthorized('Not authorized !');
    }
};

module.exports = authorizedOnly;