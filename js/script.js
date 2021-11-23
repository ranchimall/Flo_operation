//sendtx
document.getElementById("sendtx").addEventListener('click',()=>{
    let receiverAddr=document.getElementById("rfloi").value;
    let senderAddr=document.getElementById("sfloi").value;
    let PrivKey=document.getElementById("sprivi").value;
    let sendAmt=parseFloat (document.getElementById("floc").value);
    let floData=document.getElementById("datai").value;
    floBlockchainAPI.sendTx(senderAddr, receiverAddr, sendAmt, PrivKey, floData = '').then(
        function (value) {
            if(floCrypto.validateAddr(recieverAddr)&& floCrypto.validateAddr(senderAddr)){
                document.getElementById("sendtxotp").innerHTML="Transaction Failed!! This might be the problem,<br>Invalid FLO Id";

            }

                    let tid=value;
                    document.getElementById("sendtxotp").innerHTML="Transaction Successful!!"+"<br>"+"Transaction ID: "
                    var id1=document.querySelector("#sendtxotp");
                    var newdiv= document.createElement('sm-copy')
                    newdiv.value=tid;
                    id1.appendChild(newdiv);  
                    },
                    function (error) {
                        document.getElementById("sendtxotp").innerHTML="Transaction Failed!! This might be the problem, "+error;
                    }
                    );
});
//readtx
document.getElementById("readtx"). addEventListener('click',()=>{
    let addr=document.getElementById("floidd").value;
    let from=document.getElementById("fromi").value;
    let to= document.getElementById("endi").value;
    if(floCrypto.validateAddr(addr)){
    floBlockchainAPI.readTxs(addr,from,to).then(
        function (value) {
            if(value.totalItems>0){
            let len=to-from;
           // document.getElementById("readtxotp1").innerHtml="The Transaction ID from: "+from+" to: "+to+",<br>";
            document.getElementById("readtxotp").innerHTML="The Transaction ID from "+from+" to "+to+" is listed below,"+"<br><br>";
            for(let i=0;i<=len;i++)
            {
                var id1=document.querySelector("#readtxotp");
                var newdiv= document.createElement('sm-copy')
                newdiv.value=value.items[i].txid;
                id1.appendChild(newdiv);
            }}
            else{
                document.getElementById("readtxotp").innerHTML='There are no Transactions for FLO ID  "'+addr+'"';
            }  
                    },
                    function (error) {
                        document.getElementById("readtxotp").innerHTML="Failed to fetch Transaction details!! This might be the problem, "+error;
                    }
                    );  }
                    else{
                        document.getElementById("readtxotp").innerHTML="Failed to fetch Transaction details!! This might be the problem, <br>Invalid FLO ID...";

                    }
})
//readalltxs
document.getElementById("readtxall").addEventListener('click',()=> {
    let addr=document.getElementById("flo").value;
    if(floCrypto.validateAddr(addr)){
    floBlockchainAPI.readTxs(addr).then(
        function (value) {
            if(value.totalItems>0){
            document.getElementById("readalltxotp").innerHTML="The transaction details are,<br>"
            for(let i=0;i<=value.to;i++)
            {
                let outputreadalltx=value;
                var id1=document.querySelector("#readalltxotp");
                    var newdiv= document.createElement('sm-copy')
                    newdiv.value=outputreadalltx.items[i].txid;
                    id1.appendChild(newdiv);
                    }}
                    else{
                        document.getElementById("readalltxotp").innerHTML='There are no Transactions for FLO ID "'+addr+'"';
                    }
                },
                    function (error) {
                        document.getElementById("readalltxotp").innerHTML="Failed to fetch Transaction details!! This might be the reason, "+error;
                    }
                    );  }
                    else{
                        document.getElementById("readalltxotp").innerHTML="Failed to fetch Transaction details!! This might be the reason, <br>Invalid FLO ID";
                    }
});
//mergeutxo
document.getElementById("mergeutxo").addEventListener('click',()=>{
    let floID=document.getElementById("mflom").value;
    let privKey=document.getElementById("privkm").value;
    let floData=document.getElementById("datam").value;
    if(floCrypto.validateAddr(floID)){
    floBlockchainAPI.mergeUTXOs(floID,privKey, floData = '').then(
        function (value) {
            var id1=document.querySelector("#mergeotp");
            var newdiv= document.createElement('sm-copy')
            document.getElementById("mergeotp").innerHTML="Merge Successful!!<br>Transaction ID: ";
            newdiv.value=value;
            id1.appendChild(newdiv); 
                    },
                    function (error) {
                        document.getElementById("mergeotp").innerHTML="Merge Unsuccessful!! This might be the problem, "+error;
                    }
                    );       }
                    else{
                        document.getElementById("mergeotp").innerHTML="Merge Unsuccessful!! This might be the problem, <br>Invalid FLO ID";   
                    }
});

