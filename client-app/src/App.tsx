import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Header, List } from 'semantic-ui-react';




function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }

    axios.get("http://localhost:5000/api/activities", config).then(response => {
      console.log(response)
      setActivities(response.data)

    })

  }, [])

  return (
    <div>
      <Header as='h1' icon='users' content='Reactivities' />

      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>



        ))}
      </List>

      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>




    </div>
  );
}

export default App;
