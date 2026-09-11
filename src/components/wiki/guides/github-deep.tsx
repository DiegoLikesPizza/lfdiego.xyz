import { Check, KeyRound, Lock, MessageSquare, ShieldCheck } from "lucide-react";
import type { GuideSection } from "../types";
import {
  C,
  Callout,
  Card,
  Chip,
  Code,
  DataTable,
  Figure,
  Glossary,
  Pipeline,
  Steps,
  Wide,
} from "../primitives";
import { cn } from "@/lib/utils";

function KeyPair() {
  return (
    <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <div className="rounded-[8px] border border-accent/50 bg-accent-soft p-4">
        <p className="flex items-center gap-2 font-heading font-semibold text-foreground">
          <Lock className="h-4 w-4 text-accent" /> Your machine
        </p>
        <p className="mt-2 font-mono text-sm text-foreground">~/.ssh/id_ed25519</p>
        <p className="mt-1 text-xs text-accent-hover">private key — never leaves this computer</p>
      </div>
      <div className="flex flex-col items-center gap-1 text-center font-mono text-[0.7rem] text-foreground-muted">
        <span>signs a challenge</span>
        <span className="text-accent">⇄</span>
        <span>GitHub verifies</span>
      </div>
      <div className="rounded-[8px] border border-border bg-background p-4">
        <p className="flex items-center gap-2 font-heading font-semibold text-foreground">
          <KeyRound className="h-4 w-4 text-foreground-muted" /> GitHub
        </p>
        <p className="mt-2 font-mono text-sm text-foreground">id_ed25519.pub</p>
        <p className="mt-1 text-xs text-foreground-muted">public key — safe to share, pasted into Settings</p>
      </div>
    </div>
  );
}

const board = [
  {
    column: "Todo",
    cards: [
      { n: 51, title: "Add password reset", labels: ["feature"] },
      { n: 48, title: "Cart total shows NaN", labels: ["bug", "good first issue"] },
    ],
  },
  { column: "In progress", cards: [{ n: 44, title: "Dark mode toggle", labels: ["feature"] }] },
  { column: "In review", cards: [{ n: 42, title: "Speed up search", labels: ["performance"] }] },
  {
    column: "Done",
    cards: [
      { n: 37, title: "Fix mobile nav", labels: ["bug"] },
      { n: 35, title: "Upgrade to Node 22", labels: ["chore"] },
    ],
  },
];

