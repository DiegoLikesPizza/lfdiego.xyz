import { GitBranch } from "lucide-react";
import type { Guide } from "../types";
import {
  C,
  Callout,
  Card,
  Code,
  DataTable,
  Figure,
  Pipeline,
  Wide,
} from "../primitives";

const mainCommits = [
  { x: 110, hash: "a1f" },
  { x: 200, hash: "b7c" },
  { x: 380, hash: "e42" },
];
const featureCommits = [
  { x: 290, hash: "f03" },
  { x: 470, hash: "f9d" },
];

function BranchGraph() {
  return (
    <svg
      viewBox="0 0 640 190"
      className="h-auto w-full"
      role="img"
      aria-label="Commit graph: a feature branch splits off main after commit b7c, gets two commits while main gets one, then merges back in merge commit m90, where HEAD points."
    >
      <text x="20" y="64" fontSize="12" className="fill-foreground-subtle font-mono">
        main
      </text>
      <text x="20" y="144" fontSize="12" className="fill-accent-hover font-mono">
        feature
      </text>

      <path d="M110 60 H560" fill="none" strokeWidth="2" className="stroke-foreground-subtle" />
      <path
        d="M200 60 C245 60 245 140 290 140 H470 C515 140 515 60 560 60"
        fill="none"
        strokeWidth="2"
        className="stroke-accent"
      />

      {mainCommits.map((commit) => (
        <g key={commit.hash}>
          <circle cx={commit.x} cy="60" r="9" strokeWidth="2" className="fill-surface stroke-foreground" />
          <text x={commit.x} y="36" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
            {commit.hash}
          </text>
        </g>
      ))}
      {featureCommits.map((commit) => (
        <g key={commit.hash}>
          <circle cx={commit.x} cy="140" r="9" strokeWidth="2" className="fill-surface stroke-accent" />
          <text x={commit.x} y="172" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
            {commit.hash}
          </text>
        </g>
      ))}

      <circle cx="560" cy="60" r="10" strokeWidth="2" className="fill-accent stroke-accent" />
      <text x="560" y="36" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        m90
      </text>

      <rect x="582" y="49" width="50" height="22" rx="4" className="fill-foreground" />
      <text x="607" y="64" fontSize="11" textAnchor="middle" className="fill-background font-mono">
        HEAD
      </text>
    </svg>
  );
}

function MergeGraph() {
  return (
    <svg
      viewBox="0 0 300 150"
      className="h-auto w-full"
      role="img"
      aria-label="Merge: history keeps its fork shape and gains a merge commit M joining E and F2."
    >
      <path d="M30 45 H270" fill="none" strokeWidth="2" className="stroke-foreground-subtle" />
      <path d="M90 45 C115 45 115 110 140 110 H210 C240 110 240 45 270 45" fill="none" strokeWidth="2" className="stroke-accent" />
      {[
        { x: 30, label: "A" },
        { x: 90, label: "B" },
        { x: 170, label: "E" },
      ].map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy="45" r="8" strokeWidth="2" className="fill-surface stroke-foreground" />
          <text x={c.x} y="24" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
            {c.label}
          </text>
        </g>
      ))}
      {[
        { x: 140, label: "F1" },
        { x: 210, label: "F2" },
      ].map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy="110" r="8" strokeWidth="2" className="fill-surface stroke-accent" />
          <text x={c.x} y="138" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
            {c.label}
          </text>
        </g>
      ))}
      <circle cx="270" cy="45" r="9" strokeWidth="2" className="fill-accent stroke-accent" />
      <text x="270" y="24" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        M
      </text>
    </svg>
  );
}

