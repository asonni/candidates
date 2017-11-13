const express = require('express');
const router = express.Router();
const AttachmentsMgr = require('../controller/attachments');
const userHelpers = require('../controller/userHelpers');
const LogMgr = require('../controller/logs');
const errorlog = require('../routes/logger').errorlog;
const successlog = require('../routes/logger').successlog;

// Add new Attachment  
router.post('/', userHelpers.isLogin, (req, res) => {
  if(userHelpers.isName(req.body.name)){
    successlog.warn(`the ${req.user.email} try add Attachment ${req.body.name}`);
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
          successlog.info(`the ${req.user.email}  added Attachment ${req.body.name}`);
          res.send(newAttachment);
        });
      }else{
        errorlog.error(`the ${req.user.email}   Attachment ${req.body.name} not added `);
        res.send(newAttachment);
      }
    });
  }else{
    errorlog.error(`the ${req.user.email}   Attachment ${req.body.name} not added validat err`);
    res.send({ result: false, err: 4 });
  }  
});

//  Edit Attachment by id 
router.put('/:id', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try edit Attachment ${req.body.name}`);
  AttachmentsMgr.updateAttachment(req.params.id, req.body, attachment => {
    if(attachment){
      successlog.info(`the ${req.user.email}  edit Attachment ${req.body.name}`);
      res.send(attachment);
    }else{
      errorlog.error(`the ${req.user.email} edit Attachment ${req.body.name}`);
      res.send(attachment);
    }
  });
});

// GET all Attachment By Search Value
router.get('/search/:election/:text/:limit/:page', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try get Attachment search `);
  AttachmentsMgr.searchAttachment(req.params.election,req.params.text,req.params.limit,req.params.page,attachment => {
    if(attachment){
      successlog.info(`the ${req.user.email} get Attachment search `);
      res.send(attachment);
    }else{
     errorlog.error(`the ${req.user.email} get Attachment search `);
     res.send(attachment);
    }
  });
});

// GET  Attachments By limit
router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try get Attachments `);
  AttachmentsMgr.getAllAttachment(
    req.params.limit,
    req.params.page,
    attachment => {
      if(attachment){
        successlog.info(`the ${req.user.email}  get Attachments`);
        res.send(attachment);
      }else{
        errorlog.error(`the ${req.user.email} get Attachments err`);
        res.send(attachment);
      }
    }
  );
});

//  GET Attachment by ID 
router.get('/:id', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try get Attachment `);
  AttachmentsMgr.getAttachmentId(req.params.id, attachment => {
    if(attachment){
      successlog.info(`the ${req.user.email}  get Attachment ${attachment.name}`);
      res.send(attachment);
    }else{
      errorlog.error(`the ${req.user.email} get Attachment err ${req.params.id}`);
      res.send(attachment);
    }
  });
});

//  Delete Attachment by id 
router.delete('/:id',userHelpers.isLogin ,  (req, res) => {
  successlog.warn(`the ${req.user.email} try delete Attachment ${req.params.id}`);
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
        successlog.info(`the ${req.user.email}  delete Attachment ${req.params.id}`);
        res.send(attachment);
      });
    }else{
      errorlog.error(`the ${req.user.email}   Attachment ${req.params.id} has been not deleted`);
      res.send(attachment)
    }
  });
});
module.exports = router;
