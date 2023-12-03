const indexCtrl = {};

indexCtrl.renderIndex = ((req, res) => {
    res.render('index')
});

indexCtrl.renderAbout = ((req, res) => {
    res.render('about')
});

indexCtrl.renderChat = ((req, res) => {
    res.render('chat')
});

module.exports = indexCtrl;