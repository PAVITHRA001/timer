import { useEffect, useRef, useState } from 'react';
import './App.css';
import './Modal.css';

function App(props) {
  console.log(props.eventDate);
  const [eventDate, setEventDate] = useState();
  const [eventName, setEventName] = useState();
  const [modalVisibility, setModalVisibility] = useState(true);
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');
  
  let interval = useRef();
  const startTimer = () => {
    if(eventDate){
    const countDownDate = new Date(eventDate).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000*60*60*24)).toString().padStart(2, '0');
      const hours = Math.floor((distance % (1000*60*60*24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor(distance % (1000*60*60) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor(distance % (1000*60) / (1000)).toString().padStart(2, '0');
      if(distance < 0){
        clearInterval(interval);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  }
  }

  useEffect(()=> {
    console.log(modalVisibility,eventDate);
    if(!modalVisibility){
      startTimer();
        return () => {
      //  clearInterval(interval.current);
      }
   }
  });

  return (  
  <section className='timer-container'>
  <div class="modal-content" style={{display: modalVisibility ? "block"  : "none" }}>
    <div class="modal-header">
      <h2>Provide Name and Time of Event</h2>
    </div>
    <div class="modal-body">
    <div style={{paddingTop: "6%"}}>
    <label>Event Name: </label>
    <input type="text" onChange={(e) => setEventName(e.target.value)}/>  
    </div>
    <div style={{paddingTop: "6%"}}>
    <label>Event Date: </label>
    <input class="event-date" type="datetime-local" id="eventtime" name="eventtime" onChange={(e) => setEventDate(e.target.value)}/>
    </div>
    </div>
    <div class="modal-footer">
      <button class="modal-button" type="button" onClick={() => setModalVisibility(false)}>Start Timer</button>
    </div>
  </div>
     <section className='timer'>
      <div>
        <span className='mdi mdi-calendar-clock timer-icon'></span>
        <h2>Count Down to {eventName}</h2>
      </div>
      <div>
        <div>
        <section>
          <span>{timerDays}</span>
          &nbsp;
          <span>: </span>
          <p><small>Days</small></p>
          &nbsp;
        </section>
        <section>
          <span>{timerHours}</span>
          &nbsp;
          <span>: </span>
          <p><small>Hours</small></p>
          &nbsp;
        </section>
        <section>
          &nbsp;
          <span>{timerMinutes}</span>
          &nbsp;
          <span>: </span>
          <p><small>Minutes</small></p>
          &nbsp;
        </section>
        <section>
        &nbsp;
          <span>{timerSeconds}</span>
          <p><small>Seconds</small></p>
          &nbsp;
        </section>
        </div>
      </div>
     </section>
   </section>
  );
}

export default App;
