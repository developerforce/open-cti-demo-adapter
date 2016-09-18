/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
    // adds an onCLickToDial listener
    // This listener brings up the softphone every time click to dial is fired
    // and renders the callInitiatedPanel panel with the event payload
    handleOutgoingCalls : function(cmp) {
        var listener = function(payload) {
            sforce.opencti.setSoftphonePanelVisibility({
                visible : true,
                callback : function() {
                    if (cmp.isValid() && cmp.get('v.presence') != 'Unavailable') {
                        var attributes = {
                            'state' : 'Dialing',
                            'recordName' : payload.recordName,
                            'phone' : payload.number,
                            'title' : '',
                            'account' : '',
                            'presence' : cmp.get('v.presence')
                        };
                        cmp.getEvent('renderPanel').setParams({
                            type : 'c:callInitiatedPanel',
                            attributes : attributes
                        }).fire();
                    }
                }
            });
        };
        sforce.opencti.onClickToDial({
            listener : listener
        });
    },

    // toggles the Call button from disabled to enabled, if the input number is valid
    updateButtonStatus : function(cmp) {
        if (this.isValidPhoneNumber(cmp)) {
             cmp.set('v.callDisabled',false);
        } else {
             cmp.set('v.callDisabled',true);
        }
    },

    // returns true if phone number is a valid integer, i.e. at least 3 digits
    isValidPhoneNumber : function(cmp) {
        var inputValue = cmp.get('v.inputValue');
        return (inputValue.length >= 3 && !isNaN(parseFloat(inputValue)) && isFinite(inputValue));
    },

    // find a matching record for a number
    // if there's a match - initiate call panel with record details
    // if not, initiate call panel with only number and state
    callNumber : function(cmp, number) {
        var attributes = {
            'state' : 'Dialing',
            'recordName' : number
        };
        var record = cmp.get('v.searchResults')
                && cmp.get('v.searchResults')[0];

        if (record && this.matchingNumbers(number, record.Phone)) {
            attributes.recordName = record.Name;
            attributes.phone = record.Phone;
            attributes.title = record.Title;
            attributes.account = record.Account;
            attributes.recordId = record.Id;
        };
        cmp.set('v.searchResults', []);
        this.initiateCallPanel(cmp, attributes);
    },

    // strip alphabetic characters from numbers and returns true if numbers are matching
    matchingNumbers : function(number1, number2){
        var target = number2.replace(/\D/g,'')
        return number1.replace(/\D/g,'') == target && target.length > 0;
    },

    // when clicking on a contact card, initiate call panel with contact card details
    callContact : function(cmp, record) {
        if (!record ) {
            throw new Error('Something went wrong. Try again or contact your admin.');
        };
        var attributes = {
            'state' : 'Dialing',
            'recordName' : record.Name,
            'phone' : record.Phone,
            'title' : record.Title,
            'account' : record.Account,
            'recordId' : record.Id
        };
        this.initiateCallPanel(cmp, attributes);
    },

    // find a matching record using Open CTI runApex()
    // optionally run a callback function onCompletion
    search : function(cmp, inputValue, onCompletion) {
        cmp.set('v.searchResults', []);
        if (inputValue.length < 2) {
            cmp.set('v.message', 'Enter at least two characters');
            return;
        };
        var args = {
            apexClass : 'SoftphoneContactSearchController',
            methodName : 'getContacts',
            methodParams : 'name=' + inputValue,
            callback : function(result) {
                if (result.success) {
                    var searchResults = JSON.parse(result.returnValue.runApex);
                    console.log(searchResults);
                    cmp.set('v.searchResults', searchResults);
                    if (searchResults.length == 0) {
                        cmp.set('v.message', 'No results found');
                    }
                    onCompletion && onCompletion(cmp, inputValue);
                } else {
                    throw new Error('Unable to perform a search using Open CTI. Contact your admin.');
                }
            }
        };
        sforce.opencti.runApex(args);
    },

    // sets the presence to the new presence
    // and updates the message on the phone panel based on the new presense
    updatePresence : function(cmp, event, helper) {
        var newStatus = event.getParams().newStatus;
        cmp.set('v.presence', newStatus);
        var newMessage = 'Search for a contact';
        if (newStatus === 'Unavailable') {
            newMessage = "You're currently unavailable for calls";
            cmp.set('v.showDialPad',false);
        }
        cmp.set('v.message', newMessage);
    },

    // renders the callInitiatedPanel panel
    initiateCallPanel : function(cmp, attributes) {
        attributes.presence = cmp.get('v.presence');
        cmp.getEvent('renderPanel').setParams({
            type : 'c:callInitiatedPanel',
            attributes : attributes
        }).fire();
    }
})
