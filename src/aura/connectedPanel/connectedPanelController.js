/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
    // set the panel label to Open CTI: Connected
    init: function(cmp, event, helper) {
        cmp.getEvent('editPanel').setParams({
            label : 'Open CTI Softphone: Connected'
        }).fire();
    },

    // a handler for the dial pad icon, showing or hiding the dial pad
    toggleDialPad: function(cmp, event, helper) {
        cmp.set('v.showDialPad', !cmp.get('v.showDialPad'));
        cmp.set('v.inputValue', '');
    },

    // log a task, unless the record is unrecognized, and return to phone panel when ending a call
    endCall: function(cmp, event, helper) {
        helper.logCall(cmp, function(response) {
            cmp.getEvent('renderPanel').setParams({
                type : 'c:phonePanel',
                toast : {'type': 'normal', 'message': 'Call was ended.'},
                attributes : { presence : cmp.get('v.presence')}
            }).fire();
        })
    },

    // update search bar with every key click, and update the status of the Call button
    handleKeyClick: function(cmp, event, helper) {
        cmp.set('v.inputValue', cmp.get('v.inputValue') + event.getParam('value'));
        cmp.set('v.transfercallDisabled', false);
    },

    transferCall: function(cmp, event, helper) {
        cmp.getEvent('renderPanel').setParams({
              toast : {'type': 'normal', 'message': 'Call was transferred to '+ cmp.get('v.inputValue') +'.'},
        }).fire();
    },
})