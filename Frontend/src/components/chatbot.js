import React, { useState } from 'react'
import ChatBot from 'react-simple-chatbot'
import Botpic from '../assets/slice.png'
import { ThemeProvider } from 'styled-components'
import '../App.css'
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#4a148c',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#4a148c',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

// all available config props
const config = {
  width: '300px',
  height: '400px',
  hideUserAvatar: false,
  placeholder: 'Type your response.',
  headerTitle: 'Slice',
  floating: true,
  botAvatar: Botpic,
  speechSynthesis: true,
  recognitionEnable: true
}

const Chatbot = (props) => {
  let [showChat, setShowChat] = useState(false)

  const startChat = () => {
    setShowChat(true)
  }
  const hideChat = () => {
    setShowChat(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: showChat ? 'none' : '' }}>
        <ChatBot
          speechSynthesis={{ enable: true, lang: 'en-US' }}
          recognitionEnable={true}
          steps={[
            {
              id: 'welcome',
              message: 'Hello! I am Slice,looking forward to assist you',
              trigger: 'q-firstname',
            },
            /* Paste */
            {
              id: 'q-firstname',
              message: 'What name do you go by?',
              trigger: 'firstname',
            },
            {
              id: 'firstname',
              user: true,
              validator: (value) => {
                if (/^[A-Za-z]+$/.test(value)) {
                  return true
                } else {
                  return 'Please enter you name X Æ A-12'
                }
              },
              trigger: 'stooler',
            },
            {
              id: 'stooler',
              message:
                'Hi,{previousValue} I am Bot! What can I do for you?',
              trigger: 'qtype',
            },
            {
              id: 'qtype',
              options: [
                { value: 1, label: 'What is Slice?', trigger: '1' },
                { value: 2, label: 'Why to join Slice?', trigger: '2' },
                { value: 3, label: 'How to join a group?', trigger: '3' },
                { value: 4, label: 'How to add more productivity?', trigger: '4' },
              ],
            },
            {
              id: '3',
              message:
                'You can ask your join slice chat rooms by sharing room invitation code and share your progress report with them',
              trigger: 'qtype',
            },
            {
              id: '4',
              message:
                "Do Your Heavy Lifting When You're at Your Best  . Stop Multitasking.  Prepare a To-Do List Each Night. Cut Down Your To-Do List. Delegate Properly. Eliminate Distractions.Plan Phone Calls. Break up Work Periods With Exercise.",
              trigger: 'qtype',
            },
            {
              id: '2',
              message:
                'Focus on writing code and building products while Slice break down your habits and recommend efficient habits',
              trigger: 'qtype',
            },
            {
                id: '1',
                message:
                  'A VS Code extension to track, understand and improve your development experience by directly understanding your development habits.',
                trigger: 'qtype',
            },
            {
              id: 'q-submit',
              message: 'Do you have any other questions !?',
              trigger: 'submit',
            },
            {
              id: 'submit',
              options: [
                { value: 'y', label: 'Yes', trigger: 'no-submit' },
              ],
            },
            {
              id: 'no-submit',
              options: [
                { value: 1, label: 'What is Slice?', trigger: '1' },
                { value: 2, label: 'Why to join Slice?', trigger: '2' },
                { value: 3, label: 'How to join a group?', trigger: '3' },
                { value: 4, label: 'How to add more productivity?', trigger: '4' },
              ],
            },
          ]}
          {...config}
        />
      </div>
      <div>
        {!showChat ? (
          <button className="btn" onClick={() => startChat()}>
            <i className="fa fa-minus"></i>
          </button>
        ) : (
          <button className="btn" onClick={() => hideChat()}>
            <i className="fa fa-plus"></i>
          </button>
        )}
      </div>
    </ThemeProvider>
  )
}

export default Chatbot;