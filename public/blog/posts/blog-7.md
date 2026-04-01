---
id: blog-7
title: "GST Invoicer: Building Offline-First for India's Small Business Reality"
date: 2025-11-28
preview: "When I started building the GST Invoicer, I had one rule: it should work completely without the internet. Not degrade gracefully. Not show a loading spinner. Work — completely."
keywords: "GST invoice, offline-first, PWA, IndexedDB, jsPDF, React, TypeScript, small business India, GST billing software, Prithiv Raj"
---

# GST Invoicer: Building Offline-First for India's Small Business Reality

When I started building the GST Invoicer, I had one rule: it should work completely without the internet. Not degrade gracefully. Not show a loading spinner. Work — completely, as if the internet had never been invented.

This rule came from watching how most small businesses in India actually operate. Connectivity isn't a given in a kitchen, a warehouse dock, or a shop floor that's been running since before smartphones existed. Forcing these businesses into a browser-based tool with a cloud dependency meant adding a failure mode to their day that wasn't there before.

The GST Invoicer is my solution to that. An offline-first, browser-based invoice generator built around India's GST tax structure. It runs as a Progressive Web App, stores everything locally with IndexedDB, generates PDFs without a server, and optionally syncs to Firebase if you want a backup you can access elsewhere.

---

## The Problem GST Created for Small Businesses

India's Goods and Services Tax system is well-designed in principle: one unified tax replacing a fractured system of state and central levies. In practice, it created paperwork discipline requirements that many small businesses weren't ready for. Every B2B transaction needs a proper GST invoice with the supplier's GSTIN, the buyer's GSTIN, HSN codes for each line item, and correctly computed CGST/SGST or IGST depending on whether the transaction crosses state lines.

For a business that was previously writing invoices by hand or using a basic template in Word, this is a significant shift. Most off-the-shelf accounting tools handle it, but they're either expensive, require permanent connectivity, or are so feature-heavy that the actual invoicing workflow gets buried.

What most small businesses need is simpler: a way to quickly generate a compliant GST invoice, store it locally, and print or share it as a PDF. That's what I built.

---

## Why Offline-First Changed the Architecture

Offline-first isn't just a UX decision — it changes how you think about every layer of the application.

**State lives in the browser, not the server.** With IndexedDB as the primary data store, the application treats the local browser database as the source of truth. Invoices, client records, product/service line items, company information — all of it is stored locally with Dexie.js, a clean wrapper around the IndexedDB API.

**The server is optional.** Firebase is there if you want cloud backup. But the application never requires it. There's no login gate at startup, no sync dependency before you can create an invoice. You install the PWA, open it, and start working.

**PDF generation happens in the browser.** Using jsPDF with html2canvas, the invoice renders as a styled HTML document in a hidden container and then gets captured as a PDF — no server-side rendering required. The output is a properly formatted A4 invoice with the company header, client details, line items, tax breakdown, and total.

---

## GST Calculation Logic

The tax logic is the part of the application that required the most careful design. GST has a few rules that seem simple but have edge cases:

**Intra-state vs inter-state transactions.** If the supplier and buyer are in the same state, the tax splits into CGST and SGST at equal rates. If they're in different states, IGST applies at the combined rate. The application determines this from the GSTIN prefix of both parties and handles the split automatically.

**Multiple tax slabs.** Different product categories attract different GST rates: 0%, 5%, 12%, 18%, and 28%. An invoice can have line items at multiple rates, and the tax summary needs to group them by slab.

**Reverse charge mechanism.** Some transactions put the tax liability on the buyer rather than the seller. The invoice needs to flag this when applicable.

The computation layer handles these as pure functions — no side effects, no server calls, no async operations. The tax totals are deterministic given the line items and the GSTIN details of both parties.

---

## The PWA Implementation

The Progressive Web App layer does more than just enable installation. The service worker caches the entire application shell on first load, which means subsequent opens — even with no connectivity — are indistinguishable from an online session.

The install prompt is surfaced when the browser detects the app hasn't been installed yet. Once installed, it launches in standalone mode, appears in the app drawer on Android, and behaves like a native application. There's no URL bar, no browser chrome, no confusion about whether you're looking at a website or a tool.

The cache strategy for the application assets uses a cache-first approach: serve from cache, update in the background when online. For the IndexedDB data, there's nothing to cache — it's already local.

---

## Optional Firebase Sync

The sync layer was the last thing I added, and I almost didn't add it at all.

The argument for it: people switch devices, reinstall their browser, or clear storage. Losing all your invoices because of a browser reset is a real failure mode for a business tool. A simple backup mechanism protects against that.

The argument against: adding Firebase meant adding a cloud dependency I'd promised to avoid. The compromise was to make it genuinely optional — with no sync, the application works identically. Sync requires an explicit account creation step, and the data is scoped to the user's UID in Firestore with security rules that prevent cross-user access.

The sync is one-directional for now: local writes push to Firebase. A full bidirectional sync with conflict resolution is planned but not yet built. For the current use case — one business, one primary device — the one-directional model is sufficient.

---

## What Shipping This Taught Me

**Offline-first is a commitment, not a feature.** The moment you treat offline support as an add-on, you end up with an application that works poorly in both modes. The only way to do it well is to design for offline from the start and treat online as an enhancement.

**Indian tax logic is genuinely complex.** The GST rules are clear in the documentation but have enough state — GSTIN prefixes, rate slabs, reverse charge flags — that getting the computation layer right takes real care. I ended up writing a fairly complete test suite for the tax calculations before I trusted the output.

**PWAs are underrated for tools like this.** The combination of local storage, service workers, and installability gives you native-like behavior in a web deployment model. For a small business tool with no IT department, that's exactly the right tradeoff.

---

The GST Invoicer is live at [app.ishvaryahospitality.com](https://app.ishvaryahospitality.com) and open for use. If you're building something similar for India's GST context, I'm happy to share the tax computation layer separately.
