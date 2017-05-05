# Open CTI Lightning Demo Adapter

This CTI demo adapter package lets you test drive Open CTI for Lightning Experience. The package provides a demo softphone that highlights and demonstrates the main features of Open CTI for Lightning Experience without even connecting to a phone system. 

If you encounter any issues with this package, please file a [New Issue](https://github.com/developerforce/open-cti-demo-adapter/issues/new). You may also contact David Louvton, at dlouvton@salesforce.com. 

# Dependencies

To deploy, you need ANT.
To contribute to this project, you need Eclipse version 4.3 or higher, with the Force.com IDE plug-in.

You can also download and install this app as a package from: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t41000000bSXh

# Deploy via Ant

1. Clone this repository.
2. Update the build.properties file with credentials, such as your org username and password. For sf.serverurl, use the full My Domain URL (https for blitz and http for localhost).
3. To deploy this package in your org, run:
`ant deployAll -lib ant-salesforce.jar`
If you don't have Ant, you can install it on Mac using the command: 
brew install ant


# Develop

1. Install Eclipse version 4.3 or higher, with the  Force.com IDE plug-in. For more information, see Force.com IDE Installation page.
2. Clone this repository.
3. Import this project into Eclipse.
4. Deploy from Eclipse using https. By default, you can’t deploy to local orgs from Eclipse.
Note: If you use https, when you right-click on the folder open-cti-demo-adapter and click  Force.com, you see the options "Deploy to server" and "Refresh from server.” 
To download artifacts (such as Visualforce pages) from your org, use "Refresh from server.”
To deploy the code in the repository, or if you make changes, use "Deploy to server.”
5. Call the Open CTI API from your app. To learn how, use the [sample code](open-cti-code-samples.js).

# Usage

To deploy the code using ANT, you must add a custom domain to your Salesforce org URL. To set one up, see [My Domain](https://help.salesforce.com/HTViewHelpDoc?id=domain_name_overview.htm) in the Salesforce help.

1. Log in to your Salesforce org. 

2. Add a user to the Call Center. 
  * In Setup, enter Call Centers in the Quick find box, then click Call Centers. 
  * Click the Edit next to the Demo Call Center Adapter and then click Manage Call Center Users. 
  * Add any additional users that you want to use this demo adapter.

3. Create a Lightning Experience app.
  * You must be in Lightning Experience to create Lightning apps.
  * From Setup, use the App Manager to create a new Lightning app.
  * Add the Open CTI Softphone option to your app.

4. To use the demo adapter softphone, launch your new Lightning app and then click the phone icon in the utility bar.

# Call Center Settings

For the demo adapter to work properly, you might need to update some settings.

## General Settings

If you don’t see the softphone in your app or the softphone doesn’t launch, verify the CTI adapter URL is correct. To edit the CTI Adapter URL:

1. In your Salesforce org, go to Setup and enter Call Centers in the Quick Find box, then click Call Centers.

2. Click Edit next to the Demo Call Center Adapter and make sure that the CTI Adapter URL points to the absolute path of the Visualforce page called demoAdapterPage. The URL must include the Lightning path and your domain. For example, both of the following URLs are valid:
  * https://myDomain.my.salesforce.com/apex/demoAdapterPage
  * https://myDomain.lightning.instanceName.force.com/apex/demoAdapterPage

Note that if you are using a page from a managed package, the url will look like https://namespace-dev-ed.my.salesforce.com/apex/namespace__page

When the absolute URL doesn't work, open the chrome inspector look for an error like: 'Blocked a frame with origin "https://myDomain.my.salesforce.com" from accessing a cross-origin frame'. This is a clue that your CTI Adapter URL must start with https://myDomain.my.salesforce.com or whatever the error said that is blocked.

3. Click **Save**

To change the phone number used to simulate incoming calls, edit the Simulated Incoming Phone Number field on the Demo Call Center Adapter page in Setup. The default phone number used to simulate incoming calls is 415-555-1212.

## CTI Provider Settings

Want to make *real* calls with this demo adapter? We’ve made this super easy to do with Twilio. To integrate with Twilio, complete the following steps:

1. Install the [Twilio Salesforce Helper Library](https://www.twilio.com/docs/libraries/salesforce#installation) in your org.
You’ll need the following information:
  * CTI Provider—The name of the internal Apex class that implements SoftphoneProviderHelper.SoftphoneProvider, and has the code implementing makeCall(), such as DummyProvider, TwilioProvider or your own provider implementation.
  * Provider Account—Provider account ID.
  * Provider Auth Token—Provider authorization token.
  * Provider Caller Number—The phone number from where the call originated. This is the From number. By default, this is 415-555-5555.

2. In your Salesforce org, edit the Apex class SoftphoneProviderHelper. In the inner class TwilioProvider, uncomment the code related to Twilio.

3. Optionally, modify the default task page layout for your call center users.
For every call made with the demo adapter, the call log creates a task. To see the call-related fields on these tasks, assign the page layout Demo Call Task Layout to your call center users. For more information, see [Assigning Page Layouts](https://help.salesforce.com/apex/HTViewHelpDoc?id=customize_layoutassign.htm&language=en_US) in the Salesforce Help.

## More information
1. [Get Started with the Demo Adapter](https://developer.salesforce.com/page/Lightning_Open_CTI)
2. [Call Center Overview](https://help.salesforce.com/apex/HTViewHelpDoc?id=cti_overview.htm)
3. [Open CTI Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_cti.meta/api_cti/)
4. Email the author, David Louvton, at dlouvton@salesforce.com or create a [New Issue](https://github.com/developerforce/open-cti-demo-adapter/issues/new).
