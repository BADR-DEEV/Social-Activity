import React from 'react'
import { Calendar } from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function ActivitiesFilters() {

    const activityFiltersStyle = {
        width: '100%',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
        marginTop: 25

};
return (
    <>
        <Menu vertical size='large' style={ activityFiltersStyle}>
            <Header icon='filter' color='teal' content='Filters' attached />

            <Menu.Item content='all activities' />
            <Menu.Item content="I'm going" />
            <Menu.Item content="I'm hostng" />
        </Menu>

        <Header />
        <Calendar />


    </>
)
}
