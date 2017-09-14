const express = require('express');
const router = express.Router();
const AttachmentsMgr = require('../controller/attachments');
const userHelpers = require('../controller/userHelpers');

router.post('/', userHelpers.isLogin, (req, res) => {
  AttachmentsMgr.newAttachment(req.body, newAttachment => {
    res.send(newAttachment);
  });
});

router.put('/:id', userHelpers.isLogin, (req, res) => {
  AttachmentsMgr.updateAttachment(req.params.id, req.body, attachment => {
    res.send(attachment);
  });
});

router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  AttachmentsMgr.getAllAttachment(
    req.params.limit,
    req.params.page,
    attachment => {
      res.send(attachment);
    }
  );
});

router.get('/:id', userHelpers.isLogin, (req, res) => {
  AttachmentsMgr.getAttachmentId(req.params.id, attachment => {
    res.send(attachment);
  });
});

module.exports = router;
