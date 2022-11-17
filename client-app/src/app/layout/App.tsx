import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from "uuid";
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';





function App() {

  //this will hold a our get request list of activities
  const [activities, setActivities] = useState<Activity[]>([]);

  //This will be either an activity(fetched with an id) or undefined
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {

    agent.Activities.list().then(response => {
      let activities: Activity[] = []
      response.forEach(activitiy => {
        activitiy.date = activitiy.date.split('T')[0];
        activities.push(activitiy);
      })
      setActivities(activities);
      setLoading(false);

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
    setSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);

      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);

      })
    }
  }

  function HandleDeleteActivity(id: string) {
    setSubmitting(true);

    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false);
      
 
    })

  }

  if (loading) return <LoadingComponent content='Loading App' />
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
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={HandleDeleteActivity}
          submitting = {submitting}
        />


      </Container >
    </>
  );
}

export default App;
