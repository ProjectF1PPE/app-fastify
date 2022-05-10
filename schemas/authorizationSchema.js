const S = require('fluent-json-schema');

const authorizationSchema = {
    headers: S.object().required(['authorization']).prop('authorization', S.string()),
    response: {
        401: S.object()
            .prop('statusCode', S.number())
            .prop('error', S.string())
            .prop('message', S.string())
            .description('Header not provided!'),
        403: S.object()
            .prop('statusCode', S.number())
            .prop('error', S.string())
            .prop('message', S.string())
            .description('Invalid JWT token')
    }
};

module.exports = authorizationSchema;