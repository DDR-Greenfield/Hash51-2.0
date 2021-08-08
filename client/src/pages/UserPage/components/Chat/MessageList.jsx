import React from "react";
import Message from "./Message";

const MessageList = (props) => {
const list = props.msgs.map((msg, i) => {
    const {userId, message} = msg;
    return (<Message key={i} senderName={userId} text={message}/>);
});

return (<div>{list}</div>);
};

export default MessageList;
