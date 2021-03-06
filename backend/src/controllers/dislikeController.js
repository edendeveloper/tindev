const devModel = require('../models/dev')

module.exports = {
    async store(req, res) {
        const { devId } = req.params
        const { user } = req.headers

        const loggedDev = await devModel.findById(user)
        const targetDev = await devModel.findById(devId)

        if (!targetDev) {
            return res.status(400).json({error : 'Dev not exists'})
        }

        loggedDev.dislikes.push(targetDev._id)

        await loggedDev.save()

        return res.json({ loggedDev })
    }
}