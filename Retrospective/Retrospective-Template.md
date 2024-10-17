# TEMPLATE FOR RETROSPECTIVE (Team 14)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done
  > Commited:6, Done:0
- Total points committed vs. done
  > Commited:29, Done:0
- Nr of hours planned vs. spent (as a team)
  > Planned:90, Spent:91h 25min

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story                      | # Tasks | Points | Hours est. | Hours actual |
| -------------------------- | ------- | ------ | ---------- | ------------ |
| _#0_                       | 14      |        | 1w1d30m    | 1w6h20m      |
| 1 (Get ticket)             | 4       | 1      | 6h         | 1d10min      |
| 2 (Config Counters)        | 8       | 8      | 2d         | 3d4h         |
| 3 (Next Customer)          | 4       | 3      | 2d4h       | 3h20min      |
| 4 (Call Customer)          | 3       | 1      | 5h         | 2h25min      |
| 5 (Notify Customer Served) | 3       | 13     | 5h         | 1h10min      |
| 6 (Get Estimated Time)     | 2       | 3      | 3h         | 3h           |

> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
  > $${90/38=2.37} - 1$$
- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

  $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$

  > (91.42/90)-1=0,016

- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

  $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$

  > 2,82/38=0,074

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 7h30min
  - Total hours spent: 1h
  - Nr of automated unit test cases: 9
  - Coverage (if available)
- E2E testing:
  - Total hours estimated: 7h30m
  - Total hours spent: 2h
- Code review
  - Total hours estimated: 6h20min
  - Total hours spent: 3h

## ASSESSMENT

- What caused your errors in estimation (if any)?

> Lack of experience in agile approach, we didn't properly consider the complexity of some functionalities.
> Underestimation of effort needed for tests.

- What lessons did you learn (both positive and negative) in this sprint?

> Do not focus on more than 2-3 stories at the same time, correct use of git branches, better organization and communication in coding, not always is possible to divide backend and frontend logic, how to manage time, do more scrum meetings.

- Which improvement goals set in the previous retrospective were you able to achieve?

> We didn't have a previous retrospective

- Which ones you were not able to achieve? Why?

> See above

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> Do not deep dive in coding straight away: to achieve it we think that a better scheduling of stories and tasks paired with better communication can help us.
> Use branching system of git properly: avoid to directly push in the main branch.
> Better team coordination and communication

- One thing you are proud of as a Team!!

> We had lots of problems but managed to solve them.
