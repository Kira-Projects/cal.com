import type { Prisma } from "@prisma/client";

import dayjs from "@calcom/dayjs";

import { parseRecurringEvent } from "./isRecurringEvent";
import { getTranslation } from "./server";

type DestinationCalendar = {
  id: number;
  integration: string;
  externalId: string;
  primaryEmail: string | null;
  userId: number | null;
  eventTypeId: number | null;
  credentialId: number | null;
  domainWideDelegationCredentialId: string | null;
} | null;

type Attendee = {
  email: string;
  name: string;
  timeZone: string;
  locale: string | null;
};

type Organizer = {
  email: string;
  name: string | null;
  timeZone: string;
  locale: string | null;
};

type EventType = {
  title: string;
  recurringEvent: Prisma.JsonValue | null;
  seatsPerTimeSlot: number | null;
  seatsShowAttendees: boolean | null;
};

type Booking = {
  title: string;
  description: string | null;
  startTime: Date | null;
  endTime: Date | null;
  userPrimaryEmail: string | null;
  uid: string;
  destinationCalendar: DestinationCalendar;
  user: {
    destinationCalendar: DestinationCalendar;
  } | null;
  attendees: Attendee[];
  eventType: EventType | null;
};

export const buildCalEventFromBooking = async ({
  booking,
  organizer,
  location,
  conferenceCredentialId,
}: {
  booking: Booking;
  organizer: Organizer;
  location: string;
  conferenceCredentialId: number | null;
}) => {
  const attendeesList = await Promise.all(
    booking.attendees.map(async (attendee) => {
      return {
        name: attendee.name,
        email: attendee.email,
        timeZone: attendee.timeZone,
        language: {
          translate: await getTranslation(attendee.locale ?? "es", "common"),
          locale: attendee.locale ?? "es",
        },
      };
    })
  );

  const tOrganizer = await getTranslation(organizer.locale ?? "es", "common");

  return {
    title: booking.title || "",
    type: (booking.eventType?.title as string) || booking.title || "",
    description: booking.description || "",
    startTime: booking.startTime ? dayjs(booking.startTime).format() : "",
    endTime: booking.endTime ? dayjs(booking.endTime).format() : "",
    organizer: {
      email: booking.userPrimaryEmail ?? organizer.email,
      name: organizer.name ?? "Nameless",
      timeZone: organizer.timeZone,
      language: { translate: tOrganizer, locale: organizer.locale ?? "es" },
    },
    attendees: attendeesList,
    uid: booking.uid,
    recurringEvent: parseRecurringEvent(booking.eventType?.recurringEvent),
    location,
    conferenceCredentialId: conferenceCredentialId ?? undefined,
    destinationCalendar: booking.destinationCalendar
      ? [booking.destinationCalendar]
      : booking.user?.destinationCalendar
      ? [booking.user?.destinationCalendar]
      : [],
    seatsPerTimeSlot: booking.eventType?.seatsPerTimeSlot,
    seatsShowAttendees: booking.eventType?.seatsShowAttendees,
  };
};
