let check = document.getElementById('Check');
var ID;
var flag = false;
var myNotificationID = null;
check.onclick = function () {
//usage:
getCookies("https://github.com/","dotcom_user")

};

function getCookies(domain,name) {
    chrome.cookies.get({"url": domain,"name": name}, function (cookie){
            ID = cookie;
            // alert(JSON.stringify(ID))
        if( ID !== null && ID !== ''  && ID.value !== ''){
            // flag = true;
            // notifyMe();
            chrome.notifications.create('',{   
                    type:"basic", //image,progress,list
                    title:"Notification",
                    message:"You Are Login Successfully",
                    iconUrl:"images/color-changer25.png",
                    buttons: [
                        { title: 'Reply' },
                        { title: 'Cancel' }
                      ]
                    // imageUrl: "http://news.beyblade.com/content/img/splash/splash-bayblade-bg.png"
                    // progress: 75
                    // items: [  { title: "Notification1", message: "Called Notification 1."},
                    //           { title: "Notification2", message: "Called Notification 2"},
                    //           { title: "Notification3", message: "Called Notification 3."}]
                },
                function(id) {
                    chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
                        if (notifId === id) {
                            if (btnIdx === 0) {
                                window.open("https://www.google.com/gmail/about/#");
                            } else if (btnIdx === 1) {
                                saySorry();
                            }
                        }
                    });
                } 
            );

            chrome.notifications.onClosed.addListener(function() {
                saySorry();
            });
            
            /* Handle the user's rejection 
             * (simple ignore if you just want to hide the notification) */
            function saySorry() {
                alert("Sorry to bother you !");
            }
        }    
        else{
            // alert('Cookies are not present please try to login again')
            // flag = false;
            // notifyMe();
            var newURL = "https://github.com/login";
            chrome.tabs.create({ url: newURL });
        }
             
    });
}
function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      if(flag == true){
        var notification = new Notification('Notification', {
            body: "Your Are Successfully Login",
          });
      }
      else{
        var notification = new Notification('Notification', {
            body: "Cookies are not present please try to login again",
          });
      }
     
    }
  
    // Otherwise, we need to ask the user for permission
    // Note, Chrome does not implement the permission static property
    // So we have to check for NOT 'denied' instead of 'default'
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
  
        // Whatever the user answers, we make sure we store the information
        if(!('permission' in Notification)) {
          Notification.permission = permission;
        }
  
        // If the user is okay, let's create a notification
        if (permission === "granted") {
          var notification = new Notification('Notification', {
            body: "Notification Turned on Permission Granted",
          });
        }
      });
    }
}
