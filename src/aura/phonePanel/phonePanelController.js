/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
    // on initialization, get the Call Center Settings and enable click to dial
    init: function(cmp, event, helper) {
        cmp.set('v.searchResults', []);
        helper.handleOutgoingCalls(cmp);
    },

    // dial from dial pad: first check for a matching record, and then dial it
    searchAndCallNumber: function(cmp, event, helper) {
        var number = cmp.get('v.inputValue');
        helper.search(cmp, number, function(cmp, number){
            helper.callNumber(cmp, number);
        });
    },

    // when you hit Enter, if it's a valid phone number, check for a matching record, and then dial it.
    // otherwise, search and display search results
    handleKeyUp: function(cmp, event, helper) {
        if (event.getParams().keyCode == 13) { //enter
            cmp.set('v.showDialPad', false);
            var inputValue = cmp.get('v.inputValue');
            if (helper.isValidPhoneNumber(cmp)) {
                helper.search(cmp, inputValue, function(cmp, inputValue){
                    helper.callNumber(cmp, inputValue);
                });
            } else {
                helper.search(cmp, inputValue);
            }
        }
    },

    // update search bar with every key click, and update the status of the Call button
    handleKeyClick: function(cmp, event, helper) {
        cmp.set('v.inputValue', cmp.get('v.inputValue') + event.getParam('value'));
        helper.updateButtonStatus(cmp);
    },

    // handler for the dial pad icon, toggle dial pad on click
    toggleDialPad: function (cmp, event, helper) {
        var showDialPad = !cmp.get('v.showDialPad');
        cmp.set('v.showDialPad', showDialPad);
        cmp.set('v.inputValue', '');
        cmp.set('v.searchResults', []);
        if (showDialPad) {
            var toggleMessage = cmp.find("message");
            $A.util.toggleClass(toggleMessage, "toggle");
        }
    },

    // handler for the onlinePresenceChanged event. fired when the value of status dropdown is changing.
    onOnlinePresenceChanged: function (cmp, event, helper) {
         helper.updatePresence(cmp, event, helper);
    },

    // this method is called when once clicks on a search result card
    handleSelectCard: function (cmp, event, helper) {
        var index = event.currentTarget.getAttribute('data-value');
        var selectedRecord = cmp.get('v.searchResults')[index];
        if (!selectedRecord.Phone) {
            cmp.set('v.searchResults', []);
            cmp.set('v.message', "This contact doesn't have a phone number");
        } else {
            helper.callContact(cmp, selectedRecord);
        }
    },
})
