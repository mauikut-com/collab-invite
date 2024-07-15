import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './fullcalendar-config.js'
import * as Db from './offline-db.js'

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function handleEventClick(clickInfo) {
  if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}

function splitOrFalse(list) {
  if (list == null) {
    return false
  }
  return list.split('; ')
}

async function handleDateSelect(selectInfo) {
  const db = await Db.init();

  let calendarApi = selectInfo.view.calendar

  // ?? window.prompt doesn't work in mobile, installed or not
  let input = splitOrFalse(window.prompt('Example: soto betawi; 17:00'))

  calendarApi.unselect()

  if (input) {
    const item = {
      id: createEventId(),
      title: input[0],
      start: `${selectInfo.startStr}T${input[1]}:00`,
    }
    await db['calendar_events'].upsert(item)
    calendarApi.addEvent(item)
  }
}

async function fetchAws() {
  return [{ title: 'meetingjj', start: new Date() }]
}

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchEvents() {
    try {
      // ?? https://ap-southeast-2.console.aws.amazon.com/lambda/home?region=ap-southeast-2#/create/function?blueprint=microservice-http-endpoint&intent=blueprints
      // const response = await fetch('https://aws/calendar_events_list');
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const data = await response.json();

      // const events = [{ title: 'meetingj', start: new Date() }];
      const events = await fetchAws();
      setEvents(events);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className="App">
      <FullCalendar
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        select={handleDateSelect}
      />
    </div>
  );
}

export default App;
