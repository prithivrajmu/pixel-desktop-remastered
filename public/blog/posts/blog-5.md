---
id: blog-5
title: "The Stack I Keep Coming Back To"
date: 2026-03-03
preview: "Nine years of data work teaches you something: the best stack isn't the most impressive one — it's the one that gets out of your way when the problem is hard."
keywords: "tech stack, TypeScript, React, Supabase, PostgreSQL, Python, data engineering, full-stack development, software architecture, Prithiv Raj"
---

# The Stack I Keep Coming Back To

Nine years of data work teaches you something: the best stack isn't the most impressive one — it's the one that gets out of your way when the problem is hard.

I've worked in Snowflake, BigQuery, dbt, Python, R, SimPy, Tableau, Sisense, and half a dozen other tools. Some of those left the moment the contract ended. But a handful have stayed, grown with my thinking, and now form the core of how I build almost everything — from internal SaaS products to streaming platforms to simulation tools.

This is what that stack looks like and why it holds.

---

## Python: The Thinking Layer

Python is still where most problems start for me. Not because it's the fastest or the most elegant — but because the speed from idea to running code is unmatched. When I'm modeling something, exploring a dataset, writing a simulation, or wiring up a backend service, Python is where I reach first.

At Volansi and NEXTOR II, Python was the backbone of everything: SimPy-based simulation models for hub-and-spoke delivery design, SciPy-driven optimization work, machine learning pipelines, and quick internal tools that needed to ship in a sprint rather than a quarter. It's a flexible layer that doesn't ask you to choose between data science and software engineering before you've figured out what you're actually building.

The libraries I keep coming back to: `pandas` for exploration, `FastAPI` for backend APIs, `SimPy` for discrete-event simulation, `PyFlink` for stream processing, and `pytest` for everything I want to trust.

---

## TypeScript and React: The Front That Actually Ships

I came to TypeScript late. My earlier frontend work was functional but messy — the kind where you win the sprint but lose the next three months to debugging prop shapes you can't remember.

TypeScript changed that. Not because it prevented every bug, but because it forced me to think about data shapes before writing code that consumed them. In a product where a Supabase row flows from the database through a query to a component prop, that discipline is the difference between a codebase you can hand off and one only you can read.

React I've used long enough to stop caring about debates. With `TanStack Query` handling async state, `React Router` managing navigation, and `Radix UI` or `shadcn` handling accessible components, the stack builds fast and stays coherent. Vite replaced CRA and I haven't looked back — builds are fast enough that the dev loop stays alive even on large projects.

---

## Supabase and PostgreSQL: The Data Core

This combination is what replaced the spreadsheet sprawl in most of the products I've built at Headwind Labs. Supabase gives you a hosted PostgreSQL instance with Row Level Security, realtime subscriptions, auth, and edge functions in one place. That's not a small thing when you're a two-person team building operational software for a client who needs it live in six weeks.

PostgreSQL itself is the right choice for almost every problem I've encountered in internal products. The range of what it handles — relational modeling, JSONB, full-text search, time-series with TimescaleDB, geospatial with PostGIS — means I can stay in one data layer across a wide surface area without introducing infrastructure complexity.

The pattern I use now: Supabase for the product layer, raw PostgreSQL or TimescaleDB when the access patterns demand it.

---

## Kafka and PyFlink: When the Data Doesn't Wait

Most of my work is transactional. But when I built OpenPipe — a local streaming playground for device telemetry — I needed a different mental model. Kafka handles the ingestion and decoupling. PyFlink does the stateful processing over the stream: windowed aggregations, enrichment, anomaly flagging. TimescaleDB takes the processed output and makes it queryable over time.

This trio has changed how I think about data pipelines generally. Even in batch-oriented workflows, the patterns from stream processing — immutable event logs, exactly-once semantics, late data handling — make the architecture more honest about what the data actually is.

---

## Docker: The Infrastructure That Travels

Every project I build now ships with a `docker-compose.yml`. Not because the production environment uses it, but because it means any new person on the team can spin up the full stack locally in one command. For OpenPipe, it's the only infrastructure layer — the entire platform runs locally. For client products, it keeps the dev environment from drifting away from production in ways that bite you during a deploy.

---

## What the Stack Is Really About

The honest version of this isn't a list of tools — it's a set of values.

I want to be able to move from schema to UI without switching environments. I want strong types on the frontend and the database. I want async state managed cleanly and not wired by hand. I want observability that doesn't require a third-party subscription during early development. And I want things to run locally so the feedback loop stays tight.

This stack doesn't win every benchmark. But it's the one that has let me build warehouses, simulation engines, CRMs, inventory systems, invoice generators, and learning platforms — often with one or two other people — and ship them.

That's the real test.
