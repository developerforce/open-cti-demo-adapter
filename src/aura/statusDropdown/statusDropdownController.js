/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
    // populate the values of the status dropdown
    init: function(cmp, event, helper) {
        var presence = cmp.get('v.presence');
        var states = { 'Available' : 'available',
                       'Busy' : 'warning',
                       'Unavailable': 'error'};
        var iconType = states[presence];
        helper.renderIcon(cmp, iconType);
        var arr = [];
        for (var property in states) {
            if (states.hasOwnProperty(property)) {
            	arr.push({status : property, iconType : states[property]})
            }
        }
        cmp.set('v.states', arr);
        helper.setLabel(cmp, 'Open CTI Softphone: '+presence);
    },

    // expand the status dropdown on click
    toggleStatus: function (cmp, event, helper) {
        helper.toggleStatus(cmp);
    },

    // update the status/presence by firing the onlinePresenceChanged event
    handleSelection: function (cmp, event, helper) {
        var selectedOption = event.currentTarget;
        helper.setStatusName(cmp, selectedOption);
        helper.toggleStatus(cmp);
        helper.setLabel(cmp, 'Open CTI Softphone: '+selectedOption.getAttribute('data-value-name'));
        helper.notifyPhonePanel(cmp, helper, selectedOption.getAttribute('data-value-name'));
    },

    // on log out
    handleLogout: function(cmp, event, helper) {
        helper.handleLogout(cmp);
    }
})
