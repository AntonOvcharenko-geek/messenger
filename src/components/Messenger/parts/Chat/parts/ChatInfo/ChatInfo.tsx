import React, {Component} from 'react';
import './ChatInfo.scss'
import {connect} from "react-redux";
import {ChatInfoProps} from "./models/ChatInfo";
import ThreadList from "../../../Thread/parts/ThreadList/ThreadList";
import ThreadListInbox from "../../../Thread/parts/ThreadListInbox/ThreadListInbox";
import ThreadOut from "../../../Thread/parts/ThreadOut/ThreadOut";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faBars} from "@fortawesome/free-solid-svg-icons";
import Anime from "react-anime";
interface Modal {
  isOpen: boolean
}

class ChatInfo extends Component<ChatInfoProps,Modal> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  generateFullName = () => {
    let fullName: string;
    if(this.props.currentThread.users) {
      fullName = this.props.user._id === this.props.currentThread.users[0]._id ?
        `${this.props.currentThread.users[1].firstName} ${this.props.currentThread.users[1].lastName}`
        : `${this.props.currentThread.users[0].firstName} ${this.props.currentThread.users[0].lastName}`;
    } else {
      fullName = '';
    }
    return fullName
  };
  render() {
    return (
        <div>
          {this.state.isOpen && (
              <Anime translateX={[-500,1]} >
                <div className='thread-open'>
                  <ThreadList>
                    <FontAwesomeIcon icon={faTimes} className={'cancel'}
                       onClick={() => this.setState({isOpen:!this.state.isOpen})}
                    />
                  </ThreadList>
                  <div className='thread-user-message__list'>
                    <ThreadListInbox/>
                  </div>
                  <ThreadOut/>
                </div>
              </Anime>
          )}
          <div className={'chat-info'}>
            <FontAwesomeIcon icon={faBars}  className="burger"
               onClick={() => this.setState({isOpen:!this.state.isOpen})}
            />
        <span className={'user'}>{this.generateFullName()}</span>
      </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
 return {
   currentThread: state.threadReducer.currentThread,
   user: state.userReducer.user
 }
}

export default connect(mapStateToProps)(ChatInfo);
