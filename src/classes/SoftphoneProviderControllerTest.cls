/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

@isTest(SeeAllData=true)
private class SoftphoneProviderControllerTest {
    private static testMethod void testDummyProviderCall() {
        SoftphoneProviderHelper.CallResult expectedResult = new SoftphoneProviderHelper.CallResult();
        expectedResult.status = 'DUMMY_RESPONSE_OK';
        expectedResult.toNumber = 'toNumber';
        expectedResult.fromNumber = 'fromNumber';
        expectedResult.accoundId = 'account';
        expectedResult.provider = 'DUMMY_PROVIDER';
        expectedResult.duration = '10sec';
        // ACT
        SoftphoneProviderHelper.CallResult actualResult = (SoftphoneProviderHelper.CallResult) JSON.deserialize(SoftphoneProviderController.call('DummyProvider', 'account', 'token', 'toNumber', 'fromNumber'),SoftphoneProviderHelper.CallResult.class);
        System.assert(actualResult.startTime != null, 'Result should contain a startTime');
        actualResult.startTime = null;
        System.assert(JSON.serialize(expectedResult).equals(JSON.serialize(actualResult)), 'Result should match the Dummy Provider response');
    }

    private static testMethod void testTwilioCallWhenTwilioNotInstalled() {
        SoftphoneProviderHelper.CallResult expectedResult = new SoftphoneProviderHelper.CallResult();
        expectedResult.status = 'TWILIO_IS_NOT_INSTALLED';
        // ACT
        SoftphoneProviderHelper.CallResult actualResult = (SoftphoneProviderHelper.CallResult) JSON.deserialize(SoftphoneProviderController.call('TwilioProvider', 'account', 'token', 'toNumber', 'fromNumber'),SoftphoneProviderHelper.CallResult.class);
        System.assert(JSON.serialize(expectedResult).equals(JSON.serialize(actualResult)), 'Result should contain status TWILIO_IS_NOT_INSTALLED');
    }
}
