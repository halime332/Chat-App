import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ChatPage from "./pages/ChatPage";



const App = () => {
  //kullanıcının yetkisi var mı state'i
  const [isAuth,setIsAuth] =useState(false);

  const [room,setRoom] =useState(null);

  useEffect(() =>{
    // kullanıcının oturum durumu her değiştiğinde güncel  bilgilerini getirir
    onAuthStateChanged(auth,(user)=>{
   setIsAuth(user ? true:false);
  });
  },[]);

  //yetgisi yoksa login page'i ekrana bas
  if(!isAuth) return <LoginPage />

  //yetgisi varsa oda seçme sayfasını ekrana bas
  return (
    <div className="container">
     {room ?( <ChatPage room={room} setRoom={setRoom}/>) :(<RoomPage setRoom={setRoom}/>)}
    </div>
  );
};

export default App;