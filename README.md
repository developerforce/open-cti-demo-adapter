# Open CTI Lightning Demo Adapter

This is a demo CTI adapter package that lets you test drive Open CTI for Lightning Experience. 
The package provides a demo softphone that highlights and demonstrates the main features of Open CTI for Lightning Experience without even connecting to a phone system. 


# Dependencies

You will need ant to deploy. To contribute to this project you will need Eclipse 4.3+, with the force plugin.

OR you can download and install this app as a package from: https://login.salesforce.com/packaging/installPackage.apexp?p0=04tB00000003tV0 

Important: You can only install this package in pre-release orgs. To sign up for a pre-release org, visit the Winter  ’17 Pre-Release page. Sign up for an Enterprise Edition org. 

# Deploy via Ant

1. Clone this repository.
2. Update build.properties with the credentials, such as org username and password. For sf.serverurl, use the full my domain url (https for blitz and http for localhost)
3. Run `ant deployAll -lib ant-salesforce.jar` in order to deploy this package to your org. If you don't have ant, you can install it on Mac using `brew install ant`


# Develop

1. Install Eclipse 4.3+, with the force plugin. (for more information, go to https://developer.salesforce.com/page/Force.com_IDE_Installation)
2. Clone this repository.
3. Import this project into eclipse.
4. Deploying from Eclipse only works with https, so by default you cannot deploy to local orgs from eclipse.
5. If you use https: When you right click on the folder open-cti-demo-adapter --> Force.com, you will see the options "deploy to server" and "refresh from server". To download artifacts (such as VF pages) from your org use "refresh from server". To deploy the code in the repo, or if you make changes, use "deploy to server".
6. Use the sample code [here](open-cti-code-samples.js) to see how to call the Open CTI API from your app.

# Usage

1. Make sure that you have My Domain enabled, or create a new domain by going to Setup/"My Domain" and deploy the domain. Once the domain is deployed you may deploy the code in this repo using Ant. 
2. Log in to your Salesforce org. and add a user to the Call Center.
From the Call Center Setup, go to the Demo Call Center Adapter page, click Manage Call Center Users and add any additional users that you want to use this demo adapter. 
4. Create an app (or use an existing app) with Open CTI enabled. You must be in Lightning Experience to create Lightning apps. 
From Setup, use the App Manager to create a new Lightning app. 
Add the Open CTI Softphone option to your app. 
5. Now the demo adapter will show when you click on "Phone" on the utility bar.

# Call Center Settings

You may need to update some of these settings for the demo adapter to work properly.

## General Settings

1. CTI Adapter URL: path of the VF demoAdapterPage page, i.e. https://dldemo.lightning.mobile2.t.force.com/apex/demoAdapterPage 
2. Simulated Incoming Phone Number: When you click on the 'Simulate an incoming call' button, a simulated phone call will come from this number, i.e. (415) 555-1212

## CTI Provider Settings
In order to actualy making calls, you will need to integrate with a CTI provider, such as Twilio.

Note: Want to make real calls with this demo adapter? We’ve made this super easy to do with Twilio. To integrate with Twilio, complete the following steps:
Install the Twilio Salesforce Helper Library in your org. For more information, see https://www.twilio.com/docs/libraries/salesforce#installation. 

You’ll need the following information:

1. CTI Provider—Apex class that implements SoftphoneProviderHelper.SoftphoneProvider, with makeCall() method, such as DummyProvider, TwilioProvider or your own provider implementation.
2. Provider Account—Provider account ID.
3. Provider Auth Token—Provider authorization token.
4. Provider Caller Number—Origin phone number

In your Salesforce org, edit the Apex class SoftphoneProviderHelper. In the inner class TwilioProvider, uncomment the code related to Twilio. 
