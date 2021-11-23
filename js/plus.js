
document.getElementById("genbtn").addEventListener('click',()=>{
  let flo =floCrypto.generateNewID()
  document.getElementById("private").innerHTML="Private key: "; 
  document.getElementById("pub").innerHTML="Public key: ";
  document.getElementById("flocrypto").innerHTML="FLO ID: ";
  var id=document.querySelector("#pub");
  var newdiv= document.createElement('sm-copy')
  newdiv.value=flo.pubKey;
  id.appendChild(newdiv);
  var id1=document.querySelector("#private");
  var newdiv= document.createElement('sm-copy')
  newdiv.value=flo.privKey;
  id1.appendChild(newdiv);
  var id2=document.querySelector("#flocrypto");
  var newdiv= document.createElement('sm-copy')
  newdiv.value=flo.floID;
  id2.appendChild(newdiv);
})

      function publickeyhex()
      {
        let privatekey = document.getElementById("idprivate").value;
        var pubkey=floCrypto.getPubKeyHex(privatekey)
        document.getElementById("publickeyhex").innerHTML="Public Key: ";
        var id=document.querySelector("#publickeyhex");
        var newdiv= document.createElement('sm-copy')
        newdiv.value=pubkey;
        id.appendChild(newdiv);
    
      }

      function calcfloid()
      {
        let keyy= document.getElementById("key").value;
        var floid =floCrypto.getFloID(keyy)
        document.getElementById("floo").innerHTML="FLO ID: ";
        var id=document.querySelector("#floo");
        var newdiv= document.createElement('sm-copy')
        newdiv.value=floid;
        id.appendChild(newdiv);
      }

      function verifyprivatekey()
      {
          let privatekey=document.getElementById("privatek").value;
          let pubKey_floID= document.getElementById("keey").value;
        var ver= Boolean (floCrypto.verifyPrivKey(privatekey, pubKey_floID))
           
            if(ver==true)
            {
                document.getElementById("verify").innerHTML="TRUE,   The private-key is verified for the given public-key or flo-ID."
            }
            else
            {
                document.getElementById("verify").innerHTML="FALSE,   The private-key is not verified for the given public-key or flo-ID. "
    
            }
    
      }

      function signdata()
      { 
         let data=document.getElementById("msg5").value;
         let privKey=document.getElementById("type5").value; 
         var signature =floCrypto.signData(data, privKey)
         document.getElementById("signed").innerHTML="Signed data is,";
         var id=document.querySelector("#signed");
         var newdiv= document.createElement('sm-copy')
         newdiv.value=signature;
         id.appendChild(newdiv);
      }

      function verification()
      {
          let data=document.getElementById("d").value;
          let sigg=document.getElementById("s").value;
          let val=document.getElementById("p").value;
          var r=(floCrypto.verifySign(data,sigg,val))
         if(r==true)
         {
             document.getElementById("v1").innerHTML="TRUE, Signature is verified!!";
         }
         else
         {
             document.getElementById("v1").innerHTML="FALSE, Signature is not verified!!";
         }
      }
     function validateflo()
      {
        let floid=document.getElementById("flo1").value;
          var res=Boolean(floCrypto.validateAddr(floid))
          if(res==true)
          {
          document.getElementById("write1").innerHTML="TRUE, FLO ID is validated.";
          }
          else
          {
              document.getElementById("write1").innerHTML="FALSE, FLO ID is not validated.";

          }
      }
      function genrandomint()
      {   
         let minval=document.getElementById("genrandom1").value;
         let maxval=document.getElementById("genrandom2").value;
          var result= floCrypto.randInt(minval, maxval)
           document.getElementById("write41").innerHTML="The random integer is : ";
         var id=document.querySelector("#write41");
        var newdiv= document.createElement('sm-copy')
        newdiv.value=result;
        id.appendChild(newdiv);
      }
      function genrandomstr()
      {
        let str=document.getElementById("randomstr").value;
        let val=document.getElementById("val3").value;
        var randstring= floCrypto.randString(str, val)
        document.getElementById("write7").innerHTML="Random string is: <br>"
        var id=document.querySelector("#write7");
        var newdiv= document.createElement('sm-copy')
        newdiv.value=randstring;
        id.appendChild(newdiv);
      }

      function createshare()
      {
        let data=document.getElementById("shdata").value;
        let numshare=parseInt( document.getElementById("shshare").value);
        let limit =parseInt( document.getElementById("shnumber").value);
        const x=[];
        const v=[];
        var i=0;  
       // x.push(floCrypto.createShamirsSecretShares(data,numshare,limit));
        const h=x.concat(floCrypto.createShamirsSecretShares(data,numshare,limit));
       document.getElementById("write2").innerHTML="The shares are,";
       //document.getElementById("write3").innerHTML=h;
       var id=document.querySelector("#write3");
       for(i=0;i<numshare;i++)
       {
          var newdiv= document.createElement('sm-copy')
          newdiv.value=h[i];
          id.appendChild(newdiv);
       }
      }  

      const y=[];
      function button()
      {
         
          y.push(document.getElementById("ar1").value);
          document.getElementById("ar1").value='';
        //  alert("pushed!!");
     //     for(var i=0;i<y.length;i++)
       //   alert(y[i]);
      }

      function retrievesecret()
      {
       let shresult= floCrypto.retrieveShamirSecret(y)
       if(shresult==false)
       {
        document.getElementById("write11").innerHTML="The data is not retrieved!!";
 
       }
       else
       document.getElementById("write11").innerHTML="The Original data is,"+"<br>"+shresult;
      }

      const m=[];
      function button1()
      {
        m.push(document.getElementById("ar9").value);
        document.getElementById("ar9").value='';

        //alert("pushed!!");
      }
      function verifysecret()
      {
          let c=document.getElementById("ar8").value
        var z1= Boolean( floCrypto.verifyShamirsSecret(m,c))
        if(z1==true)
        {
            document.getElementById("write21").innerHTML="TRUE,The shares are verified!!";
        }
        else
        {
            document.getElementById("write21").innerHTML="FALSE,The shares are not verified!!";

        }
      }

      function resetbtn()
      {
        var con= confirm("Do you really want to clear the array?");

            if(con==true)
         {
            y.length=0; 
            document.getElementById("write11").innerHTML="";     
            document.getElementById("ar1").value="";      
         }

      }
      function resetbtn1()
      {
          var con1= confirm("Do you really want to clear the array?");
          if(con1==true)
          {
              m.length=0;
              document.getElementById("write21").innerHTML="";   
              document.getElementById("ar9").value="";     
              document.getElementById("ar8").value="";      
 
        

          }
      }

      function crypto()
      {
        let s1=document.getElementById("t1").value;
        let s2=document.getElementById("t2").value;
        let s3=document.getElementById("t3").value;

        var ob=floCrypto.encryptData(s1,s2)
        var sender=ob.senderPublicKeyString;
        document.getElementById("w1").innerHTML="Encrypted Data: ";
        document.getElementById("w2").innerHTML="XPublic Key: ";
        document.getElementById("w3").innerHTML="YPublic Key: ";
        var id=document.querySelector("#w1");
        var newdiv= document.createElement('sm-copy')
        newdiv.value=ob.secret;
        id.appendChild(newdiv);  
        var id=document.querySelector("#w2");
        var newdiv= document.createElement('sm-copy')
        newdiv.value=sender.XValuePublicString;
        id.appendChild(newdiv); 
        var id=document.querySelector("#w3");
        var newdiv= document.createElement('sm-copy')
        newdiv.value=sender.YValuePublicString;
        id.appendChild(newdiv);           }


          function crypto1()
          {
            var a=document.getElementById("t6").value;//xvalue
            var b=document.getElementById("t7").value;//yvalue
            var c=document.getElementById("t8").value;//encrypted data
            var d=document.getElementById("t3").value;//privkey
            var q={XValuePublicString:a,
        YValuePublicString:b}
        var s={secret:c,
            senderPublicKeyString:q}
            var obs=floCrypto.decryptData(s,d)
            document.getElementById("q2").innerHTML="The decrypted data is,<br>";
            var id=document.querySelector("#q2");
            var newdiv= document.createElement('sm-copy')
            newdiv.value=obs;
            id.appendChild(newdiv);          
          }

          function ppp(id)
          {
            const mypop=document.getElementById(id);
            mypop.show();
          }
