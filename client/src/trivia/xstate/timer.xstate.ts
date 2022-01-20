//based on https://xstate.js.org/docs/tutorials/7guis/timer.html#coding

import { assign, createMachine, sendParent } from "xstate";

export type TimerContext = {
  // The elapsed time (in seconds)
  elapsed: number
  // The maximum time (in seconds)
  duration: number
  // The interval to send TICK events (in seconds)
  interval: number
}

type TimerEvent =
  | {
      // The TICK event sent by the spawned interval service
      type: 'TICK'
    }
  | {
      // User intent to reset the elapsed time to 0
      type: 'RESET'
    }

export const timerMachine = createMachine<TimerContext, TimerEvent>({
  initial: 'running',
  context: {
    elapsed: 0,
    duration: 20, // this can be configurable
    interval: 0.1
  },
  states: {
    running: {
      invoke: {
        src: context => cb => {
          const interval = setInterval(() => {
            cb('TICK');
          }, 1000 * context.interval);
          return () => {
            clearInterval(interval);
          };
        }
      },
      on: {
        '': {
          target: 'finished',
          cond: context => {
            return context.elapsed >= context.duration;
          }
        },
        TICK: {
          actions: [
            assign({
              elapsed: context => +(context.elapsed + context.interval).toFixed(2)
            }),
            sendParent((context) => ({
              type: 'TIMER_UPDATED',
              elapsed: context.elapsed
            }))
          ]
        }
      }
    },
    finished: {
      type: 'final'
    }
  }
});