import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'



interface Props {
    activity: Activity
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;

}

export default function ActivityDetail({ activity, cancelSelectActivity, openForm }: Props) {


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
                    <Button onClick={cancelSelectActivity} color='grey' content="Cancel" basic />
                </Button.Group>

            </Card.Content >
        </Card>
    )
}
