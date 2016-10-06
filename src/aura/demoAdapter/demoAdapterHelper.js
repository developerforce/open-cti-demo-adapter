/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
    // show spinner until the panel is fully rendered
    // render panel of a certain type (i.e. c:phonePanel)
    // optionally, show a toast on top of the new component
    renderPanel : function(cmp, params) {
        cmp.set('v.showSpinner', true);
        if (params.toast) {
            cmp.find('toast-message').set('v.content', params.toast);
        }
        if (params.type) {
            $A.createComponent(params.type, params.attributes, function(newPanel) {
                if (cmp.isValid()) {
                    cmp.set('v.body', [ newPanel ]);
                    cmp.set('v.showSpinner', false);
                }
            });
        } else {
            cmp.set('v.showSpinner', false);
        }
    },

    // use open CTI to update the panel label
    setPanelLabel : function(cmp, panelLabel) {
        if (panelLabel) {
            sforce.opencti.setSoftphonePanelLabel({
                label : panelLabel
            });
        }
    },
    
    // first time this method is called, it will fetch the settings using opencti.getCallCenterSettings 
    getCallCenterSettings: function(cmp, callbackFunc) {
        if (callbackFunc && cmp.get('v.settings')) {
            callbackFunc(cmp.get('v.settings'));
        } else {   //first time call
            sforce.opencti.getCallCenterSettings({
                callback : function(response) {
                    if (response.success) {
                        cmp.set('v.settings', response.returnValue);
                        callbackFunc(cmp.get('v.settings'));
                    } else {
                        throw new Error(
                            'Unable to load call center settings. Contact your admin.')
                    }
                }
            })
        }
    }
})
