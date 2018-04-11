
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
   var NS = iiitb.education.project;
    
    var issuer = issuetxn.issuer ;
    var recipient= issuetxn.recipient ;
    var certificate =issuetxn.certificate;
    var txid  =  issuetxn.transactionId;
    var certificatelink = issuetxn.certificatelink;
   if(!issuetxn.certfields){
        issuetxn.certfields= {};    
    }
        
    var wcert= issuetxn.certfields;
    var date = new Date (issuetxn.timestamp);
    certificate.recipient =recipient;
    certificate.issuedate =date.getDate();

    wcert.certificateID   =    certificate.certificateID;
    wcert.certificatelink =    certificatelink;
    wcert.transactionID   =    txid;
    
    console.log("certificate send to student");
    recipient.wcert.push(wcert);
    issuer.issuedcert.push(wcert);



    
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
