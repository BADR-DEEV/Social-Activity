import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from "uuid";





function App() {

  //this will hold a our get request list of activities
  const [activities, setActivities] = useState<Activity[]>([]);

  //This will be either an activity(fetched with an id) or undefined
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {


    axios.get<Activity[]>("http://localhost:5000/api/activities").then(response => {
      setActivities(response.data)

    })

  }, [])

  //selectActivity will bring us the activity
  function HandleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function HandleCancelActivity() {
    setSelectedActivity(undefined);
  }

  function HandleFormOpen(id?: string) {
    id ? HandleSelectActivity(id) : HandleCancelActivity();
    setEditMode(true);


  }

  function HandleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
     : setActivities([...activities, {...activity , id : uuid()}]);
     setEditMode(false);
     setSelectedActivity(activity);

  }

  function HandleDeleteActivity(id : string) {
    setActivities([...activities.filter(x => x.id !== id)])

  }
  return (
    <>
      <NavBar openForm={HandleFormOpen} />
      <Container style={{ marginTop: '7em' }} >
        <ActivityDashboard
          selectedActivity={selectedActivity}
          selectActivity={HandleSelectActivity}
          cancelSelectActivity={HandleCancelActivity}
          activities={activities}
          editMode={editMode}
          openForm={HandleFormOpen}
          closeForm={HandleFormClose}
          createOrEdit = {handleCreateOrEditActivity}
          deleteActivity = {HandleDeleteActivity}
        />


      </Container >
    </>
  );
}

export default App;
