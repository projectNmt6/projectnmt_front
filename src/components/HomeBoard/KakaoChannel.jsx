import React, { useEffect } from 'react';

function KakaoChannel(props) {
    useEffect(()=>{
        const script = document.createElement('script');
        script.async = true;
        try{
          if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
              kakao.init(process.env.REACT_APP_KAKAO);
            }
          }
    
        window.Kakao.Channel.createChatButton({
          container: '#kakao-talk-channel-chat-button',
          channelPublicId: '_TiuMG',
          title: 'consult',
          size: 'small',
          color: 'yellow',
          shape: 'pc',
          supportMultipleDensities: true,
        });
        document.body.appendChild(script);
        document.body.removeChild(script);
      } catch (err){}
      }, [])
    return (
        <div>
            <div id="kakao-talk-channel-chat-button"></div>
        </div>
    );
}

export default KakaoChannel;