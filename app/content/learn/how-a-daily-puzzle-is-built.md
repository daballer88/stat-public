---
title: How a daily puzzle is built: the library, the draw and the fairness rules
seoTitle: How Stat! builds its daily medical puzzles
description: Where Stat!'s puzzles come from: a curated library of 250 diseases and 349 structures, one shared draw per date, and the rules that keep each game fair.
eyebrow: Inside Stat!
topic: Inside Stat!
order: 11
featured: true
published: 2026-10-09
updated: 2026-10-09
related: how-to-play/syndrome, how-to-play/associations, learn/learning-with-daily-puzzles
---

At midnight, your local time, Stat! serves a new set of puzzles: a case in Syndrome, a hidden disease in Traits, a board in Associations and three structures in Tangent. None is written by hand on the day: each comes from a library built for the game, assembled by rules that keep it solvable and fair. This article explains how, without spoiling any day.

## Key points

- Every puzzle comes from one curated library of 250 diseases, 25 in each of ten body systems, and 349 anatomical structures.
- A program chooses each day's puzzles in advance from the game and the date, so everyone gets the same puzzles, with rules against repeats.
- Associations boards are built so every card has exactly one right group, and Tangent scores a guess by its distance from the target on the body map.

## One library behind four games

Every puzzle starts from one curated library. It holds **250 diseases, 25 in each of ten body systems**, and each is recorded the same way:

| Recorded for each disease | Where you meet it |
| --- | --- |
| Its name, plus alternative names for 151 of them | The diagnosis search |
| Six traits: system, type, acuity, organs, diagnosis and treatment | Every row in Traits |
| An age range and a sex: female, male or both | The Syndrome presentation |
| Symptoms, lab results marked high or low, abnormal vital signs and imaging | Syndrome questions, Associations cards, hints |
| Four physical examination signs | Associations cards, hints |
| A short teaching point | The result screen |

The findings share one **vocabulary**: every symptom, lab test, vital sign and imaging study in the library comes from the menu you search in Syndrome, which lists 193 symptoms, 91 lab tests, 6 vital signs and 20 imaging studies. So every finding apart from the examination signs is something you can ask about.

The library also holds **349 anatomical structures**: 56 organs, 73 bones, 75 muscles, 65 blood vessels and 80 nerves. Each has a short description, a front-to-back depth and a hand-drawn place on the body map.

## One date, the same puzzles for everyone

A program chooses each day's puzzles in advance, at random but reproducibly: it starts from the game and the date, so a given date always produces the same picks. Your device looks up the puzzles for its own calendar date, which is why everyone shares them and why they change at local midnight. Every pick is checked against the library before publication.

A few rules shape the draw:

- **Syndrome and Traits** each pick one disease from all 250, never the same disease two days running in the same game.
- **Associations** picks four diseases, none of them from the previous day's board.
- **Tangent** picks one structure for each of its three tiers, never the same structure two days running in a tier.

Even Syndrome's patient is shared: the age, sex and complaint are generated reproducibly from the date.

## Syndrome: a case built from the record

The presentation comes from the hidden disease's record. The **complaint** is one of its listed symptoms, the **age** falls inside its age range, and the **sex** follows the record: a disease recorded for one sex always presents in that sex, and otherwise the case picks one at random. So the opening line already rules diseases out.

Each question is answered from the record:

- A **symptom** is present if the disease lists it, and absent if not. A general term such as *cough* also matches a more specific listed form.
- A **lab** is high or low if the record lists it, and normal if not. The wording follows how the test is reported: 26 yes-or-no tests, such as cultures and antibody tests, read **positive** or **negative**, and a urinalysis or blood smear reads **abnormal** or **normal**.
- A **vital sign** or **imaging study** is abnormal if the record lists it, and normal if not.

This is why **absent findings matter**. A typical disease lists about ten of the roughly 310 items on the menu, so most possible questions come back grey. Yet each grey answer rules out every disease in the library that lists that finding: in Syndrome, an absent symptom or a normal test narrows your list as reliably as a positive one. Real tests are less tidy, as our guide to [reading lab results](/learn/reading-lab-results/) explains.

