import React, { Component } from "react";
import { Message, MessageContainer } from "./StartMessage.styled";

export class StartMessage extends Component {
  render() {
    return (
      <MessageContainer>
        <Message>Please enter any word</Message>
      </MessageContainer>
    );
  }
}

export default StartMessage;
