'use client'

import { useEffect, useState } from 'react';
import { useGetCalls } from '@/hooks/useGetCalls';
import { Call } from '@stream-io/video-react-sdk';

const UpcomingMeetingTime = () => {
  const [nearestMeeting, setNearestMeeting] = useState<string | null>(null);
  const { upcomingCalls } = useGetCalls();

  useEffect(() => {
    try {


      if (upcomingCalls && upcomingCalls.length > 0) {
        const now = new Date();
        const nearest = upcomingCalls.reduce((prev, curr) => {
          const prevDate = prev.state?.startsAt ? new Date(prev.state.startsAt) : null;
          const currDate = curr.state?.startsAt ? new Date(curr.state.startsAt) : null;

          if (!prevDate) return curr;
          if (!currDate) return prev;

          return Math.abs(currDate.getTime() - now.getTime()) < Math.abs(prevDate.getTime() - now.getTime()) ? curr : prev;
        });

        if (nearest.state?.startsAt) {
          setNearestMeeting(new Date(nearest.state.startsAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [upcomingCalls]);

  return (
    <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
      Upcoming Meeting at: {nearestMeeting || 'Loading...'}
    </h2>
  );
};

export default UpcomingMeetingTime;
