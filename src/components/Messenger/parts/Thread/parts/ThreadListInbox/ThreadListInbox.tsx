import React, {Component} from 'react';
import {bindActionCreators, Dispatch} from "redux";
import {getThreads} from "../../../../../../redux/actions/thread";
import {connect} from "react-redux";
import ThreadUser from "./parts/ThreadUser/ThreadUser";
import {subscribeSearchableUser} from "../../../../../../redux/actions/socket";
import SearchedUser from "./parts/SearchedUser/SearchedUser";
import {ThreadListInboxProps} from "./models/ThreadListInbox";

class ThreadListInbox extends Component<ThreadListInboxProps> {
  componentDidMount(): void {
    this.props.subscribeSearchableUser();
    this.props.getThreads(this.props.user._id);
  }

  renderList = (): React.Component => {
    let list: any;
    if(this.props.isEmpty) {
      list = this.props.threads.map(thread => {
        const className = this.props.currentThread._id === thread._id ? 'active' : ''
        return <ThreadUser thread={thread} key={thread._id} className={className}/>
      })
    } else {
      list = this.props.searchableUsers.map(user => <SearchedUser searchedUser={user} key={user._id}/>)
    }
    return list
  }

  render() {
    return (
      <div>
        { this.renderList() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    threads: state.threadReducer.threads,
    searchableUsers: state.Socket.searchableUsers,
    isEmpty: state.Socket.isEmpty,
    currentThread: state.threadReducer.currentThread
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getThreads: bindActionCreators(getThreads, dispatch),
    subscribeSearchableUser: bindActionCreators(subscribeSearchableUser, dispatch),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ThreadListInbox);
