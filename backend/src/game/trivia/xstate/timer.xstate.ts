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
      type: 'always'
    }

export const timerMachine = createMachine<TimerContext, TimerEvent>({
  id: 'timer',
  initial: 'running',
  context: {
    elapsed: 0,
    duration: 20, // this can be configurable
    interval: 1
  },
  states: {
    running: {
      // ensure values are there (they can be overwriten in parent's "invoke")
      entry: assign({
        elapsed: (context) => 0,
        interval: (context) => 1
      }),
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