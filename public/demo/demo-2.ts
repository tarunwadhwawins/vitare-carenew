
import { SimpleUser, SimpleUserDelegate, SimpleUserOptions } from "../src/platform/web";
import { getButton, getInput, getVideo } from "./demo-utils";


const beginAlice = getButton("beginAlice");
const endAlice = getButton("endAlice");
const holdAlice = getInput("holdAlice");
const answerAlice = getButton("answerAlice");
const muteAlice = getInput("muteAlice");
const videoLocalAlice = getVideo("videoLocalAlice");
const videoRemoteAlice = getVideo("videoRemoteAlice");


const nameBob = "Bob";
const uriBob = "sip:"+getParameters('to')+"@dev.icc-health.com";
const from = getParameters('from');
const initl = getParameters('initl');
const name = "Alice";
const uri = "sip:"+from+"@dev.icc-health.com:7443";
const webSocketServer = "wss://dev.icc-health.com:7443";



// New SimpleUser for Alice
const alice = buildUser(
  webSocketServer,
  uri,
  name,
  uriBob,
  nameBob,
  beginAlice,
  endAlice,
  holdAlice,
  muteAlice,
  videoLocalAlice,
  videoRemoteAlice,
  '123456',
  from,
);



function buildUser(
  webSocketServer: string,
  aor: string,
  displayName: string,
  targetAOR: string,
  targetName: string,
 
  beginButton: HTMLButtonElement,
  endButton: HTMLButtonElement,
  holdCheckbox: HTMLInputElement,
  muteCheckbox: HTMLInputElement,
  videoLocalElement: HTMLVideoElement,
  videoRemoteElement: HTMLVideoElement,
  authorizationPassword: string,
  authorizationUsername: string,
): SimpleUser {

  // SimpleUser options
  const options: SimpleUserOptions = {
    aor,
    media: {
      constraints: {
        // This demo is making "video only" calls
        audio: true,
        video: true
      },
      local: {
        video: videoLocalElement
      },
      remote: {
        video: videoRemoteElement
      }
    },
    userAgentOptions: {
      // logLevel: "debug",
      displayName:displayName,
      authorizationPassword:authorizationPassword,
      authorizationUsername:authorizationUsername,
      sessionDescriptionHandlerFactoryOptions: {
        peerConnectionOptions: {
          rtcConfiguration : {
              iceServers: [{
                urls: "stun:stun.xten.com"
              }, {
                urls: "turn:numb.viagenie.ca",
                username: "webrtc@live.com",
                credential: "muazkh"
              }]
            },
        },
      },
    }
  };

  // Create SimpleUser
  const user = new SimpleUser(webSocketServer, options);
  
  // SimpleUser delegate
  const delegate: SimpleUserDelegate = {
    onCallAnswered: makeCallAnsweredCallback(user, holdCheckbox, muteCheckbox),
    onCallCreated: makeCallCreatedCallback(user, beginButton, endButton, holdCheckbox, muteCheckbox),
    onCallReceived: makeCallReceivedCallback(user),
    onCallHangup: makeCallHangupCallback(user, beginButton, endButton, holdCheckbox, muteCheckbox),
    onCallHold: makeCallHoldCallback(user, holdCheckbox),
    onRegistered: makeRegisteredCallback(user,beginButton),
    onUnregistered: makeUnregisteredCallback(user),
    onServerConnect: makeServerConnectCallback(user,  beginButton),
    onServerDisconnect: makeServerDisconnectCallback(user, beginButton)
  };
  user.delegate = delegate;

   // Setup begin button click listeners
  beginButton.addEventListener("click", makeBeginButtonClickListener(user, targetAOR, targetName));

  // Setup end button click listeners
  endButton.addEventListener("click", makeEndButtonClickListener(user));
  

  // Setup hold change listeners
  holdCheckbox.addEventListener("change", makeHoldCheckboxClickListener(user, holdCheckbox));

  // Setup mute change listeners
  muteCheckbox.addEventListener("change", makeMuteCheckboxClickListener(user, muteCheckbox));



  return user;
}


// Helper function to create call anaswered callback
function makeCallAnsweredCallback(
  user: SimpleUser,
  holdCheckbox: HTMLInputElement,
  muteCheckbox: HTMLInputElement
): () => void {
  return () => {
    console.log(`[${user.id}] call answered`);
    holdCheckboxDisabled(false, holdCheckbox);
    muteCheckboxDisabled(false, muteCheckbox);
    remoteUnmute();
  };
}

 
// Helper function to create call received callback
function makeCallReceivedCallback(user: SimpleUser): () => void {
  return () => {
    console.log(`[${user.id}] call received`);
    answerAlice.disabled = false;
    endAlice.disabled = true;
  };
}

