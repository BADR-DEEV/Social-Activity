import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'





export default function ActivityDetail() {



    const {activityStore} = useStore();
    const {selectedActivity: activity , openForm , cancelSelectedActivity } = activityStore

    if(!activity) return <LoadingComponent/>;
    return (
        <Card fluid >
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>
                    {activity.title}
                </Card.Header>
                <Card.Meta>
                    <span> {activity.date.toString()} </span>

                </Card.Meta>

                <Card.Description>
                    {activity.description}

                </Card.Description>

            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activity.id)} color='blue' content="Edit" basic />
                    <Button onClick={cancelSelectedActivity} color='grey' content="Cancel" basic />
                </Button.Group>

            </Card.Content >
        </Card>
    )
}
