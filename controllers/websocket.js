/**
 * Created by RGB on 8/23/2016.
 */
//Connection Logic
//How to get session data?
function webSocketConnect(ws,req){
    var websocketContext={query:req.query,sessionID:req.sessionID};
    console.log("this is run")
    ws.on("message",function(message){
        webSocketMessage(ws,message,websocketContext);
    });
    ws.on("error",function(error){
        console.log("ERROR!")
        webSocketError(ws,error,websocketContext);
    });
    ws.on("close",function(){
        console.log("CLOSED!")
        webSocketClose(ws,websocketContext);
    });

}
//now we can focus on these two functions
function webSocketMessage(ws,message,context){
    sendWS(ws,"Your id is:"+context.sessionID+", and query is "+JSON.stringify(context.query))
}

function webSocketError(ws,error,context){

}
function webSocketClose(ws,context){

}
function sendWS(ws,message){
    try{
        ws.send(message);
    }catch(x){
        //console.log("seems ws closed connection!")
        ws.close();
    }
}
exports.webSocketConnect=webSocketConnect