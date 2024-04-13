import {useState, useEffect} from 'react'
import {UseSocket} from '../socketContext/socketContext'

function Home() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [receivedMsg, setReceivedMsg] = useState('')
  const [senderName, setSenderName] = useState('')
  const [message, setMSg] = useState('')
  const {socket} = UseSocket()

  const handleJoiningRoom = () => {
    socket.emit('join-room', {email, name}) // Emit 'join-room' event with data
    socket.on('isJoined', ack => {
      // Corrected to 'email' from 'receivedEmail'
      console.log(ack) // Handle acknowledgment from the server
    })
  }

  useEffect(() => {
    socket.on('receiveMsg', ({sentName, sentMessage}) => {
      console.log(`sender : ${sentName} , msg : ${sentMessage}`)
      setReceivedMsg(`sender : ${sentName} , msg : ${sentMessage}`)
    })
  }, [socket])

  const handleSendingMsg = () => {
    console.log('went to sending')
    socket.emit('sendMsg', {senderName, message})
  }

  return (
    <div>
      <h1>Hi user, want to join the room</h1>
      <h1>Enter email</h1>
      <input
        type="text"
        value={email}
        placeholder="Enter email or name"
        onChange={e => setEmail(e.target.value)}
      />
      <h1>Enter room no</h1>
      <input
        type="text"
        value={name}
        placeholder="Room no"
        onChange={e => setName(e.target.value)}
      />
      <br />
      <button onClick={handleJoiningRoom} type="button">
        Join
      </button>
      <p>{receivedMsg}</p>
      <div>
        <p>Send Msg</p>
        <p>Enter your name</p>
        <input
          value={senderName}
          type="text"
          placeholder="enter name"
          onChange={e => {
            setSenderName(e.target.value)
          }}
        />
        <p>Enter msg</p>
        <input
          value={message}
          type="text"
          placeholder="enter msg"
          onChange={e => {
            setMSg(e.target.value)
          }}
        />
        <button type="button" onClick={handleSendingMsg}>
          Send msg
        </button>
      </div>
    </div>
  )
}

export default Home