//sentx multiple

//for sender priv key
let aa=new Array();
document.getElementById("add1").addEventListener('click',()=>{
    aa.push(document.getElementById("rflo").value);
    document.getElementById("rflo").value="";    
})
document.getElementById("clear1").addEventListener('click',()=>{
var r= confirm("Do you really want to clear the array?");
{
    if(r==true){
        aa.length=0;
        document.getElementById("rflo").value="";
        document.getElementById("sendtxmultotp").innerHTML="";
    }
 }
})
let obj={}
//for reciever floid and amnt
document.getElementById("add2").addEventListener('click',()=>{
    if(floCrypto.validateAddr(document.getElementById("sflo").value)){
        if(document.getElementById("ramt").value=="" || parseFloat( document.getElementById("ramt").value)==0 ){
            document.getElementById("eralert").innerHTML="Couldn't complete action ,This might be the problem,<br>Amount cannot be 0";
            return;
        }
let key1=document.getElementById("sflo").value;
let value3=parseFloat(document.getElementById("ramt").value);
obj[key1]=value3;
document.getElementById("sflo").value="";
document.getElementById("ramt").value="";
document.getElementById("eralert").innerHTML="";
}
else{
    document.getElementById("eralert").innerHTML="Couldn't complete action ,This might be the problem,<br>Invalid FLO ID";
}
})
document.getElementById("clear2").addEventListener('click',()=>{
    var r=confirm("Do you really want to clear the array?");
    if(r==true)
    {   
        document.getElementById("sflo").value="";
        document.getElementById("ramt").value="";
        document.getElementById("sendtxmultotp").innerHTML="";
        document.getElementById("eralert").innerHTML="";
    }
})
document.getElementById("sendtxmulti").addEventListener('click',()=>{
    let data=document.getElementById("data").value;
    document.getElementById("eralert").innerHTML="";
    floBlockchainAPI.sendTxMultiple(aa, obj, data = '').then(
function (value) {
 
var id1=document.querySelector("#sendtxmultotp");
var newdiv= document.createElement('sm-copy')
document.getElementById("sendtxmultotp").innerHTML="Transaction Successful!!<br>Transaction ID: ";
newdiv.value=value;
id1.appendChild(newdiv);  
},
function (error) {
   // alert(Object.getOwnPropertyNames(error));
    document.getElementById("sendtxmultotp").innerHTML="Transaction Failed!!";
}
);  
})
//writedata
document.getElementById("writedata").addEventListener('click',()=>{
    let senderAddr=document.getElementById("sfloid").value;
let Data=document.getElementById("datawrite").value;
let Privkey = document.getElementById("privwrite").value;
let receiverAddr= document.getElementById("rflowrite").value;
floBlockchainAPI.writeData(senderAddr, Data, Privkey, receiverAddr = floGlobals.adminID).then(
function (value) {
    for(i=0;i<=value.length;i++){
        
var id1=document.querySelector("#writedataotp");
var newdiv= document.createElement('sm-copy')
document.getElementById("writedataotp").innerHTML="Successful!!<br>Transaction ID: ";
newdiv.value=value;
id1.appendChild(newdiv); 
    }
    //alert(value[i]);
//alert("successful");    
},
function (error) {
    document.getElementById("writedataotp").innerHTML="Not able to complete the action!!<br>This might be the problem, "+error;
}
);
})

//writedata multiple
let sprivkey=new Array();
let rfloid= new Array();

