/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

public class SoftphoneProviderHelper {
	public class ProviderFactory
    {
        public ProviderFactory(){}
        public SoftphoneProviderHelper.SoftphoneProvider newProvider(String className)
        {
            Type providerImpl = Type.forName(className);
            if (providerImpl == null){
                return null;
            }
            return (SoftphoneProviderHelper.SoftphoneProvider) providerImpl.newInstance();
        }
    }

    public class CallResult {
        public String status;
        public String toNumber;
        public String fromNumber;
        public String accoundId;
        public String provider;
        public String error;
        public String duration;
        public DateTime startTime;
    }

    public interface SoftphoneProvider {
      CallResult makeCall(String account, String token, String toNumber, String fromNumber);
    }

    /*
     * Example of a call provider, using the Twilio Helper Package
     */
    public class TwilioProvider implements SoftphoneProvider {
      public CallResult makeCall(String account, String token, String toNumber, String fromNumber) {
          /* uncomment this code once you installed the Twilio Helper Package in your org
           * more info here: https://www.twilio.com/docs/libraries/salesforce#installation


          TwilioRestClient client = new TwilioRestClient(account, token);

          Map<String,String> params = new Map<String,String> {
                  'To'   => toNumber,
                  'From' => fromNumber,
                  'Url' => 'http://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient'
              };
          TwilioCall call = client.getAccount().getCalls().create(params);
          CallResult result = new CallResult();
          result.status = call.getStatus();
          return result;

          */
          CallResult result = new CallResult();
          result.status = 'TWILIO_IS_NOT_INSTALLED';
          return result;
        }
    }

    public class DummyProvider implements SoftphoneProvider {
      public CallResult makeCall(String account, String token, String toNumber, String fromNumber) {
            CallResult result = new CallResult();
            result.status = 'DUMMY_RESPONSE_OK';
            result.toNumber = toNumber;
            result.fromNumber = fromNumber;
            result.accoundId = account;
            result.provider = 'DUMMY_PROVIDER';
            result.duration = '10sec';
            result.startTime = DateTime.now();
            return result;
        }
    }
}
