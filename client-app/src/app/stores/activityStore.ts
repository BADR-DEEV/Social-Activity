import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class activityStore {
    activityRedistry = new Map<String, Activity>()
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)

    }

    get activitiesByDate() {
        return Array.from(this.activityRedistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime())
    }


    get grupedActivities() {

        // const obj = { foo: 'bar', baz: 42 };
        // console.log(Object.entries(obj)); 
        // [ ['foo', 'bar'], ['baz', 42] ]

        return Object.entries(
            //reduce takes two params the first is an array the second is an indvisual item of the array
            this.activitiesByDate.reduce((activities, activity) => {
                //this represent our key for each object 
                const date = format(activity.date!, 'dd MMM yyyy')
                //we are checking if there is a match , 
                // activities are constant array the date is not we will loop through each date in the const array to find a match
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
                //the reducer takes an inital value
            }, {} as { [key: string]: Activity[] })
        )
    }


    loadActivities = async () => {
        this.setLoadingInital(true)

        try {
            const activities = await agent.Activities.list();

            activities.forEach(activity => {
                this.setActivity(activity)
            })

            this.setLoadingInital(false);
        } catch (e) {
            console.log(e);

            this.setLoadingInital(false);
        }
    }
    loadActivity = async (id: string) => {

        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);

                runInAction(() => {
                    this.selectedActivity = activity;
                })

                this.setLoadingInital(false);
                return activity;

            } catch (e) {
                console.log(e)
                this.setLoadingInital(false);

            }
        }
    }


    private getActivity = (id: string) => {
        return this.activityRedistry.get(id);

    }

    private setActivity = (activity: Activity) => {
        // activity.date = activity.date.split('T')[0]
        activity.date = new Date(activity.date!)
        this.activityRedistry.set(activity.id, activity);

    }


    setLoadingInital = (state: boolean) => {
        this.loadingInitial = state;

    }


    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRedistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })

        } catch (e) {
            console.log(e);
            runInAction(() => {

                this.loading = false;

            })
        }
    }

    UpdateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.activityRedistry.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            })

        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            })
        }

    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id)
            runInAction(() => {
                this.activityRedistry.delete(id);
                this.loading = false;

            })

        } catch (e) {
            console.log(e)
            runInAction(() => {
                this.loading = false;
            })
        }

    }
}