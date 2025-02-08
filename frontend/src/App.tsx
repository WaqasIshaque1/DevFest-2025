import React, { useEffect, useState } from "react";
import "./App.css";
import { RetellWebClient } from "retell-client-js-sdk";

const agentId = "agent_eeff5ae4474a1efa744b224532";

interface RegisterCallResponse {
  access_token: string;
}

const retellWebClient = new RetellWebClient();

const App = () => {
  const [isCalling, setIsCalling] = useState(false);

  // Initialize the SDK
  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("call started");
    });
    
    retellWebClient.on("call_ended", () => {
      console.log("call ended");
      setIsCalling(false);
    });
    
    // When agent starts talking for the utterance
    // useful for animation
    retellWebClient.on("agent_start_talking", () => {
      console.log("agent_start_talking");
    });
    
    // When agent is done talking for the utterance
    // useful for animation
    retellWebClient.on("agent_stop_talking", () => {
      console.log("agent_stop_talking");
    });
    
    // Real time pcm audio bytes being played back, in format of Float32Array
    // only available when emitRawAudioSamples is true
    retellWebClient.on("audio", (audio) => {
      // console.log(audio);
    });
    
    // Update message such as transcript
    // You can get transcrit with update.transcript
    // Please note that transcript only contains last 5 sentences to avoid the payload being too large
    retellWebClient.on("update", (update) => {
      // console.log(update);
    });
    
    retellWebClient.on("metadata", (metadata) => {
      // console.log(metadata);
    });
    
    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      // Stop the call
      retellWebClient.stopCall();
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
    } else {
      const registerCallResponse = await registerCall(agentId);
      if (registerCallResponse.access_token) {
        retellWebClient
          .startCall({
            accessToken: registerCallResponse.access_token,
          })
          .catch(console.error);
        setIsCalling(true); 
      }
    }
  };

  async function registerCall(agentId: string): Promise<RegisterCallResponse> {
    try {
      const response = await fetch("http://localhost:8080/create-web-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data: RegisterCallResponse = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleConversation}>
          {isCalling ? "Stop call" : "Start call"}
        </button>
            <div className="bg">
            <div></div>
            <div></div>
        </div>
        <div className="header-text" aria-hidden="true">
            Introducing<br />
            <span className="glow-filter" data-text="Megatron">
              Megatron
            </span>
            {/* <br /> Highlight the main focus text.<br /> */}
        </div>
        {/* <svg className="filters" width="1440px" height="300px" viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <defs>
        <filter id="glow-4" colorInterpolationFilters="sRGB" x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur in="SourceGraphic" data-target-blur="4" stdDeviation="4" result="blur4"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="19" stdDeviation="19" result="blur19"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="9" stdDeviation="9" result="blur9"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="30" stdDeviation="30" result="blur30"/>
            <feColorMatrix in="blur4" result="color-0-blur" type="matrix" values="1 0 0 0 0
                      0 0.9803921568627451 0 0 0
                      0 0 0.9647058823529412 0 0
                      0 0 0 0.8 0"/>
            <feOffset in="color-0-blur" result="layer-0-offsetted" dx="0" dy="0" data-target-offset-y="0"/>
            <feColorMatrix in="blur19" result="color-1-blur" type="matrix" values="0.8156862745098039 0 0 0 0
                      0 0.49411764705882355 0 0 0
                      0 0 0.2627450980392157 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-1-blur" result="layer-1-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur9" result="color-2-blur" type="matrix" values="1 0 0 0 0
                      0 0.6666666666666666 0 0 0
                      0 0 0.36470588235294116 0 0
                      0 0 0 0.65 0"/>
            <feOffset in="color-2-blur" result="layer-2-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur30" result="color-3-blur" type="matrix" values="1 0 0 0 0
                      0 0.611764705882353 0 0 0
                      0 0 0.39215686274509803 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-3-blur" result="layer-3-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur30" result="color-4-blur" type="matrix" values="0.4549019607843137 0 0 0 0
                      0 0.16470588235294117 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-4-blur" result="layer-4-offsetted" dx="0" dy="16" data-target-offset-y="16"/>
            <feColorMatrix in="blur30" result="color-5-blur" type="matrix" values="0.4235294117647059 0 0 0 0
                      0 0.19607843137254902 0 0 0
                      0 0 0.11372549019607843 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-5-blur" result="layer-5-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feColorMatrix in="blur30" result="color-6-blur" type="matrix" values="0.21176470588235294 0 0 0 0
                      0 0.10980392156862745 0 0 0
                      0 0 0.07450980392156863 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-6-blur" result="layer-6-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feColorMatrix in="blur30" result="color-7-blur" type="matrix" values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.68 0"/>
            <feOffset in="color-7-blur" result="layer-7-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feMerge>
                <feMergeNode in="layer-0-offsetted"/>
                <feMergeNode in="layer-1-offsetted"/>
                <feMergeNode in="layer-2-offsetted"/>
                <feMergeNode in="layer-3-offsetted"/>
                <feMergeNode in="layer-4-offsetted"/>
                <feMergeNode in="layer-5-offsetted"/>
                <feMergeNode in="layer-6-offsetted"/>
                <feMergeNode in="layer-7-offsetted"/>
                <feMergeNode in="layer-0-offsetted"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
</svg> */}

      </header>
    </div>
  );
};

export default App;
