/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
  // sets the initial attributes and updates the duration every second
  init: function(cmp, event, helper){
    cmp.set('v.duration', '0:00');
    cmp.set('v.seconds', 0);
    cmp._intervalID=null;
    var start=null;

    function tick(){
      if (!cmp.isValid()){
        return;
      }
      var now=new Date();
      var diff=now.getTime()-start.getTime();
      diff=diff/1000;

      var duration=cmp.get('v.duration');
      var newDuration=helper.formatSecond(diff);
      if (duration!=newDuration){
        cmp.set('v.duration', newDuration);
        cmp.set('v.seconds', diff);
      }
    }
    var tickBack=$A.getCallback(tick);
    start=new Date();
    cmp._intervalID= window.setInterval(tickBack, 1000);
  },

  // return duration in seconds (for example, when duration is 10:06, it will return 606)
  getDurationInSeconds: function(cmp, event) {
    var params = event.getParam('arguments');
    if (params) {
        params.callback(cmp.get('v.seconds'));
    }
  }
})
