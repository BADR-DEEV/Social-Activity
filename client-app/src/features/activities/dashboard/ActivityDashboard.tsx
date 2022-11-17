import React from 'react'
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting : boolean;


}

export const ActivityDashboard = ({
  activities, selectedActivity,
  selectActivity, cancelSelectActivity,
  editMode, openForm,
  closeForm, createOrEdit,
   deleteActivity, submitting }: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting = {submitting} />

      </Grid.Column>

      <Grid.Column width='6'>
        {selectedActivity && !editMode &&
          <ActivityDetail
            openForm={openForm}
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
          />}
        {editMode &&
          <ActivityForm
          submitting = {submitting}
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEdit={createOrEdit} />}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard;