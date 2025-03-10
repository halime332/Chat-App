import { auth } from "../firebase";




const Message = ({data}) => {
//eğer mesajı oturumu açık olankullanıcı attıysa:sağ
if(auth.currentUser.uid===data.author.id){
    return <p className="msg-user">{data.text}</p>;
}



//eğer mesajı farklı bir kullanıcı attıysa :sol
    return (

        <div className="msg-other">
        
              <img src={data.author.photo} />

              <div>
                 <span>{data.author.name}</span>
          
                 <p className="msg-text">{data.text}</p>
              </div>
        </div>

    
    );
};

export default Message;