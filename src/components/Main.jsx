import { collection, onSnapshot,query,orderBy,where } from "firebase/firestore";
import { useRef, useEffect, useState } from "react";
import { db } from "../firebase";
import Message from "./Message";



const Main = ({room}) => {
   const [messages,setMessages] =useState([]);
   const lastMessage = useRef();

    //veri tabanından bu odada gönderilen mesajları alalım
    useEffect(() =>{
     //abone oluncak koleksiyonun referansını al
      const messagesCol = collection(db, "messages");

      //sorgu ayarlarını yap
     const q = query( messagesCol,where("room","==",room),orderBy("createdAt","asc"));

      //kolleksiyondaki anlık güncellemelere abone ol
      const unsub = onSnapshot(q,(data) =>{
        //mesajların geçici olarak tutulacağı dizi
        const temp=[];
        //docs dizisindeki herbir dökumannın  data metodu ile datasına erişip geçici diziye aktardık
      
        data.docs.forEach((doc)=>temp.push(doc.data()));
        //state'i güncelle
        setMessages(temp);
      });
      // kullanıcı bu sayfadan ayrılınca kolleksiyonu izlemeyi durdurur
       return () => unsub();
    },[]);

   //ilk odaya girildiğinde ve her mesaj atıldığında en aşağı kaydır
    useEffect(()=>{
      lastMessage.current.scrollIntoView();
    },[messages]);

  return (
    <main>
        {messages.length <1 ?
         (<div className="warn">
           <p>Sohbete ilk mesajı gönderiniz</p>
         </div>
         ) :(
         messages.map((i,key)=> <Message key={key} data={i}/>))}
         <div ref={lastMessage}/>
    </main>

  );
};

export default Main;