//for sender priv key
document.getElementById("wdmpush1").addEventListener('click',()=>{
    let senderPrivKeys=document.getElementById("priv1").value;
    sprivkey.push(senderPrivKeys);  
    document.getElementById("priv1").value="";
})
document.getElementById('wdmclear1').addEventListener('click',()=>{
    let r1=confirm("Do you really want to clear the array?");
    if(r1==true)
    {
        sprivkey.length=0;
        document.getElementById("writedatamultiotp").innerHTML="";
        document.getElementById("priv1").value="";
    }
})
//for reciever flo id
document.getElementById("wdmpush2").addEventListener("click",()=>{
   if( floCrypto.validateAddr(document.getElementById("recflo").value)){
    let receivers=document.getElementById("recflo").value;
    rfloid.push(receivers);
    document.getElementById("recflo").value="";
    document.getElementById("errwrite11").innerHTML="";
   }
   else{
    document.getElementById("errwrite11").innerHTML="Couldn't complete action , This might be the problem,<br>Invalid FLO ID";
   }
})
document.getElementById('wdmclear2').addEventListener('click',()=>{
    let r1=confirm("Do you really want to clear the array?");
    if(r1==true)
    {
        rfloid.length=0;
        document.getElementById("writedatamultiotp").innerHTML="";
        document.getElementById("recflo").value="";
        document.getElementById("errwrite11").innerHTML="";
    }
});
    document.getElementById("writedatamultiple").addEventListener('click',()=>{
        if(sprivkey.length!=0){
            if(rfloid.length==0){
                document.getElementById("writedatamultiotp").innerHTML="Not able to complete the action!!<br>This might be the problem,<br>Invalid FLO ID";
                return;
            }
    let data=document.getElementById("data1").value;
    let preserveRatio=document.getElementById("pratio").value;
    floBlockchainAPI.writeDataMultiple(sprivkey, data, rfloid = [floGlobals.adminID], preserveRatio = true).then(
    function (value) {
        var id1=document.querySelector("#writedatamultiotp");
        var newdiv= document.createElement('sm-copy')
        document.getElementById("writedatamultiotp").innerHTML="Successful!!<br>Transaction ID: ";
        newdiv.value=value;
        id1.appendChild(newdiv); 
    },
    function (error) {
        document.getElementById("writedatamultiotp").innerHTML="Not able to complete the action!!<br>This might be the problem,"+ error.problem;
    }
    );}
    else{
        document.getElementById("writedatamultiotp").innerHTML="Not able to complete the action!!<br>This might be the problem,<br>No sender private key entered!!";
    }
    })

//get balance
document.getElementById("getbalance").addEventListener('click',()=>{
    if(floCrypto.validateAddr(document.getElementById("floidbal").value)){
    let id=document.getElementById("floidbal").value;
floBlockchainAPI.getBalance(id).then(
    function (value) {
    var id1=document.querySelector("#getbalanceotp");
    var newdiv= document.createElement('sm-copy')
    document.getElementById("getbalanceotp").innerHTML="Your Balance is: ";
    newdiv.value=value;
    id1.appendChild(newdiv); 
},
function (error) {
document.getElementById("getbalanceotp").innerHTML="Not able to fetch the Balance!!<br>This might be the problem, "+error;
}
);}
else{
    document.getElementById("getbalanceotp").innerHTML="Not able to fetch the Balance!!<br>This might be the problem, <br>Invalid FLO ID!!";
}
})

