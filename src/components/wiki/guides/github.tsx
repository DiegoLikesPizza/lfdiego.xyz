import { Check, CircleDot, Github, GitMerge, GitPullRequest, Zap } from "lucide-react";
import type { Guide } from "../types";
import {
  C,
  Callout,
  Card,
  Code,
  DataTable,
  Figure,
  Marker,
  Steps,
  Wide,
} from "../primitives";

function ForkDiagram() {
  const box = (x: number, y: number, title: string, sub: string, accent = false) => (
    <g>
      <rect
        x={x}
        y={y}
        width="220"
        height="70"
        rx="8"
        strokeWidth="1.5"
        className={accent ? "fill-accent-soft stroke-accent" : "fill-background stroke-border"}
      />
      <text x={x + 110} y={y + 30} fontSize="15" textAnchor="middle" className="fill-foreground font-heading font-semibold">
        {title}
      </text>
      <text x={x + 110} y={y + 52} fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        {sub}
      </text>
    </g>
  );

  return (
    <svg
      viewBox="0 0 640 320"
      className="h-auto w-full"
      role="img"
      aria-label="Fork workflow: 1, fork the upstream repository on GitHub into your account. 2, clone your fork to your machine. 3, push branches to your fork. 4, open a pull request from your fork to upstream. 5, fetch upstream to stay current."
    >
      <defs>
        <marker id="gh-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
        <marker id="gh-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
      </defs>

      {box(40, 60, "Upstream", "github.com/owner/project")}
      {box(380, 60, "Your fork", "github.com/you/project")}
      {box(210, 230, "Your machine", "~/code/project")}

      {/* 1 fork */}
      <path d="M262 95 H374" fill="none" strokeWidth="1.5" markerEnd="url(#gh-arrow)" className="stroke-foreground-subtle" />
      <text x="318" y="86" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        1 · fork
      </text>

      {/* 2 clone */}
      <path d="M470 132 L396 224" fill="none" strokeWidth="1.5" markerEnd="url(#gh-arrow)" className="stroke-foreground-subtle" />
      <text x="420" y="182" fontSize="11" textAnchor="end" className="fill-foreground-muted font-mono">
        2 · clone
      </text>

      {/* 3 push */}
      <path d="M426 228 L500 136" fill="none" strokeWidth="1.5" markerEnd="url(#gh-arrow)" className="stroke-foreground-subtle" />
      <text x="478" y="186" fontSize="11" className="fill-foreground-muted font-mono">
        3 · push
      </text>

      {/* 4 pull request */}
      <path d="M490 58 C490 10 150 10 150 54" fill="none" strokeWidth="2" markerEnd="url(#gh-arrow-accent)" className="stroke-accent" />
      <text x="320" y="48" fontSize="12" textAnchor="middle" className="fill-accent-hover font-mono">
        4 · pull request
      </text>

      {/* 5 fetch upstream */}
      <path d="M150 132 L246 226" fill="none" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#gh-arrow)" className="stroke-foreground-subtle" />
      <text x="186" y="182" fontSize="11" textAnchor="end" className="fill-foreground-muted font-mono">
        5 · fetch upstream
      </text>
    </svg>
  );
}

