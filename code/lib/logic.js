
'use strict';
/* transactions for the credential verification.
   1. Issuing Transaction.
   2. Verifying Transaction.
*/
/**
 * Issuing  transaction
 * @param {iiitb.education.project.issuecertificate} issuetxn
 * @transaction
 */
async function issuetransaction(issuetxn) {
    var NS = 'iiitb.education.project';

    var issuer = issuetxn.issuer;
    var recipient = issuetxn.recipient;
    var certificate = issuetxn.certificate;
    var txid = issuetxn.transactionId;
    var certificatelink = issuetxn.certificatelink;

    if (!issuetxn.certfields) {
        issuetxn.certfields = [];
    }
    if (!recipient.wcert) {
        recipient.wcert = [];
    }
    if (!issuer.issuedcert) { issuer.issuedcert = []; }

    // var wcert= issuetxn.certfields;
    certificate.recipient = recipient;
    certificate.issuedate = issuetxn.timestamp;
    if (certificate.issued == "TRUE")
        throw new Error("This certificate is Already Issued");
    certificate.issued = "TRUE";

    issuetxn.certfields.certificateID = certificate.certificateId;
    issuetxn.certfields.transactionID = txid;
    issuetxn.certfields.issuer = issuer;
    issuetxn.certfields.recipient = recipient;

    // console.log("certificate send to student");
    recipient.wcert.push(issuetxn.certfields);
    issuer.issuedcert.push(issuetxn.certfields);




    const assetRegistry = await getAssetRegistry(NS + '.Certificate');
    await assetRegistry.update(certificate);
    const partiRegistry1 = await getParticipantRegistry(NS + '.Recipient');
    await partiRegistry1.update(recipient);
    const partiRegistry2 = await getParticipantRegistry(NS + '.Issuer');
    await partiRegistry2.update(issuer);


    /* Emit an event for the modified asset.
    let event = getFactory().newEvent('iiitb.education.project', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);   */
}

/**
 * Verifying  transaction
 * @param {iiitb.education.project.verifyCertificate} verifytxn
 * @transaction
 */
async function verifytransaction(verifytxn) {
    var NS = 'iiitb.education.project';

    var txid = verifytxn.transactionid;
    var certificatehash = verifytxn.certificatehash;
    let results = await query('getTransactionbyId', { transactionid: txid });
    console.log(txid);
    console.log(results);
    var verified = "FALSE";
    console.log(results[0].certificatehash);
    if (results[0].certificatehash == certificatehash) {
        console.log("ye to ho gya yha");
        var verified = "TRUE";
    }

    //A Notification event
    let Notification = getFactory().newEvent(NS, 'verify');
    Notification.verifytrue = verified;
    emit(Notification);

}

