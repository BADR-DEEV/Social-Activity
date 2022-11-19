import { observer } from 'mobx-react-lite';
import React from 'react'
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';


export default observer(function ActivityDashboard() {

  const { activityStore } = useStore();
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />

      </Grid.Column>

      <Grid.Column width='6'>
        {selectedActivity && !editMode &&
          <ActivityDetail />}

        {editMode &&
          <ActivityForm />}

      </Grid.Column>
    </Grid>
  )
})
