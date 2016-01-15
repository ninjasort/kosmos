# Kosmos Design

### Why
- We no longer just want to build static websites, but static applications.
- We need the benefits of static site generation for performance and SEO combined with the benefits of client-side javascript.
- We need a framework to separate concerns surrounding static isomorphic applications.
- We need a lighting fast development workflow that provides tools for scaffolding and bundling.
- We need the flexibility of a plugin architecture.

### How

- Create adapter for content/data to be collected (statically, or from an API)
- Pass this data as the intial state for a redux store
- Render content into components via props