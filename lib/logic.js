
'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {iiitb.education.project.issuecertificate} issuetxn
 * @transaction
 */
async function issuetransaction ( issuetxn ) {
   var NS = 'iiitb.education.project';
    
    var issuer = issuetxn.issuer ;
    var recipient= issuetxn.recipient ;
    var certificate =issuetxn.certificate;
    var txid  =  issuetxn.transactionId;
    var certificatelink = issuetxn.certificatelink;
 
  if(!issuetxn.certfields){
        issuetxn.certfields = [];    
    }
   if(!recipient.wcert){
        recipient.wcert = [];    
    }
   if(!issuer.issuedcert)
   { issuer.issuedcert = []; }
        
    // var wcert= issuetxn.certfields;
    certificate.recipient =recipient;
    certificate.issuedate =issuetxn.timestamp;

    issuetxn.certfields.certificateID   =    certificate.certificateId;
    issuetxn.certfields.transactionID   =    txid; 
    issuetxn.certfields.issuer   =    issuer;
    issuetxn.certfields.recipient   =    recipient;
    // console.log("I THINK RTHEDSR JSLJSlrjjDS LJERLD K" , issuetxn.certfields);
    
   // console.log("certificate send to student");
    recipient.wcert.push(issuetxn.certfields);
    issuer.issuedcert.push(issuetxn.certfields);
 


    
    const assetRegistry = await getAssetRegistry(NS+'.Certificate');
    await assetRegistry.update(certificate);
    const partiRegistry1 = await getParticipantRegistry(NS+'.Recipient');
    await partiRegistry1.update(recipient);
    const partiRegistry2 = await getParticipantRegistry(NS+'.Issuer');
    await partiRegistry2.update(issuer);


    /* Emit an event for the modified asset.
    let event = getFactory().newEvent('iiitb.education.project', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);   */
}
