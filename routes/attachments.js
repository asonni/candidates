const express = require('express');
const router = express.Router();
const AttachmentsMgr = require('../controller/attachments');
const userHelpers = require('../controller/userHelpers');
const LogMgr = require('../controller/logs');

router.post('/', userHelpers.isLogin, (req, res) => {
  if(userHelpers.isName(req.body.name)){
    AttachmentsMgr.newAttachment(req.body, newAttachment => {
      if(newAttachment.result){
        LogMgr.newLog({
          user_iduser :req.user._id,
          office :req.user.office,
          type :"add",
          table :"Attachment",
          desc :"add new Attachment name : "+req.body.name,
          table_idtable : newAttachment.result._id,
          value: req.body.name
        },log =>{
          res.send(newAttachment);
        });
      }else{
        res.send(newAttachment);
      }
    });
  }else{
    res.send({ result: false, err: 4 });
  }  
});

router.get('/search/:election/:text/:limit/:page', userHelpers.isLogin, (req, res) => {
  AttachmentsMgr.searchAttachment(req.params.election,req.params.text,req.params.limit,req.params.page,competitions => {
    res.send(competitions);
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


router.delete('/:id',userHelpers.isLogin ,  (req, res) => {
  AttachmentsMgr.deleteAttachment(req.params.id,attachment => {
    if(attachment.result){
      LogMgr.newLog({
        user_iduser :req.user._id,
        office :req.user.office,
        type :"delete",
        table :"Attachment",
        desc :"delete Attachment name : "+attachment.result.name,
        table_idtable : attachment.result._id,
        value: attachment.result.name
      },log =>{
        res.send(attachment);
      });
    }else{
      res.send(attachment)
    }
    
  });
});
module.exports = router;
