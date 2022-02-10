const {Drop} = require('../models');

const {getUser} = require('../middlewares/auth');

exports.newDrop = async (accessToken, body) => {
    const user = await getUser(accessToken)
    const {content, latitude, longitude} = body;

    const drop = await Drop.create({
        content,
        latitude,
        longitude,
        createdAt:Date(),
        creatorPk:user.pk
    });
    return drop;
}

exports.getDrops = async () => {
    const drops = await Drop.findAll({});
    return drops;
}