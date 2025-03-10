import { useState } from "react";
import { auth,db } from "../firebase";
import { addDoc,collection,serverTimestamp } from "firebase/firestore";
import EmojiPicker from "emoji-picker-react";
import Main from "../components/Main";


const ChatPage = ({room,setRoom}) => {
  const[text,setText]=useState("");

  const [isOpen, setIsOpen] =useState(false);

  //form gönderilince mesajı veritanbanına kaydet
  const handleSubmit= async(e) =>{
    e.preventDefault();
    //mesaj boş mu kontrol et
    if(text.trim()==="") return;

    
   //inputu temizle ve emoji pickeri kapat
   setText("");
   setIsOpen(false);

   //mesajların gönderileceği kolleksiyonun referansını al
   const messagesCol = collection(db,"messages");

   //referansı alınan kolleksiyona belge oluştur
   await addDoc(messagesCol,{
    text,
    room,
    author:{
      id:auth.currentUser.uid,
      name:auth.currentUser.displayName,
      photo:auth.currentUser.photoURL,
    },
    createdAt:serverTimestamp(),
   });

  };


  return (
    <div className="chat-page">
      <header>
       <p>{auth.currentUser.displayName}</p>
       <p>{room}</p>
       <button onClick={() =>setRoom(null)}>Farklı Oda</button>
      </header>

      <Main room={room}/>


      <form onSubmit={handleSubmit} className="message-form" >
        <input type="text" placeholder="mesajınızı yazınız" value={text} onChange={(e)=>setText(e.target.value)} />

         <div>
           <EmojiPicker onEmojiClick={(e)=>{
            setText(text + e.emoji);
           }} open={isOpen}/>

           <button className="emoji-btn" type="button" onClick={()=>setIsOpen(!isOpen)}>
            🤣
           </button>
          </div>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;