function ProjectBoard() {
  return (
    <Wide minWidth={680}>
      <div className="grid grid-cols-4 gap-3">
        {board.map((col) => (
          <div key={col.column} className="rounded-[8px] border border-border bg-background p-3">
            <p className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.12em] text-foreground-subtle">
              {col.column}
              <span>{col.cards.length}</span>
            </p>
            <ul className="mt-3 space-y-2">
              {col.cards.map((card) => (
                <li key={card.n} className="rounded-[6px] border border-border bg-surface p-2.5">
                  <p className="text-sm text-foreground">{card.title}</p>
                  <p className="mt-1 font-mono text-[0.68rem] text-foreground-subtle">#{card.n}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {card.labels.map((label) => (
                      <span
                        key={label}
                        className={cn(
                          "rounded-full border px-1.5 py-0.5 font-mono text-[0.6rem]",
                          label === "bug" ? "border-accent/50 text-accent-hover" : "border-border text-foreground-muted",
                        )}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Wide>
  );
}

const diffLines = [
  { type: "ctx", text: "export function total(items) {" },
  { type: "del", text: "  let sum = 0;" },
  { type: "del", text: "  for (const i of items) sum += i.price;" },
  { type: "del", text: "  return sum;" },
  { type: "add", text: "  return items.reduce((s, i) => s + i.price, 0);" },
  { type: "ctx", text: "}" },
];

function ReviewMock() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-border bg-background">
      <p className="border-b border-border bg-background-secondary px-4 py-2 font-mono text-xs text-foreground-muted">
        src/cart.js
      </p>
      <pre className="overflow-x-auto py-2 font-mono text-[0.76rem] leading-relaxed">
        <code className="block min-w-max">
          {diffLines.map((line, index) => (
            <span
              key={index}
              className={cn(
                "flex gap-3 px-4",
                line.type === "del" && "bg-foreground/[0.06] text-foreground-subtle",
                line.type === "add" && "bg-accent-soft text-foreground",
                line.type === "ctx" && "text-foreground-muted",
              )}
            >
              <span className="w-3 select-none">{line.type === "del" ? "−" : line.type === "add" ? "+" : " "}</span>
              <span className="whitespace-pre">{line.text}</span>
            </span>
          ))}
        </code>
      </pre>
      <div className="m-3 rounded-[8px] border border-border bg-surface p-3 text-sm">
        <p className="flex items-center gap-2 text-foreground-muted">
          <MessageSquare className="h-4 w-4" />
          <span className="font-medium text-foreground">reviewer</span> commented on line 5
        </p>
        <p className="mt-2 text-foreground-muted">Nice simplification. Could we name the accumulator for readability?</p>
        <div className="mt-3 overflow-hidden rounded-[6px] border border-border">
          <p className="border-b border-border bg-background-secondary px-3 py-1.5 font-mono text-[0.68rem] text-foreground-subtle">
            Suggested change
          </p>
          <pre className="overflow-x-auto bg-accent-soft px-3 py-2 font-mono text-[0.74rem] text-foreground">
            {"+  return items.reduce((sum, item) => sum + item.price, 0);"}
          </pre>
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-[6px] border border-border px-2.5 py-1 text-xs text-foreground">
          <Check className="h-3.5 w-3.5 text-accent" /> Commit suggestion
        </span>
      </div>
    </div>
  );
}

function JobGraph() {
  const box = (x: number, y: number, w: number, title: string, sub: string, accent = false) => (
    <g>
      <rect x={x} y={y} width={w} height="46" rx="8" strokeWidth="1.5" className={accent ? "fill-accent-soft stroke-accent" : "fill-background stroke-border"} />
      <text x={x + w / 2} y={y + 20} fontSize="13" textAnchor="middle" className="fill-foreground font-heading font-semibold">
        {title}
      </text>
      <text x={x + w / 2} y={y + 36} fontSize="10" textAnchor="middle" className="fill-foreground-muted font-mono">
        {sub}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 640 200"
      className="h-auto w-full"
      role="img"
      aria-label="Job graph: lint and test run in parallel. build needs both. deploy needs build and runs in the production environment, only on main."
    >
      <defs>
        <marker id="gh-job-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
      </defs>
      {box(20, 30, 130, "lint", "~20 s")}
      {box(20, 124, 130, "test", "matrix · 6 jobs")}
      {box(250, 77, 140, "build", "needs: [lint, test]")}
      {box(470, 77, 150, "deploy", "environment: production", true)}
      <path d="M150 53 C200 53 200 100 244 100" fill="none" strokeWidth="1.5" markerEnd="url(#gh-job-arrow)" className="stroke-foreground-subtle" />
      <path d="M150 147 C200 147 200 100 244 100" fill="none" strokeWidth="1.5" markerEnd="url(#gh-job-arrow)" className="stroke-foreground-subtle" />
      <path d="M390 100 H464" fill="none" strokeWidth="1.5" markerEnd="url(#gh-job-arrow)" className="stroke-foreground-subtle" />
      <text x="428" y="92" fontSize="10" textAnchor="middle" className="fill-foreground-subtle font-mono">
        on main
      </text>
      <text x="85" y="104" fontSize="10" textAnchor="middle" className="fill-foreground-subtle font-mono">
        in parallel
      </text>
    </svg>
  );
}

function MatrixGrid() {
  const nodes = [20, 22, 24];
  const oses = ["ubuntu-latest", "windows-latest"];
  return (
    <Wide minWidth={420}>
      <div className="grid grid-cols-[8rem_repeat(3,minmax(0,1fr))] gap-2 font-mono text-xs">
        <span />
        {nodes.map((n) => (
          <span key={n} className="text-center text-foreground-subtle">
            node {n}
          </span>
        ))}
        {oses.map((os) => (
          <div key={os} className="contents">
            <span className="self-center text-foreground-subtle">{os}</span>
            {nodes.map((n) => (
              <span key={n} className="flex items-center justify-center gap-1.5 rounded-[6px] border border-accent/40 bg-accent-soft py-2 text-accent-hover">
                <Check className="h-3.5 w-3.5" /> test
              </span>
            ))}
          </div>
        ))}
      </div>
    </Wide>
  );
}

function Semver() {
  const parts = [
    { value: "2", name: "MAJOR", when: "Breaking changes — users must update their code." },
    { value: "4", name: "MINOR", when: "New features that don’t break anything." },
    { value: "1", name: "PATCH", when: "Bug fixes only." },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {parts.map((part, index) => (
          <div key={part.name} className={cn("rounded-[8px] border p-4", index === 0 ? "border-accent/50 bg-accent-soft" : "border-border bg-background")}>
            <p className="font-heading text-4xl font-semibold text-foreground">{part.value}</p>
            <p className="mt-2 font-mono text-xs tracking-[0.12em] text-accent-hover">{part.name}</p>
            <p className="mt-1 text-sm text-foreground-muted">{part.when}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-foreground-muted">
        <Chip>2.4.1</Chip> → fix → <Chip>2.4.2</Chip> → feature → <Chip>2.5.0</Chip> → breaking →{" "}
        <Chip tone="solid">3.0.0</Chip>
      </div>
    </div>
  );
}

export const githubDeepSections: GuideSection[] = [
  {
    id: "authentication",
    label: "Authentication",
    title: "Prove who you are: HTTPS with a credential helper, or SSH keys.",
    lead: "GitHub stopped accepting account passwords for Git years ago. Either let the GitHub CLI or Git Credential Manager handle HTTPS tokens for you, or set up an SSH key once.",
    content: (
      <>
        <Figure title="How an SSH key works">
          <KeyPair />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Option A — SSH key"
            code={`
ssh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub     # copy → GitHub → Settings → SSH and GPG keys
ssh -T git@github.com         # "Hi you! You've successfully authenticated"
git remote set-url origin git@github.com:you/project.git
`}
          />
          <Code
            title="Option B — HTTPS via the GitHub CLI"
            code={`
gh auth login                 # pick HTTPS, log in through the browser
gh auth setup-git             # Git now asks gh for credentials
gh auth status                # check which account you're using
`}
          />
        </div>
        <DataTable
          caption="Ways to authenticate with GitHub"
          head={["Method", "Good for", "Watch out"]}
          rows={[
            ["gh / Git Credential Manager (HTTPS)", "Most people — works everywhere, even behind strict firewalls", "Log in again if the token expires"],
            ["SSH key", "Developers on their own machines", "Protect the private key with a passphrase"],
            ["Fine-grained personal access token", "Scripts and tools that need limited access to specific repos", "Give it an expiry and the fewest permissions; never commit it"],
            ["GITHUB_TOKEN in Actions", "Workflows acting on their own repository", "Set permissions: to the minimum the job needs"],
          ]}
        />
      </>
    ),
  },
  {
    id: "code-review",
    label: "Code review",
    title: "Review the change, not the person.",
    lead: "A good review catches bugs, spreads knowledge, and keeps the codebase consistent — without turning into an argument about taste.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Figure title="An inline comment with a suggestion">
            <ReviewMock />
          </Figure>
          <div className="space-y-6">
            <DataTable
              caption="Review outcomes"
              head={["Submit as", "Means"]}
              rows={[
                ["Comment", "Feedback, no verdict yet"],
                ["Approve", "Good to merge (possibly after small nits)"],
                ["Request changes", "Must be addressed before merging"],
              ]}
            />
            <Callout title="Suggestion blocks">
              In a review comment, wrap replacement code in a{" "}
              <C>```suggestion</C> block. The author can apply it with one
              click, and it becomes a commit on their branch.
            </Callout>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card eyebrow="As the author" title="Make it easy to review">
            <ul className="mt-1 list-disc space-y-1.5 pl-5">
              <li>Keep PRs small — under ~400 changed lines gets real attention.</li>
              <li>Explain why in the description; add screenshots for UI.</li>
              <li>Review your own diff first. Remove debug code.</li>
              <li>Reply to every comment, even if it’s just “done”.</li>
            </ul>
          </Card>
          <Card eyebrow="As the reviewer" title="Be useful and kind" accent>
            <ul className="mt-1 list-disc space-y-1.5 pl-5">
              <li>Ask questions: “What happens if the list is empty?”</li>
              <li>Label optional feedback with “nit:”.</li>
              <li>Let linters and formatters argue about style.</li>
              <li>Point out what’s good, too.</li>
            </ul>
          </Card>
        </div>
        <Code
          title=".github/CODEOWNERS — request the right reviewers automatically"
          code={`
*                 @you                  # default owner for everything
/docs/            @your-org/docs        # a team owns the docs
*.kt              @your-org/android
/.github/         @your-org/platform    # workflow changes need platform review
`}
        />
      </>
    ),
  },
  {
    id: "issues-projects",
    label: "Issues & Projects",
    title: "Issues track the work. Projects show where it stands.",
    lead: "An issue is a bug, a feature idea or a task, with a discussion thread. Labels categorise it, milestones group it, and a Project board shows it moving to done.",
    content: (
      <>
        <Figure title="A Project board" note="Issues and PRs as cards">
          <ProjectBoard />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card title="Link PRs to issues">
              Write one of these in a pull request description and the issue
              closes automatically when the PR merges into the default branch:
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["closes #12", "fixes #12", "resolves #12"].map((k) => (
                  <Chip key={k} tone="accent">
                    {k}
                  </Chip>
                ))}
              </div>
              <p className="mt-3">
                Just mentioning <C>#12</C> links them without closing.
              </p>
            </Card>
            <Card title="A good bug report has">
              <ul className="mt-1 list-disc space-y-1.5 pl-5">
                <li>Steps to reproduce, numbered.</li>
                <li>What you expected vs. what happened.</li>
                <li>Version, browser or OS, and any error output.</li>
                <li>A screenshot or a minimal code sample.</li>
              </ul>
            </Card>
          </div>
          <Code
            title=".github/ISSUE_TEMPLATE/bug.yml — an issue form"
            code={`
name: Bug report
description: Something isn't working
labels: [bug]
body:
  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      placeholder: "1. Go to /cart  2. Remove the last item"
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: What did you expect, and what happened instead?
  - type: input
    id: version
    attributes:
      label: Version
`}
          />
        </div>
      </>
    ),
  },
  {
    id: "protecting-main",
    label: "Protecting main",
    title: "Rules make the safe path the only path.",
    lead: "Branch rulesets (Settings → Rules) stop anyone — including you on a bad day — from pushing broken or unreviewed code straight to main.",
    content: (
      <>
        <Figure title="What has to be true before a merge">
          <Pipeline
            nodes={[
              { title: "Pull request", sub: "no direct pushes" },
              { title: "Checks pass", sub: "lint, tests, build" },
              { title: "Approved", sub: "1+ reviews, conversations resolved" },
              { title: "Merge allowed", sub: "squash into main", accent: true },
            ]}
            links={[{ forward: "CI runs" }, { forward: "review" }, { forward: "all green" }]}
          />
        </Figure>
        <DataTable
          caption="Useful branch rules"
          head={["Rule", "What it prevents"]}
          rows={[
            ["Require a pull request before merging", "Pushing straight to main"],
            ["Require approvals", "Merging code nobody else has read"],
            ["Require status checks to pass", "Merging a red build"],
            ["Require branches to be up to date", "Checks that passed against an old main"],
            ["Require conversation resolution", "Merging with open review threads"],
            ["Require linear history", "Merge commits on main (forces squash or rebase)"],
            ["Block force pushes & deletions", "Rewriting or deleting main"],
            ["Merge queue", "Busy repos where PRs keep going stale while waiting"],
          ]}
        />
      </>
    ),
  },
  {
    id: "actions-in-depth",
    label: "Actions in depth",
    title: "Matrices, job graphs, caches, secrets and environments.",
    lead: "Once the basic workflow runs, a few features make it faster, broader and safer.",
    content: (
      <>
        <DataTable
          caption="GitHub Actions vocabulary"
          head={["Term", "Meaning"]}
          rows={[
            ["workflow", "A YAML file in .github/workflows/ — one automated process."],
            ["event", "What starts it: push, pull_request, schedule, workflow_dispatch (manual), release…"],
            ["job", "A group of steps on one fresh runner. Jobs run in parallel unless linked with needs."],
            ["step", "One command (run:) or one reusable action (uses:)."],
            ["runner", "The machine: GitHub-hosted ubuntu/windows/macos, or self-hosted."],
            ["action", "A reusable step, e.g. actions/checkout, published in a repo."],
            ["artifact", "Files a job uploads for later jobs or for download (build output, reports)."],
            ["secret", "An encrypted value injected at runtime, masked in logs."],
            ["environment", "A deploy target with its own secrets, required reviewers and wait timers."],
          ]}
        />
        <div className="grid grid-cols-1 gap-6">
          <Figure title="Jobs depend on each other with needs">
            <div className="mx-auto max-w-[760px]">
              <Wide minWidth={520}>
                <JobGraph />
              </Wide>
            </div>
          </Figure>
          <Figure title="A matrix fans one job out" note="2 × 3 = 6 jobs">
            <MatrixGrid />
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              Every combination runs in parallel, so one workflow proves your
              code works on each OS and Node version.
            </p>
          </Figure>
        </div>
        <Code
          title=".github/workflows/ci.yml — matrix, cache, needs, environment"
          code={`
name: CI
on:
  push:
    branches: [main]
  pull_request:

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true          # a new push cancels the old run

permissions:
  contents: read                    # least privilege for GITHUB_TOKEN

jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [20, 22, 24]
    runs-on: \${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
          cache: npm                # reuse downloaded packages between runs
      - run: npm ci
      - run: npm test

  deploy:
    needs: [test]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production         # can require a manual approval
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/deploy.sh
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}
`}
        />
        <Callout tone="warn" title="Workflow security basics">
          Set <C>permissions</C> to the minimum. Pin third-party actions to a
          full commit SHA rather than a moving tag. Don’t expose secrets to
          workflows that run code from forks — be especially careful with{" "}
          <C>pull_request_target</C>.
        </Callout>
      </>
    ),
  },
  {
    id: "releases-pages",
    label: "Releases & Pages",
    title: "Version your releases; host static sites for free.",
    content: (
      <>
        <Figure title="Semantic versioning" note="MAJOR.MINOR.PATCH">
          <Semver />
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Cut a release"
            code={`
git tag -a v2.5.0 -m "v2.5.0"
git push origin v2.5.0
gh release create v2.5.0 --generate-notes   # notes built from merged PRs
gh release upload v2.5.0 dist/app.zip       # attach build files
`}
          />
          <Card title="GitHub Pages in three steps">
            <ol className="mt-1 list-decimal space-y-1.5 pl-5">
              <li>Build your site to static files (HTML, CSS, JS).</li>
              <li>Settings → Pages → choose a branch, or deploy from an Actions workflow.</li>
              <li>
                It’s served at <C>you.github.io/repo</C> — add a custom domain
                if you like.
              </li>
            </ol>
            <p className="mt-3">
              Pages only serves static files — no server code. Frameworks with
              a static export (like Next.js <C>output: &apos;export&apos;</C>) work well.
            </p>
          </Card>
        </div>
      </>
    ),
  },
  {
    id: "security",
    label: "Security features",
    title: "Let GitHub watch your dependencies and secrets.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Dependabot alerts", body: "Warns when a dependency has a known vulnerability." },
            { title: "Dependabot updates", body: "Opens PRs to bump outdated or vulnerable packages." },
            { title: "Secret scanning", body: "Detects committed keys; push protection blocks the push before it lands." },
            { title: "Code scanning", body: "CodeQL analyses your code for security bugs on every PR." },
          ].map((item) => (
            <div key={item.title} className="rounded-[var(--radius)] border border-border bg-surface p-5">
              <ShieldCheck className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <p className="mt-3 font-heading font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title=".github/dependabot.yml"
            code={`
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    groups:
      minor-and-patch:
        update-types: [minor, patch]   # one PR instead of twenty
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
`}
          />
          <Callout title="Add a SECURITY.md">
            Tell people how to report a vulnerability privately instead of in a
            public issue. Enabling private vulnerability reporting gives them a
            button for it.
          </Callout>
        </div>
      </>
    ),
  },
  {
    id: "gh-cli",
    label: "GitHub CLI",
    title: "Do most of GitHub without leaving the terminal.",
    content: (
      <DataTable
        caption="Useful GitHub CLI commands"
        head={["Command", "What it does"]}
        rows={[
          [<C key="c">gh repo clone owner/repo</C>, "Clone using your authenticated account"],
          [<C key="c">gh pr create --fill --draft</C>, "Open a draft PR from the current branch"],
          [<C key="c">gh pr list --author @me</C>, "Your open pull requests"],
          [<C key="c">gh pr checkout 42</C>, "Check out someone’s PR locally to test it"],
          [<C key="c">gh pr review 42 --approve</C>, "Approve from the terminal"],
          [<C key="c">gh pr merge --squash --delete-branch</C>, "Squash-merge and clean up"],
          [<C key="c">gh issue create --label bug</C>, "File an issue interactively"],
          [<C key="c">gh run watch</C>, "Follow a workflow run live"],
          [<C key="c">gh run view --log-failed</C>, "Show only the logs of failed steps"],
          [<C key="c">gh browse</C>, "Open the repo (or a file) in the browser"],
          [<C key="c">gh api repos/{"{owner}"}/{"{repo}"}/pulls</C>, "Call any REST API endpoint, authenticated"],
        ]}
      />
    ),
  },
  {
    id: "open-source",
    label: "Contributing to open source",
    title: "Your first contribution, step by step.",
    lead: "Maintainers are volunteers with limited time. Following the project’s process is the fastest way to get merged.",
    content: (
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Steps
          items={[
            { title: "Find an issue", body: "Filter by labels like good first issue or help wanted. Check nobody is already on it." },
            { title: "Read CONTRIBUTING.md", body: "Setup, code style, test commands, commit message rules, and whether a CLA is needed." },
            { title: "Say you’re working on it", body: "A short comment avoids duplicate work — and maintainers can steer you early." },
            { title: "Fork, branch, change", body: "Keep it focused on that one issue. Add or update tests.", code: "gh repo fork owner/project --clone" },
            { title: "Open a clear PR", body: "Link the issue, explain the change, and make sure checks pass." },
            { title: "Iterate patiently", body: "Respond to review, push fixes to the same branch, and give maintainers time." },
          ]}
        />
        <div className="space-y-6">
          <Callout title="Not just code">
            Documentation fixes, reproducing bugs, answering questions in
            issues and improving tests are all real, valued contributions — and
            a great way to learn a codebase.
          </Callout>
          <Callout tone="warn" title="Before a big change, ask first">
            Open an issue or discussion describing the idea. A large, unasked-for
            PR that doesn’t fit the project’s direction is likely to be closed,
            however good the code.
          </Callout>
        </div>
      </div>
    ),
  },
  {
    id: "glossary",
    label: "Glossary",
    title: "GitHub words, in one place.",
    content: (
      <Glossary
        terms={[
          { term: "repository (repo)", def: "A project on GitHub: code, history, issues, PRs and settings." },
          { term: "fork", def: "Your own copy of someone else’s repository under your account." },
          { term: "clone", def: "A local copy of a repository on your machine." },
          { term: "pull request (PR)", def: "A proposal to merge one branch into another, with review and checks." },
          { term: "draft PR", def: "A PR marked as not ready for review yet." },
          { term: "review", def: "Comments plus a verdict: comment, approve or request changes." },
          { term: "status check", def: "A pass/fail result reported on a commit, usually from Actions." },
          { term: "issue", def: "A tracked bug, task or idea with a discussion thread." },
          { term: "label", def: "A tag used to categorise issues and PRs." },
          { term: "milestone", def: "A group of issues and PRs targeting a release or date." },
          { term: "Project", def: "A board or table view that tracks issues and PRs across repos." },
          { term: "Actions", def: "GitHub’s built-in CI/CD that runs workflows on events." },
          { term: "runner", def: "The machine that executes a workflow job." },
          { term: "secret", def: "An encrypted value available to workflows, hidden from logs." },
          { term: "ruleset", def: "Rules that protect branches or tags, like required reviews." },
          { term: "CODEOWNERS", def: "A file mapping paths to the people or teams who must review them." },
          { term: "release", def: "A tagged version with notes and optional downloadable files." },
          { term: "Pages", def: "Free static-site hosting straight from a repository." },
          { term: "Dependabot", def: "Automated dependency vulnerability alerts and update PRs." },
          { term: "gh", def: "The official GitHub command-line tool." },
        ]}
      />
    ),
  },
];
