import { Subscriber } from "@project/shared/shared-types";
import { NewsletterDto } from "../dto/newsletter.dto";
import dayjs from "dayjs";

export const getNewWorkouts = ({workouts}:NewsletterDto, {dateNotify}:Subscriber)=> workouts.filter((workout) => dayjs(workout.createdDate).isAfter(dateNotify));