// Helper function to create call created callback
function makeCallCreatedCallback(
  user: SimpleUser,
  beginButton: HTMLButtonElement,
  endButton: HTMLButtonElement,
  holdCheckbox: HTMLInputElement,
  muteCheckbox: HTMLInputElement
): () => void {
  return () => {
    console.log(`[${user.id}] call created`);
    beginButton.disabled = true;
    endButton.disabled = false;
    holdCheckboxDisabled(true, holdCheckbox);
    muteCheckboxDisabled(true, muteCheckbox);
  };
}

// Helper function to create call hangup callback
function makeCallHangupCallback(
  user: SimpleUser,
  beginButton: HTMLButtonElement,
  endButton: HTMLButtonElement,
  holdCheckbox: HTMLInputElement,
  muteCheckbox: HTMLInputElement
): () => void {
  return () => {
    console.log(`[${user.id}] call hangup`);
    beginButton.disabled = !user.isConnected();
    endButton.disabled = true;
    holdCheckboxDisabled(true, holdCheckbox);
    muteCheckboxDisabled(true, muteCheckbox);
    
    window.location.href = "https://ditstekdemo.com/virtare/sip/thanks.html";
  };
}

// Helper function to create call anaswered callback
function makeCallHoldCallback(user: SimpleUser, holdCheckbox: HTMLInputElement): (held: boolean) => void {
  return (held: boolean) => {
    console.log(`[${user.id}] call hold ${held}`);
    holdCheckbox.checked = held;
  };
}

// Helper function to create registered callback
function makeRegisteredCallback(
  user: SimpleUser,
  beginButton: HTMLButtonElement
): () => void {
  return () => {
    if(getParameters('initl')=='1'){
              beginAlice.click();
            }
    console.log(`[${user.id}] registered`);
  };
}

// Helper function to create unregistered callback
function makeUnregisteredCallback(
  user: SimpleUser
): () => void {
  return () => {
    console.log(`[${user.id}] unregistered`);
    
  };
}

// Helper function to create network connect callback
function makeServerConnectCallback(
  user: SimpleUser,
  
  beginButton: HTMLButtonElement
): () => void {
  return () => {
    console.log(`[${user.id}] connected`);
   
    beginButton.disabled = false;
  };
}

// Helper function to create network disconnect callback
function makeServerDisconnectCallback(
  user: SimpleUser,
  
  beginButton: HTMLButtonElement
): () => void {
  return (error?: Error) => {
    console.log(`[${user.id}] disconnected`);
   
    beginButton.disabled = true;
    if (error) {
     // alert(`[${user.id}] Server disconnected.\n` + error.message);
    }
  };
}

// Helper function to setup click handler for connect button
function makeConnectButtonClickListener(
  user: SimpleUser,
  connectButton: HTMLButtonElement,
  disconnectButton: HTMLButtonElement,
  registerButton: HTMLButtonElement,
  beginButton: HTMLButtonElement
): () => void {
  return () => {
    user
      .connect()
      .then(() => {
        connectButton.disabled = true;
        disconnectButton.disabled = false;
        registerButton.disabled = false;
        beginButton.disabled = false;
      })
      .catch((error: Error) => {
        console.error(`[${user.id}] failed to connect`);
        console.error(error);
        alert(`[${user.id}] Failed to connect.\n` + error);
      });
  };
}

// Helper function to setup click handler for disconnect button
function makeDisconnectButtonClickListener(
  user: SimpleUser,
  connectButton: HTMLButtonElement,
  disconnectButton: HTMLButtonElement,
  registerButton: HTMLButtonElement,
  beginButton: HTMLButtonElement
): () => void {
  return () => {
    user
      .disconnect()
      .then(() => {
        connectButton.disabled = false;
        disconnectButton.disabled = true;
        registerButton.disabled = true;
        beginButton.disabled = true;
      })
      .catch((error: Error) => {
        console.error(`[${user.id}] failed to disconnect`);
        console.error(error);
        //alert(`[${user.id}] Failed to disconnect.\n` + error);
      });
  };
}

// Helper function to setup click handler for register button
function makeRegisterButtonClickListener(user: SimpleUser){
  
    user
      .register(undefined, {
        // An example of how to get access to a SIP response message for custom handling
        requestDelegate: {
          onReject: (response) => {
            console.warn(`[${user.id}] REGISTER rejected`);
            let message = `Registration of "${user.id}" rejected.\n`;
            message += `Reason: ${response.message.reasonPhrase}\n`;
            //alert(message);
            
            
          }
        }
      })
      .then(() => {
        if(getParameters('initl')=='1'){
              beginAlice.click();
            }
      })
      .catch((error: Error) => {
        console.error(`[${user.id}] failed to register`);
        console.error(error);
        //alert(`[${user.id}] Failed to register.\n` + error);
      });
      return "";

}

