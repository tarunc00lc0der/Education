/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {iiitb.education.project.issuertransaction} issuertransaction
 * @transaction
 */
async function issuertransaction( issuertransaction ) {
    
    var issuer= issuertransaction.issuer 
    var recipient= issuertransaction.recipient 
    var certificate=issuertransaction.certificate
    var txid=issuertransaction.transactionID

    recipient.recievedcert.push(certificate)


    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('iiitb.education.project.certificate');
    // Update the asset in the asset registry.
    await assetRegistry.update(issuertransaction.certificate);

    /* Emit an event for the modified asset.
    let event = getFactory().newEvent('iiitb.education.project', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
    */
}
