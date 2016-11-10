/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
    // get call center settings, to get the information about the call provider
    // then use open CTI to screen pop to the record, and runApex() to make a call
    screenPopAndCall : function(cmp) {
        cmp.getEvent('getSettings').setParams({
            callback: function(settings) {
                sforce.opencti.screenPop({
                    type : sforce.opencti.SCREENPOP_TYPE.SOBJECT,
                    params : { recordId : cmp.get('v.recordId') },
                    callback : function(response) {
                        cmp.getEvent('editPanel').setParams({
                            label : 'Open CTI Softphone: ' + cmp.get('v.state')
                        }).fire();
                        var providerClass = settings['/reqPhoneDemoSettings/reqProvider'];
                        var account = settings['/reqPhoneDemoSettings/reqProviderAccount'];
                        var token = settings['/reqPhoneDemoSettings/reqProviderAuthToken'];
                        var fromNumber = settings['/reqPhoneDemoSettings/reqProviderCallerNumber'];
                        var toNumber = cmp.get('v.phone');
                        sforce.opencti.runApex({
                            apexClass : 'SoftphoneProviderController',
                            methodName : 'call',
                            methodParams : 'providerClass=' + providerClass + '&account=' + account + '&token='+ token + '&fromNumber=' + fromNumber + '&toNumber=' + toNumber,
                            callback : function(result) {
                                if (result.success) {
                                    sforce.opencti.screenPop({
                                        type : sforce.opencti.SCREENPOP_TYPE.SOBJECT,
                                        params : { recordId : cmp.get('v.recordId') },
                                    });
                                } else {
                                    throw new Error('Unable to make a call. Contact your admin.');
                                }
                            }
                        });
                    }
                })
             }
        }).fire();
    },

    // on Accept, accept the call by bringing up the Connected Panel
    renderConnectedPanel : function(cmp){
        var recordId = cmp.get('v.recordId');
        var account = cmp.get('v.account');
        cmp.getEvent('renderPanel').setParams({
            type : 'c:connectedPanel',
            attributes : {
                showDialPad : false,
                recordId : recordId,
                callType : 'Inbound',
                account : account,
                recordName: cmp.get('v.recordName'),
                presence : cmp.get('v.presence')
            }
        }).fire();
    }
})
