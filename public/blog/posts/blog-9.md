---
id: blog-9
title: "SIMILE: Making Urban Simulation Something You Can Actually Explore"
date: 2026-03-27
preview: "Urban simulation models are usually built for researchers. SIMILE was my attempt to build one that planners, journalists, and curious residents could use — without needing a PhD in cellular automata."
keywords: "urban simulation, Chennai expansion, cellular automata, agent-based modeling, spatial simulation, SIMILE, React, Leaflet, Flask, Python, Prithiv Raj"
---

# SIMILE: Making Urban Simulation Something You Can Actually Explore

Urban simulation models are usually built for researchers, used by researchers, and read about by everyone else in a journal article two years after the fact.

I've spent a significant part of my career building simulation models — at NEXTOR II for US aviation operations, at Volansi for drone delivery network planning, and as standalone projects for understanding spatial dynamics in cities. The models have been useful. But they've also been opaque. If you weren't the person who built the model, understanding what it was doing — and why — required a working knowledge of discrete-event simulation theory or agent-based modeling or cellular automata. That's a significant barrier.

SIMILE was my attempt to change that. A full-stack urban simulation tool for Chennai's spatial growth — one that a planner, a journalist, or a curious resident could use without needing a PhD in CA theory. The name stands for Spatial Inference and Modelling for Iterative Land Expansion.

---

## Why Chennai

Chennai is a good case study for urban simulation for a few reasons.

The city's growth over the last 30 years has been rapid and uneven. The coastal belt, the IT corridor along Old Mahabalipuram Road, the expansion toward Kancheepuram district — each of these growth vectors has had different drivers: employment clusters, land prices, infrastructure investment, and migration patterns. The result is a city where land use changes have happened faster than planning frameworks could track.

There's also good historical satellite data. The LSIB and NLCD datasets, Sentinel-2 imagery, and Open Street Map provide a reasonably complete picture of how the city's footprint has changed over time. Using that as training data for a simulation model gives you a baseline that's grounded in observed change rather than purely theoretical assumptions.

---

## The Model: CA + ABM

SIMILE uses a hybrid model that combines two approaches:

**Cellular Automata (CA)** for the physical land use dynamics. The city is represented as a grid of cells, each with a land use state: residential, commercial, agricultural, water, vacant, or developed. At each time step, transition rules govern how a cell's state changes based on its current state, the states of its neighbors, and a set of weighted attractors — proximity to roads, distance to employment centres, elevation above sea level.

**Agent-Based Modeling (ABM)** for the behavioral layer. Agents represent household clusters with a set of location preferences — affordability, commute time, access to schools and markets. At each time step, agents evaluate their current location against alternatives and make relocation decisions based on a weighted utility function. These relocation decisions change population density maps, which feed back into the CA transition rules for the next step.

The feedback between the two layers is what makes the model interesting. Land use change affects agent behavior (people move toward newly developed areas). Agent behavior affects land use change (development follows population pressure). The dynamics that emerge aren't predetermined — they're the product of the interaction between the physical and behavioral layers.

---

## The Technical Stack

The simulation logic runs in Python on a Flask backend. NumPy handles the grid operations — vectorized cell-state updates over arrays run fast enough that a 500x500 cell grid steps through 20 years of simulated time in under 30 seconds on a standard laptop. The ABM layer runs sequentially but with a manageable number of agents for the spatial scale we're working at.

The frontend is built in React with Leaflet for the map layer. The key design decision was to make the map the primary interface — not a result panel below a form, but the actual working surface where you configure the simulation and read its output.

The workflow looks like this:
1. Select a starting year and a simulation horizon
2. Adjust the driver weights: how much does road proximity matter relative to employment access? How sensitive are agents to land prices?
3. Run the simulation
4. Step through the output year by year, toggling between land use, population density, and land price overlays
5. Save the run configuration and compare it against alternative scenarios

The comparison view — side-by-side maps of two scenarios stepping through time together — turned out to be the most useful feature. It's the clearest way to understand how changing a single parameter (more weight on road access, for example) shifts the entire pattern of growth over 20 years.

---

## What Makes Simulation Hard to Communicate

The core challenge in building SIMILE wasn't the modeling — it was the interface problem.

A simulation model has three stages of output: the parameters you put in, the computational process that runs, and the results you see. Most simulation tools show you the results without giving you visibility into why those results emerged. That's fine if you trust the model. It's a problem if you're trying to use the model to make a real decision.

SIMILE tries to address this by making the parameter space explorable. Every driver weight is surfaced as a slider. The scenario comparison makes differences visible. A model explanation panel describes, in plain language, what each parameter controls and what direction changing it will move the output.

This is still imperfect. A simulation with thousands of interacting cells and agents doesn't reduce to a simple explanation. But making the parameters transparent and the comparisons visual at least gives users a way to develop intuition about the model rather than treating it as a black box.

---

## Lessons from Building Simulation Products

**Simulation models are hypotheses, not predictions.** This distinction matters enormously when you're presenting output to people who aren't modelers. SIMILE's UI is explicit about this: every output screen is labeled "simulated projection" rather than "forecast." The model tells you what would happen if the world worked the way the model assumes it does. Reality is more complicated.

**The interface is the product.** I've built simulation models that lived in Jupyter notebooks, in custom Python scripts, and in internal dashboards. SIMILE was the first time I invested seriously in making the interface usable by people who weren't me. That investment changed how the model itself was designed — I added features that made sense for exploration rather than features that made sense for publication.

**Calibration is where the work is.** Getting the CA transition weights and the agent utility function parameters to produce output that matches observed historical growth patterns required more iteration than building the model itself. Calibration against Sentinel-2 land use data from 2005 to 2023 gave me a reasonably grounded starting point, but the model still makes simplifying assumptions that experienced planners will immediately identify.

---

SIMILE's source code is available on [GitHub](https://github.com/prithivrajmu/chennai_expansion_sim). The tool is designed to be adaptable to other Indian cities with similar satellite data availability — the model structure is general even if the calibration parameters are Chennai-specific.

If you work in urban planning, spatial data, or simulation and want to explore the model or adapt it for another context, I'd be glad to collaborate.
