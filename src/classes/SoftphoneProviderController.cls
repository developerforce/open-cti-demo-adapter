/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

global class SoftphoneProviderController {
    webservice static String call(String providerClass, String account, String token, String toNumber, String fromNumber) {
        SoftphoneProviderHelper.SoftphoneProvider provider = (new SoftphoneProviderHelper.ProviderFactory()).newProvider('SoftphoneProviderHelper.' + providerClass);
        SoftphoneProviderHelper.CallResult result;
        if (provider == null) {
            result = new SoftphoneProviderHelper.CallResult();
            result.status = 'NOT_SUPPORTED';
            result.error = 'The provider class '+ providerClass + ' is not supported';
         } else {
            result = provider.makeCall( account,  token,  toNumber,  fromNumber);
         }
        return JSON.serializePretty(result, true);
    }
}
