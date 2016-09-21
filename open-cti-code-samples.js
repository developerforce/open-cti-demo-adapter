/* Include this in your html
<script src="https://<your salesforce url>/support/api/38.0/lightning/opencti_min.js" type="text/javascript"></script>

and then use one of the samples below inside a script tag.
*/

/**
 * @param {Object} args
 * @param {Function} args.callback
 */
args = {
    callback: function(result) {
        console.log(result);
    }
};
sforce.opencti.enableClickToDial(args)

/** additional sample code 
/**
 * @param {Object} args
 * @param {Function} args.callback
 */
args = {
    callback: function(result) {
        console.log(result);
    }
};
sforce.opencti.disableClickToDial(args)

/**
 * @param {Object} args
 * @param {Function} args.listener
 */
args = {
    listener: function(result) {
        console.log(result);
    }
};
sforce.opencti.onClickToDial(args)

/**
 * @param {Object} args
 * @param {Function} args.callback
 */
args = {
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.getAppViewInfo(args)

/**
 * @param {Object} args
 * @param {Function} args.listener
 */
args = {
    listener: function(result) {
        console.log(result);
    }
};
sforce.opencti.onNavigationChange(args)

/**
 * @param {Object} args
 * @param {string} args.apexClass
 * @param {string} args.methodName
 * @param {string} args.methodParams
 * @param {Function} args.callback
 */
args = {
    apexClass: 'AccountRetrieval',
    methodName: 'getAccount',
    methodParams: 'name=Acme',
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.runApex(args)

/**
 * Returns true and new object Id in callback if object successfully created or updated, null otherwise.
 * @param {string} args.value
 * @param {Function} args.callback
 */
args = {
    value: {id:'001xx000003DGcrAAG', LastName:'PersonAccountLast'},
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.saveLog(args)

/**
 * @param {string} args.searchParams
 * @param {object} args.callType (internal or outbound)
 * @param {object|string} args.queryParams
 * @param {boolean} args.deferred (false default)
 * @param {Function} args.callback
 */
args = {
    searchParams: 'Acme',
    callType: 'inbound',
    queryParams: 'name=Acme',
    deferred: false,
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
            if(result.returnValue.SCREEN_POP_DATA) {
                sforce.opencti.screenPop(result.returnValue.SCREEN_POP_DATA);
            }
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.searchAndScreenPop(args)

/**
 * Pops to the specified navigation type specified by the enum object sforce.opencti.SCREENPOP_TYPE. 
 * If false is returned, an error message is also returned.
 * @param {Object} args - An object holding arguments for calls to this method.
 * @param {Object} args.type - the enumerated type(e.g. sforce.opencti.SCREENPOP_TYPE.SOBJECT) to screen-pop to
 * @param {Object} args.params - An object holding arguments depending on the type.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */ 
args = {
    type: sforce.opencti.SCREENPOP_TYPE.SOBJECT,
    params: {recordId: "001xx000003DGa9AAG"}, 
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.screenPop(args)

/**
 * Returns in callback true if the softphone panel was successfully shown or hidden, false otherwise.
 * If false is returned, an error message is also returned.
 * @param {Object} args - An object holding arguments for calls to this method.
 * @param {boolean} args.visible - true to show and false to hide the softphone container.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */
args = {
    visible: true,
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.setSoftphonePanelVisibility(args)

/**
 * Returns true if the softphone panel is currently shown or false otherwise.
 * If false is returned, an error message is also returned.
 * @param {Object} args - An object holding arguments for calls to this method.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */
args = {
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.isSoftphonePanelVisible(args)

/**
 * Returns callCenterSettings in JSON string as part of result if API call is successful.
 * If api call fails, an error message is also returned.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */
    
args = {
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.getCallCenterSettings(args)

/**
 * Refreshes the current view and returns JSON string true as part of result if API call is successful.
 * If api call fails, an error message is also returned.
 * @param {Function} args.callback - An optional function which will be called upon completion of this method's invocation.
 */
args = {
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.refreshView(args)

/**
 * Returns SoftPhone Layout in json string as part of result if api call is successful,
 * If api call fails, an error message is also returned.
 * @param {Function} args.callback executes function on success and returns error on failure
 */
args = {
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.getSoftphoneLayout(args)

/**
 * Sets the label in the softphone utility item.
 * @param {Object} args - An object holding arguments for calls to this method.
 * @param {string} args.label - The label to set.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */
args = {
    label: 'Test Item Label',
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.setSoftphoneItemLabel(args)

/**
 * Sets the label in the softphone panel's header.
 * @param {Object} args - An object holding arguments for calls to this method.
 * @param {string} args.label - The label to set.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */
args = {
    label: 'Test Panel Label',
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.setSoftphonePanelLabel(args)

/**
 * Sets the icon in the softphone utility item.
 * @param {Object} args - An object holding arguments for calls to this method.
 * @param {string} args.key - The image key of the icon to display.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */
args = {
    key: 'end_call',
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.setSoftphoneItemIcon(args)

/**
 * Sets the icon in the softphone panel's header.
 * @param {Object} args - An object holding arguments for calls to this method.
 * @param {string} args.key - The image key of the icon to display.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */
args = {
    key: 'call',
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.setSoftphonePanelIcon(args)

/**
 * Sets the height of the softphone panel.
 * @param {Object} args - An object holding arguments for calls to this method.
 * @param {number} args.heightPX - height value is specified in pixel to set height of the softphone panel.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */
args = {
    heightPX: 150,
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.setSoftphonePanelHeight(args)

/**
 * Sets the width of the softphone panel.
 * @param {Object} args - An object holding arguments for calls to this method.
 * @param {number} args.widthPX - width value is specified in pixel to set width of the softphone panel.
 * @param {Function} args.callback - Function which will be called upon completion of this method's invocation.
 */
args = {
    widthPX: 70,
    callback: function(result) {
        if (result.success) {
            console.log(result.returnValue);
        } else {
            console.log(result.errors);
        }
    }
};
sforce.opencti.setSoftphonePanelWidth(args)
