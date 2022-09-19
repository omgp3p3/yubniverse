import React, { useState } from 'react';
import { privateMessage } from './message';
import SelectDay from './SelectDay';
import './style.css';

const MessageList = ({ nickName, selectedMonth, setMonth }) => {
  const messages = Object.entries(privateMessage)[selectedMonth];
  const [month, monthMessage] = messages;

  // 날짜 선택
  const [dayVisible, setDayVisible] = useState(false);
  const dayList = monthMessage.map((msg) => {
    const day = msg['date'].split('.')[2];
    return day;
  });

  return (
    <div id="message-container">
      <Header
        setMonth={setMonth}
        dayVisible={dayVisible}
        setDayVisible={setDayVisible}
      />
      {dayVisible && (
        <SelectDay
          dayList={dayList}
          month={month}
          setDayVisible={setDayVisible}
        />
      )}
      <div id="message-wrap">
        <Message messageList={monthMessage} nickName={nickName} />
      </div>
      <InputField />
    </div>
  );
};

const Message = ({ messageList, nickName }) => {
  return (
    <div>
      {messageList.map((msg) => {
        const { date, messages } = msg;
        return (
          <ul id="messages" key={date}>
            <div className="message-date" id={date}>
              {date}
            </div>
            <RenderMessage
              messageList={messages}
              date={date}
              nickName={nickName}
            />
          </ul>
        );
      })}
    </div>
  );
};

const RenderMessage = ({ messageList, date, nickName }) => {
  return (
    <>
      {messageList.map((msg, index) => {
        let { time, content } = msg;

        while (content.includes('@@')) {
          content = content.replace('@@', nickName);
        }

        const flag = content.includes('message')
          ? 'image'
          : content.includes('videos')
          ? 'video'
          : 'message';

        return (
          <li key={`${date}-${index}`}>
            <Profile />
            <Content flag={flag} content={content} date={date} time={time} />
          </li>
        );
      })}
    </>
  );
};

const Profile = () => {
  return (
    <div className="profile">
      <img src={'images/profile.jpg'} alt="profile" className="profile-image" />
      <span className="name">유빈</span>
    </div>
  );
};

const Content = ({ flag, content, date, time }) => {
  return (
    <div className="artist-message">
      {flag === 'image' && (
        <a href={content + '.jpg'} target="_blank" rel="noopener noreferrer">
          <img src={content + '.jpg'} className="message-photo" alt="" />
        </a>
      )}
      {flag === 'video' && (
        <a href={content + '.mp4'} target="_blank" rel="noopener noreferrer">
          <img src={content + '.jpg'} className="message-photo" alt="" />
        </a>
      )}
      {flag === 'message' && <span className="content">{content}</span>}

      <span className="date">{date}</span>
      <span className="time">{time}</span>
    </div>
  );
};

const Header = ({ setMonth, dayVisible, setDayVisible }) => {
  return (
    <div id="title">
      <span
        className="arrow"
        onClick={() => {
          setMonth(null);
          setDayVisible(false);
        }}
      >
        <i className="fa-solid fa-angle-left"></i>
      </span>
      <a href="#">
        <span className="artist">유빈</span>
      </a>
      <span className="calendar" onClick={() => setDayVisible(!dayVisible)}>
        <i className="fa-regular fa-calendar"></i>
      </span>
    </div>
  );
};

const InputField = () => {
  return (
    <div id="input-field">
      <div className="user-message">
        유빈아 사랑해♡
        <button className="push-button">
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
};

export default MessageList;
