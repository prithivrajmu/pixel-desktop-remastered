---
id: blog-8
title: "MiroFish: The Multi-Agent Simulation Project That Changed How I Think About Digital Worlds"
date: 2025-12-12
preview: "Someone built a project where you feed it a news article, a policy document, or a piece of fiction — and it spins up thousands of autonomous AI agents who argue, remember, evolve, and collectively produce a prediction about what happens next. I couldn't stop thinking about it."
keywords: "MiroFish, multi-agent simulation, AI agents, social simulation, GraphRAG, digital twin, LLM simulation, agent-based modeling, Prithiv Raj"
---

# MiroFish: The Multi-Agent Simulation Project That Changed How I Think About Digital Worlds

I spend a lot of time thinking about simulation. It's a thread that runs through most of my career: queuing models for airports at NEXTOR II, hub-and-spoke delivery simulators at Volansi, cellular automata for urban growth in Chennai. Simulation is, in my experience, the most honest way to reason about complex systems — honest because it forces you to state your assumptions explicitly rather than burying them in model coefficients.

So when I came across MiroFish — a project built by a Chinese developer and backed by Shanda Group — I read the README three times before I was confident I understood what it was actually doing.

And then I was impressed in a way I don't get very often.

---

## What MiroFish Is

The core idea is deceptively simple: give the system seed information from the real world — a news article, a policy document, a financial signal, a piece of fiction — and it constructs a population of thousands of autonomous AI agents, each with a distinct personality, independent memory, and a behavioral model. These agents interact with each other, update their memories over time, form opinions, influence each other, and collectively produce emergent dynamics that the system then synthesizes into a predictive report.

The project's own framing: *"Let the future rehearse in a digital sandbox, enabling decisions to prevail after simulating hundreds of battles."*

That's not marketing copy. It's an accurate description of what the system does.

---

## The Technical Architecture

What makes MiroFish interesting isn't the idea — multi-agent simulation has been an active research area for decades. What makes it interesting is the execution.

**GraphRAG for world construction.** Rather than feeding agents raw text, MiroFish builds a knowledge graph from the seed material. Entities, relationships, temporal context, and domain-specific signals get extracted and structured into a graph that serves as the agents' shared understanding of their world. This is meaningfully different from naively prompting each agent with the source document — the graph gives agents a navigable, semantically rich representation of context rather than a flat text blob.

**Persona generation with long-term memory.** Each agent isn't just a prompt. It has a generated personality profile, a starting belief state, and a memory system backed by Zep Cloud that persists and evolves as the simulation runs. An agent who reads a piece of news, has a conversation with another agent, and then encounters contradicting information responds differently in round 20 than it would in round 1. The memory accumulation is what creates non-trivial dynamics.

**OASIS as the simulation engine.** The multi-agent orchestration runs on OASIS, a simulation framework developed by CAMEL-AI. This handles the coordination of parallel agent execution — thousands of agents interacting in defined time steps without colliding on shared state.

**Vue.js frontend with interactive injection.** This is the detail that elevated the project from research prototype to actual product in my eyes. You can inject variables mid-simulation. You can query individual agents directly. You can rewind to an earlier state and run a branch with different seed conditions. That kind of interactive control is exactly what makes simulation useful for real decision-making rather than just post-hoc analysis.

---

## Why This Matters Beyond the Demo

The demos on the repository are deliberately chosen to be accessible: predicting public opinion shifts, simulating a lost ending for *Dream of the Red Chamber*, modeling how a policy announcement propagates through a social network.

But the architecture is built for harder problems. The same framework that simulates literary characters can simulate market participants. The same memory system that tracks an agent's evolving opinion about a news story can track a supply chain actor's evolving response to a disruption. The same report generation layer that produces narrative summaries can produce structured decision support.

I've spent the better part of my career trying to make simulation outputs useful to decision-makers who didn't build the model. MiroFish's approach — structured agents with readable memory, interactive mid-simulation injection, and generated report outputs — is one of the cleanest answers I've seen to the "how do you make the model's reasoning legible?" problem.

---

## What Admiring Good Work Looks Like

I didn't build MiroFish. I'm not affiliated with it. I found it the way most people find interesting open-source work: scrolling past the usual noise and something stopped me.

There's a tendency in technical work to only write about your own projects. I think that's a mistake. The people who made real impressions on my thinking — not through their papers but through actually shipped code that I could read and run — deserve recognition on their own terms.

The developer behind MiroFish built something with 47,000 GitHub stars not because they had a large platform or a well-funded team, but because they had a genuinely interesting idea and executed it well enough that other people could see what they were seeing.

That's the standard I try to hold my own work to. It's useful to look at examples of it being met.

---

The repository is at [github.com/666ghj/MiroFish](https://github.com/666ghj/MiroFish). The README is comprehensive, the setup documentation is clear, and the architecture section is worth reading even if you never run the system. Recommended for anyone who thinks seriously about simulation, multi-agent systems, or the practical applications of LLMs beyond chat.
