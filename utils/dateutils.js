const toDateTimeMysql = () => new Date().toISOString().slice(0, 19).replace('T', ' ')
module.exports = {
    toDateTimeMysql
}