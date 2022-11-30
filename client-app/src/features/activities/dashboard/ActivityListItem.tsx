import { format } from 'date-fns'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'



interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {



    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={NavLink} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by Bob
                            </Item.Description>
                        </Item.Content>

                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
                <span>
                    <Icon name='clock' />{format( activity.date! , 'dd MMM yyy h:mm aa') }
                    <Icon name='marker' />{activity.venue}
                </span>
            </Segment>

            <Segment secondary>
                Attendees go here
            </Segment>

            <Segment clearing >
                <span>{activity.description}</span>
                <Button color='teal'
                    as={Link}
                    to={`/activities/${activity.id}`}
                    floated='right'
                    content='View' />

            </Segment>

        </Segment.Group>
    )
}
