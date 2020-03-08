import React, {Component} from 'react';
import './Message.scss'
import {MessageBody} from "../../../../../../../../models/MessageBody";
import {b64toBlob} from "../../../../../../../../service/utilities";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import moment from 'moment'

interface Props {
  name: string;
  type?: string;
  messageBody: MessageBody;
  createdAt: string;
}

class Message extends Component<Props> {

  createMessage = (messageBody: MessageBody) => {
    switch (messageBody.type) {
      case 'text':
        return (
          <p>{messageBody.body}</p>
        )
      case 'audio':
        let blob = b64toBlob(messageBody.body, 'audio/mp3')
        return (
          <AudioPlayer url={URL.createObjectURL(blob)}/>
        )
    }
  };

  render() {
    const renderedMessage = this.createMessage(this.props.messageBody);
    return (
      <div className={`message-wrapper ${this.props.type}`}>
        <div className={'message'}>
          <p className={'name'}>
            { this.props.name }
          </p>
          { renderedMessage }
          <p className={'time'}>{moment(this.props.createdAt).format('MMMM Do, h:mm a')}</p>
        </div>
      </div>
    );
  }
}

export default Message;
