/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
    // expand the status dropdown on click
    toggleStatus: function(cmp) {
        var dropdown = cmp.find('dropdownContainer');
        $A.util.toggleClass(dropdown, 'slds-is-open');
    },

    // update the status dropdown (presence and icon)
    setStatusName: function(cmp, selectOption) {
        var newStatus = selectOption.getAttribute('data-value-name');
        var iconType = selectOption.getAttribute('data-value-iconType');
        cmp.set('v.presence', newStatus);
        this.renderIcon(cmp, iconType);
    },

    // update the status icon on the first row of the status dropdown
    renderIcon : function(cmp, iconType) {
        $A.createComponent("c:svg",
            {"class": 'slds-icon slds-icon--x-small slds-icon-text-'+iconType,
            "aura:id": "statusIcon",
            "xlinkHref": "/resource/slds/assets/icons/utility-sprite/svg/symbols.svg#record"},
            function(newIcon) {
                if (cmp.isValid()) {
                    cmp.set('v.icon', [ newIcon ]);
                }
            });
    },

    // on logout, disable click to dial and bring up the cti login panel
    handleLogout: function(cmp) {
        var callback = function(result) {
            if (result.success) {
                cmp.getEvent('renderPanel').setParams({
                    type: 'c:ctiLoginPanel'
                }).fire();
            } else {
                throw new Error('Click to dial cannot be disabled.');
            }
        };
        sforce.opencti.disableClickToDial({
            callback: callback
        });
    },

    // set the panel label by firing the editPanel event
    setLabel: function (cmp, label) {
        cmp.getEvent('editPanel').setParams({
                label: label
        }).fire();
    },

    // notify the phone panel that the presence has changed
    notifyPhonePanel: function(cmp, helper, newStatus) {
        cmp.getEvent('onlinePresenceChanged').setParams({
            newStatus: newStatus
        }).fire();
    }
})
