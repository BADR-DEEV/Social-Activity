import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export default class activityStore {
    activityRedistry = new Map<String, Activity>()
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)

    }

    get activitiesByDate() {
        return Array.from(this.activityRedistry.values()).sort((a, b)=> 
        Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () => {

        try { 

            const activities = await agent.Activities.list();

            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0]
                this.activityRedistry.set(activity.id, activity);
            })

            this.setLoadingInital(false);
        } catch (e) {
            console.log(e);

            this.setLoadingInital(false);
        }
    }

    setLoadingInital = (state: boolean) => {
        this.loadingInitial = state;

    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRedistry.get(id);


    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;


    }
    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();

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
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
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