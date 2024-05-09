export const shareKakao = (route, title, THU, content, page) => { // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
      }

      
      console.log("THU: " + THU)
      console.log("title: " + title)
      console.log("route: " + route)
      console.log("content: " + content)
      
      kakao.Share.sendCustom({
        templateId: 107108,
        templateArgs: {
            url: route,
            page: page,
            title: title,
            content: content,
            imageUrl: THU

        }
    });
      
    }
  };