Examination signs are never on the menu. During a case they appear only through hints, which reveal a random finding you have not asked about yet. The [Syndrome guide](/how-to-play/syndrome/) covers strategy.

## Traits: six comparisons per guess

Each guess is compared with the hidden disease on six traits. **System** and **type** hold one value each, so they are either exact or a miss. **Acuity, organs, diagnosis and treatment** can hold several values: the same set is **exact**, at least one value in common is **partial**, and nothing in common is a **miss**.

How common a value is shapes what a color tells you. All but one of the 250 diseases list "clinical" among their diagnosis values, so diagnosis is almost never grey; the signal is whether it turns green. Organs is the opposite: two diseases picked at random share no organ about nine times in ten, so amber or green there is a strong lead.

Traits cannot separate every disease: in the current library, 52 of the 250 share all six values with another disease, which is why a full green row is not always a win. For strategy, see the [Traits guide](/how-to-play/traits/).

## Associations: one right group for every card

A board holds four diseases with four cards each. Every card is a finding from its disease's record, and every group includes at least one examination sign.

The central rule is **fairness**: each card has exactly one right group. When a daily board is built, no card may be a finding that another disease on the board also lists, and no card text may appear twice; if four diseases cannot make a fair board, the program draws another four. The check also counts a symptom and the vital sign that expresses it as the same finding, so a *fever* card never belongs to one disease while another on the board lists an abnormal temperature. Heart rate, blood pressure, breathing rate and oxygen saturation work the same way.

Fair means fair by the library: in real medicine a card can still seem to fit two diseases, as our guide to [classic clinical associations](/learn/classic-clinical-associations/) shows.

Then comes the **shuffle**. A board is put together one disease at a time, so unshuffled, each group's cards would sit side by side. The cards are shuffled on your own device, separately for each player, so a card's position says nothing about its group, and two friends playing the same board see different layouts. The [Associations guide](/how-to-play/associations/) has tips for solving the board.

## Tangent: distance measured on the map

Every Tangent structure is placed by hand on a front view of the body, using landmarks such as the sternal notch, the nipple line, the costal margin and the umbilicus (see our guide to [surface anatomy](/learn/surface-anatomy-landmarks/)), with each spinal nerve root at its vertebral level. Paired structures appear on both sides, one-sided structures on their own side, and structures at the back are drawn dashed.

Closeness is measured on those same drawings, so what looks close on the map scores close. The distance combines three things:

1. **How near the two structures come** on the map, between their nearest parts.
2. **How spread out the target is.** Part of the distance reflects how far the target's parts lie from your guess on average, so touching one end of a long vessel or nerve scores lower than running alongside it.
3. **How far apart they are from front to back.** A guess that covers the target on the map but lies half the body's depth in front of or behind it scores in the low 70s at best.

The skin, which covers the whole body, is a special case: closeness to it depends only on how near a guess lies to the front or back surface.

Only the exact answer scores 100. Neighbors that touch at the same depth usually score in the 90s, a typical guess lands mid-scale, and the far end of the body can score in single digits. The scale is steepest near the target, so small moves count most when you are already close. The [Tangent guide](/how-to-play/tangent/) lists the color bands.

## Why four games

The four games come at the library from four directions: from findings to a diagnosis in Syndrome, through a disease's categories in Traits, across clusters of findings in Associations and around the body in Tangent. A disease can return in a different game or with a different presentation. Our article on [learning with daily puzzles](/learn/learning-with-daily-puzzles/) explains why mixed, spaced practice like this helps you remember.

## Simplified on purpose

To make every question answerable, the library simplifies: symptoms are present or absent, labs are high, low or normal, and each disease has one system and one type. Real patients are messier. Stat! is a learning game, and nothing in it is medical advice.

## Questions or corrections

Spotted a mistake in a puzzle or this article? Email [stat@blottergames.com](mailto:stat@blottergames.com) with the date, the game and what looks wrong. We check every report.
