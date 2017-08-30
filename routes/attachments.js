var express = require('express');
var router = express.Router();
var AttachmentsMgr = require("../controller/attachments");
var userHelpers = require("../controller/userHelpers");



router.post('/',userHelpers.isLogin,function(req, res) {
  AttachmentsMgr.newAttachment(req.body,function(newAttachment){

    res.send(newAttachment);
  });
});

router.put('/:id',userHelpers.isLogin,function(req, res) {
  AttachmentsMgr.updateAttachment(req.params.id,req.body,function(attachment){
    res.send(attachment);
  });
});



router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  AttachmentsMgr.getAllAttachment(req.params.limit,req.params.page,function(attachment){
    res.send(attachment);
  });
});


router.get('/:id',userHelpers.isLogin , function(req, res) {
  AttachmentsMgr.getAttachmentId(req.params.id,function(attachment){
    res.send(attachment);
  });
});

module.exports = router;
