# Organizations and Permissions

A personal account is fine for your own projects. For a company, a club or a group of collaborators, create an **organization**: repositories belong to the organization, not to one person who might leave.

## Personal repository permissions
On a repository owned by your personal account, invited collaborators get **write** access (push, merge PRs). Only the owner can change settings. For finer control, use an organization.

## Organization roles
| Role | Can |
|---|---|
| **Owner** | everything: billing, members, all repositories, delete the organization |
| **Member** | see the organization, get repository access via teams or directly |
| **Outside collaborator** | access only to specific repositories (freelancers, clients) |
| **Billing manager** | billing only |

Have at least **two owners**, so the organization survives one lost account.

## Repository roles
| Role | Typical person | Can |
|---|---|---|
| **Read** | stakeholders, clients | view, clone, open issues and comment |
| **Triage** | community helpers | manage issues and PRs (labels, close), no code |
| **Write** | developers | push branches, merge PRs (as rules allow) |
| **Maintain** | leads | manage the repository without destructive settings |
| **Admin** | owners of the project | everything, including settings, rules, deletion |

Give the **least** role that works. Branch rulesets apply to everyone with write access, so "write" doesn't mean "can push to main" ([[github/Protecting Main]]).

## Teams
Teams group members (`@shop-org/backend`, `@shop-org/design`):
- grant a team access to repositories once, instead of person by person,
- mention a team in issues and PRs,
- use teams in CODEOWNERS ([[github/Code Review]]),
- nested teams inherit parent access.

## Plans in short
| Plan | Adds |
|---|---|
| **Free** | unlimited public/private repositories, 2,000 Actions minutes/month, basic features |
| **Team** | branch rules/rulesets and required code owner reviews on **private** repositories, more Actions minutes and Packages storage |
| **Enterprise** | SSO/SAML, audit log streaming, enterprise-wide policies, GitHub Advanced Security add-on |

## A setup for a small agency
For a two-person business building client websites:
- One organization (e.g. `hecker-goettler`), both founders as **owners**.
- One private repository per client project, created from a **template** repository with CI and deploy workflow ([[github/Creating a Repository]]).
- Clients as **outside collaborators** with **read** access if they want to see progress, or none.
- Organization secrets for shared deploy credentials, environment secrets for per-site production keys ([[github/Secrets and Environments]]).
- A Project board across all client repositories for the week's work ([[github/Issues and Projects]]).

## Offboarding
When someone leaves: remove them from the organization (their forks of private repositories are deleted), rotate any secrets they knew, and check deploy keys and personal access tokens they created. The audit log (*Settings → Audit log*) shows who did what.