// Helper function to setup click handler for unregister button
function makeUnregisterButtonClickListener(user: SimpleUser, unregisterButton: HTMLButtonElement): () => void {
  return () => {
    user
      .unregister()
      .then(() => {
        unregisterButton.disabled = true;
      })
      .catch((error: Error) => {
        console.error(`[${user.id}] failed to unregister`);
        console.error(error);
        alert(`[${user.id}] Failed to unregister.\n` + error);
      });
  };
}

// Helper function to setup click handler for begin button
function makeBeginButtonClickListener(user: SimpleUser, target: string, targetDisplay: string): () => void {
  return () => {
    user
      .call(target, undefined, {
        // An example of how to get access to a SIP response message for custom handling
        requestDelegate: {
          onReject: (response) => {
            console.warn(`[${user.id}] INVITE rejected`);
            let message = `Session invitation to "${targetDisplay}" rejected.\n`;
            message += `Reason: ${response.message.reasonPhrase}\n`;
            message += `Perhaps "${targetDisplay}" is not connected or registered?\n`;
            message += `Or perhaps "${targetDisplay}" did not grant access to video?\n`;
            //alert(message);
          }
        },
        withoutSdp: false
      })
      .catch((error: Error) => {
        console.error(`[${user.id}] failed to begin session`);
        console.error(error);
        alert(`[${user.id}] Failed to begin session.\n` + error);
      });
  };
}

// Helper function to setup click handler for begin button
function makeEndButtonClickListener(user: SimpleUser): () => void {
  return () => {
    user.hangup().then(()=>{
      window.location.href = "https://ditstekdemo.com/virtare/sip/thanks.html";
    }).catch((error: Error) => {
      console.error(`[${user.id}] failed to end session`);
      console.error(error);
      alert(`[${user.id}] Failed to end session.\n` + error);

    });
  };
}

// Helper function to setup click handler for hold checkbox
function makeHoldCheckboxClickListener(user: SimpleUser, holdCheckbox: HTMLInputElement): () => void {
  return () => {
    if (holdCheckbox.checked) {
      // Checkbox is checked..
      user.hold().catch((error: Error) => {
        holdCheckbox.checked = false;
        console.error(`[${user.id}] failed to hold call`);
        console.error(error);
        alert("Failed to hold call.\n" + error);
      });
    } else {
      // Checkbox is not checked..
      user.unhold().catch((error: Error) => {
        holdCheckbox.checked = true;
        console.error(`[${user.id}] failed to unhold call`);
        console.error(error);
        alert("Failed to unhold call.\n" + error);
      });
    }
  };
}

// Hold helper function
const holdCheckboxDisabled = (disabled: boolean, holdCheckbox: HTMLInputElement): void => {
  holdCheckbox.checked = false;
  holdCheckbox.disabled = disabled;
};

// Helper function to setup click handler for mute checkbox
function makeMuteCheckboxClickListener(user: SimpleUser, muteCheckbox: HTMLInputElement): () => void {
  return () => {
    if (muteCheckbox.checked) {
      // Checkbox is checked..
      user.mute();
      if (user.isMuted() === false) {
        muteCheckbox.checked = false;
        console.error(`[${user.id}] failed to mute call`);
        alert("Failed to mute call.\n");
      }
    } else {
      // Checkbox is not checked..
      user.unmute();
      if (user.isMuted() === true) {
        muteCheckbox.checked = true;
        console.error(`[${user.id}] failed to unmute call`);
        alert("Failed to unmute call.\n");
      }
    }
  };
}

// Mute helper function
const muteCheckboxDisabled = (disabled: boolean, muteCheckbox: HTMLInputElement): void => {
  muteCheckbox.checked = false;
  muteCheckbox.disabled = disabled;
};
window.addEventListener('load', (event) => {
   alice
      .connect()
      .then(() => {        
        beginAlice.disabled = false;
        makeRegisterButtonClickListener(alice);
      })
      .catch((error: Error) => {
        console.error(`[${alice.id}] failed to connect`);
        console.error(error);
        alert(`[${alice.id}] Failed to connect.\n` + error);
      });
      
});
function getParameters(search: string) {
  let urlString = window.location.search;
  let queryString = new URLSearchParams(urlString);
  let value = queryString.get(search);
  if(value === null){
    return "";
  }else{

    return value;
  }
}
function remoteUnmute() {
  console.log("hello");
   setTimeout(function (){
        videoRemoteAlice.muted = false;
         }, 10000);
}
 answerAlice.addEventListener("click", answerCall(alice));
function answerCall(user: SimpleUser): () => void{

  return () => { 

          answerAlice.disabled = true;
          endAlice.disabled = false;
    user.answer().then(()=>{
          answerAlice.disabled = true;
          endAlice.disabled = false;
         remoteUnmute();
    }).catch((error: Error) => {
      console.error(`[${user.id}] failed to answer call`);
      console.error(error);
      alert(`[${user.id}] Failed to answer call.\n` + error);
    });
  };
  
}