//read data
let z={};
document.getElementById("readdata").addEventListener("click",()=>{
    if(floCrypto.validateAddr(document.getElementById("readflo").value)){
    let readflo1=document.getElementById("readflo").value;
    z.limit=(document.getElementById("readlim").value);
    z.ignoreOld=(document.getElementById("readold").value);
    z.sentOnly=(document.getElementById("readsentonly").value);
    z.pattern=(document.getElementById("readpattern").value);
    z.filter=(document.getElementById("readfilter").value);
        let flag=0;
    floBlockchainAPI.readData(readflo1, z = {}).then(
        function (value) {
            document.getElementById("readdataotp").innerHTML='<br>Total transactions of "'+readflo1+'" : "'+value.totalTxs+'"<br><br>';
            document.getElementById("readdataotp1").innerHTML="Messages :<br>";
            for(let i=0;i<value.data.length;i++){
                var id1=document.querySelector("#readdataotp1");
                if(value.data[i]!=""){
                    var newdiv= document.createElement('sm-copy')
                    newdiv.value=value.data[i];
                    id1.appendChild(newdiv);
                     flag=1;
                }
            }
            if(flag==0){
                document.getElementById("readdataotp1").innerHTML="There are no messages for FLO ID '"+readflo1+"'!!"
            }
        },
        function (error) {
            document.getElementById("readdataotp").innerHTML="<br>Transaction Failed!! This might be the problem, "+error;
            document.getElementById("readdataotp1").innerHTML="";
        }
    )}
    else{
        document.getElementById("readdataotp").innerHTML="Transaction Failed!! This might be the problem, <br>Invalid FLO ID!!";
        document.getElementById("readdataotp1").innerHTML="";
    }

});

//popup


function pp(id)
{
  const mypop=document.getElementById(id);
  mypop.show();
}

//sendtx constructing
document.getElementById("sendtx").addEventListener('click',()=>{
    document.getElementById("al1").innerHTML="<br>Constructing Send Tx : floBlockchainAPI.sendTx("+document.getElementById("sfloi").value+","+ document.getElementById("rfloi").value+","+ parseFloat (document.getElementById("floc").value)+","+ document.getElementById("sprivi").value+","+ document.getElementById("datai").value+")";
     settime("al1");
})
//sendtx multiple constructing
document.getElementById("sendtxmulti").addEventListener('click',()=>{
    document.getElementById("al2").innerHTML="<br>Constructing Send Tx Multiple : floBlockchainAPI.sendTxMultiple(senderPrivKeys["+aa.length+"],"+ obj+ ","+document.getElementById("data").value+")";
    settime("al2");
})
//mergeutxo
document.getElementById("mergeutxo").addEventListener('click',()=>{
    document.getElementById("al3").innerHTML="<br>Constructing Merge UTXOs : floBlockchainAPI.mergeUTXOs("+document.getElementById("mflom").value+","+document.getElementById("privkm").value+","+ document.getElementById("datam").value+")";
    settime("al3");
})
//read tx
document.getElementById("readtx").addEventListener('click',()=>{
    document.getElementById("al4").innerHTML="<br>Constructing Read Tx : floBlockchainAPI.readTxs("+document.getElementById("floidd").value+","+ document.getElementById("fromi").value+","+ document.getElementById("endi").value+")";
    settime("al4");
})
//readtxall
document.getElementById("readtxall").addEventListener('click',()=>{
    document.getElementById("al5").innerHTML="<br>Constructing Read all Tx : floBlockchainAPI.readTxs('"+document.getElementById("flo").value+"')";
    settime("al5");
})
//getbalance
document.getElementById("getbalance").addEventListener('click',()=>{
    document.getElementById("al6").innerHTML="<br>Constructing Get Balance : floBlockchainAPI.getBalance('"+document.getElementById("floidbal").value+"')";
    settime("al6");
})
//readdata
document.getElementById("readdata").addEventListener('click',()=>{
    document.getElementById("al7").innerHTML="<br>Constructing Read Data : floBlockchainAPI.readData("+document.getElementById("readflo").value+",{options"+"})";
    settime("al7");
})
//writedata
document.getElementById("writedata").addEventListener('click',()=>{
    document.getElementById("al8").innerHTML="<br>Constructing Write Data : floBlockchainAPI.writeData("+document.getElementById("sfloid").value+","+ document.getElementById("datawrite").value+","+ document.getElementById("privwrite").value+","+ document.getElementById("rflowrite").value+")<br>";
    settime("al8");
})
//write data multiple
document.getElementById("writedatamultiple").addEventListener('click',()=>{
    document.getElementById("al9").innerHTML="<br>Constructing Write Data Multiple : floBlockchainAPI.writeDataMultiple(senderPrivKeys["+sprivkey.length+"],"+ document.getElementById("data1").value+",receivers["+rfloid.length+"],"+ document.getElementById("pratio").value+")";
    settime("al9");
})
//set time constructor
function settime(id){
    setInterval(()=>{document.getElementById(id).innerHTML=""},20000)
}