function RebaseGraph() {
  return (
    <svg
      viewBox="0 0 300 150"
      className="h-auto w-full"
      role="img"
      aria-label="Rebase: one straight line A, B, E, then F1 prime and F2 prime — the feature commits are replayed on top of E as new commits."
    >
      <path d="M30 75 H130" fill="none" strokeWidth="2" className="stroke-foreground-subtle" />
      <path d="M130 75 H250" fill="none" strokeWidth="2" className="stroke-accent" />
      {[
        { x: 30, label: "A" },
        { x: 80, label: "B" },
        { x: 130, label: "E" },
      ].map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy="75" r="8" strokeWidth="2" className="fill-surface stroke-foreground" />
          <text x={c.x} y="104" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
            {c.label}
          </text>
        </g>
      ))}
      {[
        { x: 190, label: "F1′" },
        { x: 250, label: "F2′" },
      ].map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy="75" r="8" strokeWidth="2" className="fill-surface stroke-accent" />
          <text x={c.x} y="104" fontSize="11" textAnchor="middle" className="fill-accent-hover font-mono">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export const gitGuide: Guide = {
  slug: "git",
  title: "Git",
  kicker: "Version control",
  summary:
    "How Git thinks about your files, the handful of commands you type every day, branches, merge vs rebase, and how to undo almost anything.",
  icon: GitBranch,
  sections: [
    {
      id: "mental-model",
      label: "Mental model",
      title: "Every change travels the same four stops.",
      lead: "You edit files, pick what goes into the next snapshot, record it, and push it somewhere others can see it. Almost every Git command moves work one stop forward or back.",
      content: (
        <>
          <Figure title="Where a change lives" note="→ forward · ← back">
            <Pipeline
              nodes={[
                { title: "Working directory", sub: "the files you edit" },
                { title: "Staging area", sub: "what goes in the next commit" },
                { title: "Local repository", sub: "every commit, inside .git/" },
                { title: "Remote", sub: "origin — e.g. GitHub", accent: true },
              ]}
              links={[
                { forward: "git add", back: "git restore --staged" },
                { forward: "git commit", back: "git reset --soft HEAD~1" },
                { forward: "git push", back: "git pull" },
              ]}
            />
          </Figure>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Callout title="A commit is a snapshot, not a diff">
              Each commit records the whole project as it was — unchanged files
              are shared, so it stays small. Diffs are worked out when you ask
              for them, which is why Git is fast at switching between versions.
            </Callout>
            <Code
              title="One-time setup"
              code={`
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
`}
            />
          </div>
        </>
      ),
    },
    {
      id: "daily-loop",
      label: "Daily loop",
      title: "The five commands you’ll type every day.",
      lead: "Check what changed, stage it, commit it, catch up with everyone else, share. Everything else is occasional.",
      content: (
        <>
          <Code
            title="The loop"
            code={`
git status                    # what changed?
git add src/cart.ts           # stage one file (or everything: git add .)
git commit -m "Fix crash when cart is empty"
git pull --rebase             # get teammates' work first
git push                      # share your commits
`}
          />
          <DataTable
            caption="Other everyday Git commands"
            head={["Command", "What it does"]}
            rows={[
              [<C key="c">git clone &lt;url&gt;</C>, "Copy a remote repository, with its full history, to your machine."],
              [<C key="c">git diff</C>, "Show unstaged changes. Add --staged to see what you’re about to commit."],
              [<C key="c">git log --oneline --graph</C>, "Compact history, with branches drawn as lines."],
              [<C key="c">git show &lt;commit&gt;</C>, "What exactly changed in one commit."],
              [<C key="c">git stash</C>, "Park unfinished changes; git stash pop brings them back."],
              [<C key="c">git blame &lt;file&gt;</C>, "Which commit last touched each line — and why."],
            ]}
          />
        </>
      ),
    },
    {
      id: "branches",
      label: "Branches",
      title: "A branch is just a movable label on a commit.",
      lead: "Creating one is instant and free. Keep main releasable, do your work on a branch, and merge it back when it’s done.",
      content: (
        <>
          <Figure title="A feature branch, start to merge">
            <Wide minWidth={560}>
              <BranchGraph />
            </Wide>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-foreground-muted">
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-foreground" /> commit on main
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-accent" /> commit on the branch
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent" /> merge commit
              </li>
            </ul>
          </Figure>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Code
              title="Branch, work, merge"
              code={`
git switch -c feature/login   # create a branch and move onto it
# ...commit as usual...
git switch main
git merge feature/login       # bring the work back
git branch -d feature/login   # tidy up
`}
            />
            <Callout title="What is HEAD?">
              HEAD is “where you are now” — normally the branch you have checked
              out. Every new commit moves that branch label (and HEAD with it)
              forward by one.
            </Callout>
          </div>
        </>
      ),
    },
    {
      id: "merge-vs-rebase",
      label: "Merge vs rebase",
      title: "Two ways to combine work — same code, different history.",
      lead: "Both end with main containing your feature. Merge records that the work happened in parallel; rebase rewrites it as if you had started from the latest main.",
      content: (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Figure title="git merge" note="keeps the fork">
              <MergeGraph />
              <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-foreground-muted">
                <li>+ True history — nothing is rewritten.</li>
                <li>+ Safe on branches other people use.</li>
                <li>− Busy graphs with many merge commits.</li>
              </ul>
            </Figure>
            <Figure title="git rebase main" note="replays commits">
              <RebaseGraph />
              <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-foreground-muted">
                <li>+ Clean, straight-line history.</li>
                <li>+ Easy to read with git log.</li>
                <li>− Creates new commits (F1′ ≠ F1).</li>
              </ul>
            </Figure>
          </div>
          <Callout tone="warn" title="The golden rule of rebasing">
            Only rebase commits that exist nowhere but your machine. Rebasing
            commits someone else already pulled rewrites history under their
            feet — use merge for shared branches.
          </Callout>
        </>
      ),
    },
    {
      id: "undo",
      label: "Undo",
      title: "Made a mistake? Find your situation, run the line.",
      lead: "Almost nothing in Git is truly lost once it has been committed. The trick is picking the right tool for where the mistake lives.",
      content: (
        <>
          <DataTable
            caption="Undoing things in Git"
            head={["I want to…", "Command", "Careful?"]}
            rows={[
              ["Throw away unstaged edits to a file", <C key="c">git restore &lt;file&gt;</C>, "Those edits are gone"],
              ["Unstage a file but keep the changes", <C key="c">git restore --staged &lt;file&gt;</C>, "Safe"],
              ["Fix the message of my last commit", <C key="c">git commit --amend</C>, "Only before pushing"],
              ["Undo my last commit, keep the changes", <C key="c">git reset --soft HEAD~1</C>, "Only before pushing"],
              ["Undo a commit that’s already pushed", <C key="c">git revert &lt;commit&gt;</C>, "Safe — adds a new commit"],
              ["Get back a commit I “lost”", <C key="c">git reflog</C>, "Safe — then git switch -c rescue <hash>"],
            ]}
          />
          <Callout title="reflog is your safety net">
            Git logs every place HEAD has pointed for about 90 days. After a
            bad reset or rebase, <C>git reflog</C> shows the hash from before —
            check it out and you’re back.
          </Callout>
        </>
      ),
    },
    {
      id: "good-commits",
      label: "Good commits",
      title: "Small commits, with messages that say why.",
      lead: "A good history reads like a changelog. Future you, searching for when a bug appeared, will be grateful.",
      content: (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card eyebrow="Avoid" title="Messages that say nothing">
              <ul className="mt-2 space-y-1.5 font-mono text-[0.8rem] text-foreground-subtle line-through">
                <li>fix</li>
                <li>stuff</li>
                <li>WIP final FINAL</li>
              </ul>
            </Card>
            <Card eyebrow="Prefer" title="One change, clearly named" accent>
              <ul className="mt-2 space-y-1.5 font-mono text-[0.8rem] text-foreground">
                <li>Fix crash when cart is empty</li>
                <li>Add dark mode toggle to header</li>
                <li>Remove unused lodash dependency</li>
              </ul>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card title="Rules of thumb">
              <ul className="mt-1 list-disc space-y-1.5 pl-5">
                <li>Imperative mood: “Add”, not “Added”.</li>
                <li>Subject around 50 characters, no full stop.</li>
                <li>One logical change per commit.</li>
                <li>Need more? Blank line, then explain <em>why</em>.</li>
              </ul>
            </Card>
            <Code
              title=".gitignore — never commit these"
              code={`
node_modules/
dist/
.env          # secrets
*.log
.DS_Store
`}
            />
          </div>
        </>
      ),
    },
  ],
};