function PullRequestMock() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-border bg-background text-sm">
      <div className="px-5 pt-5">
        <p className="flex items-start gap-2 font-heading text-xl font-semibold text-foreground">
          <Marker n={1} />
          <span>
            Add dark mode toggle <span className="font-normal text-foreground-subtle">#42</span>
          </span>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-foreground-muted">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
            <GitPullRequest className="h-3.5 w-3.5" />
            Open
          </span>
          <Marker n={2} />
          <span>
            wants to merge 3 commits into <C>main</C> from <C>feature/dark-mode</C>
          </span>
        </div>
        <div className="mt-5 flex gap-5 overflow-x-auto border-b border-border font-mono text-xs text-foreground-muted">
          <span className="whitespace-nowrap border-b-2 border-accent pb-2 text-foreground">Conversation</span>
          <span className="whitespace-nowrap pb-2">Commits 3</span>
          <span className="whitespace-nowrap pb-2">Checks 2</span>
          <span className="whitespace-nowrap pb-2">Files changed 4</span>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="rounded-[8px] border border-border bg-surface p-4 text-foreground-muted">
          Adds a theme toggle to the header and remembers the choice.{" "}
          <span className="text-accent-hover">Closes #37.</span>
        </div>

        <div className="flex items-center gap-3 rounded-[8px] border border-border bg-surface p-4">
          <Marker n={3} />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background-secondary font-mono text-[0.65rem] text-foreground-muted">
            RV
          </span>
          <span className="text-foreground-muted">
            <span className="font-medium text-foreground">reviewer</span> approved these changes
          </span>
          <Check className="ml-auto h-4 w-4 text-accent" />
        </div>

        <div className="rounded-[8px] border border-border bg-surface">
          <p className="flex items-center gap-2 border-b border-border px-4 py-3 font-medium text-foreground">
            <Marker n={4} /> All checks have passed
          </p>
          {["CI / lint", "CI / build"].map((check) => (
            <p key={check} className="flex items-center gap-2 px-4 py-2 font-mono text-xs text-foreground-muted">
              <Check className="h-3.5 w-3.5 text-accent" /> {check}
              <span className="ml-auto text-foreground-subtle">passed</span>
            </p>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Marker n={5} />
          <span className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-accent px-4 py-2 font-medium text-accent-foreground">
            <GitMerge className="h-4 w-4" /> Squash and merge
          </span>
        </div>
      </div>
    </div>
  );
}

function WorkflowAnatomy() {
  const steps = [
    "actions/checkout — get the code",
    "actions/setup-node — install Node 20",
    "npm ci — install exact dependencies",
    "npm run lint",
    "npm run build",
  ];
  return (
    <div className="rounded-[8px] border border-border bg-background p-4 text-sm">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
        Workflow · .github/workflows/ci.yml
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-[8px] border border-accent/45 bg-accent-soft px-3 py-2 text-accent-hover">
        <Zap className="h-4 w-4" />
        <span className="font-mono text-xs">on: push to main · every pull request</span>
      </div>
      <div className="mt-3 rounded-[8px] border border-border bg-surface p-4">
        <p className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-heading font-semibold text-foreground">job: build</span>
          <span className="font-mono text-xs text-foreground-subtle">runs-on: ubuntu-latest</span>
        </p>
        <ol className="mt-3 space-y-2">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-3 rounded-[6px] border border-border bg-background px-3 py-2 font-mono text-xs text-foreground-muted">
              <span className="text-foreground-subtle">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-3 flex items-center gap-2 font-mono text-xs text-foreground-muted">
        <CircleDot className="h-3.5 w-3.5 text-accent" /> any step fails → the check turns red on the PR
      </p>
    </div>
  );
}

export const githubGuide: Guide = {
  slug: "github",
  title: "GitHub",
  kicker: "Collaboration",
  summary:
    "Where Git repositories live online: remotes, forks, pull requests and code review, and GitHub Actions to test and deploy on every push.",
  icon: Github,
  sections: [
    {
      id: "git-vs-github",
      label: "Git vs GitHub",
      title: "Git is the tool. GitHub is where your repository lives online.",
      lead: "Git works fine on its own, offline. GitHub adds a shared copy everyone can reach, plus the social layer around it.",
      content: (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card eyebrow="On your machine" title="Git">
              <ul className="mt-1 list-disc space-y-1.5 pl-5">
                <li>Tracks history, branches and merges.</li>
                <li>Works completely offline.</li>
                <li>Free, open source, made in 2005 for Linux.</li>
              </ul>
            </Card>
            <Card eyebrow="In the cloud" title="GitHub" accent>
              <ul className="mt-1 list-disc space-y-1.5 pl-5">
                <li>Hosts repositories as remotes.</li>
                <li>Pull requests, code review, Issues, Projects.</li>
                <li>Actions for CI/CD, Pages for static sites.</li>
              </ul>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Code
              title="Connect an existing repo"
              code={`
git remote add origin https://github.com/you/project.git
git push -u origin main   # -u remembers where to push
`}
            />
            <Code
              title="…or with the GitHub CLI"
              code={`
gh auth login
gh repo create project --public --source=. --push
`}
            />
          </div>
        </>
      ),
    },
    {
      id: "fork-clone",
      label: "Fork & clone",
      title: "Fork to contribute to a project you can’t push to.",
      lead: "A fork is your own copy on GitHub. You push there, then ask the original project to pull your changes in.",
      content: (
        <>
          <Figure title="The fork workflow">
            <Wide minWidth={560}>
              <ForkDiagram />
            </Wide>
          </Figure>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Code
              title="Fork, clone and stay current"
              code={`
gh repo fork owner/project --clone   # fork + clone in one go
git remote -v                        # origin = fork, upstream = original
git fetch upstream
git rebase upstream/main             # catch up before new work
`}
            />
            <Callout title="On your own team? Skip the fork">
              If you have write access to the repository, clone it directly and
              push branches to it. Forks are for projects you don’t own.
            </Callout>
          </div>
        </>
      ),
    },
    {
      id: "pull-requests",
      label: "Pull requests",
      title: "A pull request is a conversation about a branch.",
      lead: "It shows the diff, runs your checks, collects review comments — and updates itself every time you push to the branch.",
      content: (
        <>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <Steps
              items={[
                { title: "Branch", body: "One branch per change.", code: "git switch -c fix/empty-cart" },
                { title: "Commit & push", body: "Push the branch to GitHub.", code: "git push -u origin fix/empty-cart" },
                {
                  title: "Open the PR",
                  body: (
                    <>
                      Say what changed and why. Write <C>Closes #12</C> to close
                      the issue automatically on merge.
                    </>
                  ),
                  code: "gh pr create --fill",
                },
                { title: "Review & checks", body: "Answer comments by pushing more commits — the PR updates itself." },
                { title: "Merge", body: "Pick a merge method (see below), then delete the branch." },
                { title: "Clean up locally", body: "Get the merged main and drop the old branch.", code: "git switch main && git pull && git branch -d fix/empty-cart" },
              ]}
            />
            <Figure title="Anatomy of a pull request">
              <PullRequestMock />
              <ol className="mt-5 grid gap-2 text-sm text-foreground-muted sm:grid-cols-2">
                {[
                  "Title and number",
                  "Base ← compare branch",
                  "Reviews and approvals",
                  "Status checks (Actions)",
                  "Merge, once green",
                ].map((label, index) => (
                  <li key={label} className="flex items-center gap-2">
                    <Marker n={index + 1} /> {label}
                  </li>
                ))}
              </ol>
            </Figure>
          </div>
          <DataTable
            caption="GitHub merge methods"
            head={["Merge method", "Result on main", "Use when"]}
            rows={[
              ["Create a merge commit", "All branch commits + one merge commit", "You want the full, true history"],
              ["Squash and merge", "One single commit for the whole PR", "Branch commits are messy — the common default"],
              ["Rebase and merge", "Branch commits replayed, no merge commit", "Commits are already clean and meaningful"],
            ]}
          />
        </>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      title: "GitHub Actions run your scripts on every push.",
      lead: "A workflow is a YAML file in .github/workflows/. An event triggers it, it starts jobs on fresh machines, and each job runs its steps in order.",
      content: (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Figure title="How a workflow is built">
              <WorkflowAnatomy />
            </Figure>
            <Code
              title=".github/workflows/ci.yml"
              code={`
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run build
`}
            />
          </div>
          <Callout title="This site ships this way">
            Every push to main on lfdiego.xyz triggers a workflow that builds
            the static export and publishes it. Shipping a change is just{" "}
            <C>git push</C>.
          </Callout>
        </>
      ),
    },
    {
      id: "repo-essentials",
      label: "Repo essentials",
      title: "The files that make a repository easy to pick up.",
      content: (
        <>
          <DataTable
            caption="Common repository files"
            head={["File", "Why it’s there"]}
            rows={[
              [<C key="c">README.md</C>, "The front page: what it is, how to run it, how to contribute."],
              [<C key="c">LICENSE</C>, "Without one, nobody may legally reuse your code — even if it’s public."],
              [<C key="c">.gitignore</C>, "Keeps node_modules, build output and secrets out of the repo."],
              [<C key="c">.github/workflows/</C>, "Actions workflows: tests, linting, deploys."],
              [<C key="c">CONTRIBUTING.md</C>, "How to set up, branch naming, how PRs get reviewed."],
              [<C key="c">.github/ISSUE_TEMPLATE/</C>, "Forms that make bug reports actually useful."],
            ]}
          />
          <Callout tone="warn" title="Never commit secrets">
            Put API keys in repository secrets and read them in workflows as{" "}
            <C>{"${{ secrets.API_KEY }}"}</C>. If a key does get pushed, rotate
            it immediately — deleting the commit doesn’t help, it’s already
            been seen.
          </Callout>
        </>
      ),
    },
  ],
};
