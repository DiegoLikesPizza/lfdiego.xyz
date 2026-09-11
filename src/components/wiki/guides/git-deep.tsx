import type { GuideSection } from "../types";
import {
  AnnotatedCode,
  C,
  Callout,
  Card,
  Code,
  DataTable,
  Figure,
  Glossary,
  Steps,
  Wide,
} from "../primitives";
import { cn } from "@/lib/utils";

function ObjectModel() {
  const node = (
    x: number,
    y: number,
    w: number,
    kind: string,
    name: string,
    sub: string,
    accent = false,
  ) => (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height="60"
        rx="8"
        strokeWidth="1.5"
        className={accent ? "fill-accent-soft stroke-accent" : "fill-background stroke-border"}
      />
      <text x={x + 12} y={y + 18} fontSize="10" className="fill-foreground-subtle font-mono">
        {kind}
      </text>
      <text x={x + 12} y={y + 36} fontSize="13" className="fill-foreground font-mono">
        {name}
      </text>
      <text x={x + 12} y={y + 52} fontSize="10" className="fill-foreground-muted font-mono">
        {sub}
      </text>
    </g>
  );

  return (
    <svg
      viewBox="0 0 640 300"
      className="h-auto w-full"
      role="img"
      aria-label="Git's object model: HEAD points to the branch main, which points to commit b7c. That commit points to its parent commit a1f and to a root tree. The tree contains a blob for README.md and a subtree for src, which contains a blob for app.ts."
    >
      <defs>
        <marker id="git-obj-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-foreground-subtle" />
        </marker>
      </defs>

      <rect x="20" y="20" width="80" height="36" rx="6" className="fill-foreground" />
      <text x="60" y="43" fontSize="12" textAnchor="middle" className="fill-background font-mono">
        HEAD
      </text>
      <rect x="130" y="20" width="90" height="36" rx="6" strokeWidth="1.5" className="fill-background stroke-accent" />
      <text x="175" y="43" fontSize="12" textAnchor="middle" className="fill-accent-hover font-mono">
        main
      </text>

      {node(260, 8, 170, "commit", "b7c", "Add login form", true)}
      {node(470, 8, 150, "commit", "a1f", "Initial commit")}
      {node(260, 118, 170, "tree", "9c4", "/  (project root)")}
      {node(60, 228, 170, "blob", "3e1", "README.md")}
      {node(260, 228, 170, "tree", "5d0", "src/")}
      {node(460, 228, 160, "blob", "e7a", "app.ts")}

      <path d="M100 38 H124" strokeWidth="1.5" markerEnd="url(#git-obj-arrow)" className="stroke-foreground-subtle" />
      <path d="M220 38 H254" strokeWidth="1.5" markerEnd="url(#git-obj-arrow)" className="stroke-foreground-subtle" />
      <path d="M430 38 H464" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#git-obj-arrow)" className="stroke-foreground-subtle" />
      <text x="447" y="82" fontSize="10" textAnchor="middle" className="fill-foreground-subtle font-mono">
        parent
      </text>
      <path d="M345 68 V112" strokeWidth="1.5" markerEnd="url(#git-obj-arrow)" className="stroke-foreground-subtle" />
      <path d="M300 178 C300 205 145 200 145 222" fill="none" strokeWidth="1.5" markerEnd="url(#git-obj-arrow)" className="stroke-foreground-subtle" />
      <path d="M345 178 V222" strokeWidth="1.5" markerEnd="url(#git-obj-arrow)" className="stroke-foreground-subtle" />
      <path d="M430 258 H454" strokeWidth="1.5" markerEnd="url(#git-obj-arrow)" className="stroke-foreground-subtle" />
    </svg>
  );
}

function AheadBehind() {
  return (
    <svg
      viewBox="0 0 640 170"
      className="h-auto w-full"
      role="img"
      aria-label="Diverged branches: after shared commits A and B, your local main has two new commits, C and D, while origin/main has one new commit, E. Your branch is two ahead and one behind."
    >
      <path d="M60 85 H150" fill="none" strokeWidth="2" className="stroke-foreground-subtle" />
      <path d="M150 85 C195 85 205 45 250 45 H340" fill="none" strokeWidth="2" className="stroke-accent" />
      <path d="M150 85 C195 85 205 125 250 125" fill="none" strokeWidth="2" strokeDasharray="5 4" className="stroke-foreground-subtle" />

      {[
        { x: 60, l: "A" },
        { x: 150, l: "B" },
      ].map((c) => (
        <g key={c.l}>
          <circle cx={c.x} cy="85" r="9" strokeWidth="2" className="fill-surface stroke-foreground" />
          <text x={c.x} y="64" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
            {c.l}
          </text>
        </g>
      ))}
      {[
        { x: 250, l: "C" },
        { x: 340, l: "D" },
      ].map((c) => (
        <g key={c.l}>
          <circle cx={c.x} cy="45" r="9" strokeWidth="2" className="fill-surface stroke-accent" />
          <text x={c.x} y="24" fontSize="11" textAnchor="middle" className="fill-accent-hover font-mono">
            {c.l}
          </text>
        </g>
      ))}
      <circle cx="250" cy="125" r="9" strokeWidth="2" strokeDasharray="3 2" className="fill-surface stroke-foreground-subtle" />
      <text x="250" y="155" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
        E
      </text>

      <text x="370" y="49" fontSize="12" className="fill-accent-hover font-mono">
        main — 2 ahead
      </text>
      <text x="280" y="129" fontSize="12" className="fill-foreground-muted font-mono">
        origin/main — 1 behind
      </text>
    </svg>
  );
}

const bisectRounds = [
  { lo: 1, hi: 16, test: 8, result: "bad" },
  { lo: 1, hi: 8, test: 4, result: "good" },
  { lo: 5, hi: 8, test: 6, result: "bad" },
  { lo: 5, hi: 6, test: 5, result: "good" },
];

function Bisect() {
  const commits = Array.from({ length: 16 }, (_, i) => i + 1);
  return (
    <Wide minWidth={560}>
      <ol className="space-y-2.5">
        {bisectRounds.map((round, index) => (
          <li key={index} className="grid grid-cols-[4.5rem_minmax(0,1fr)_5.5rem] items-center gap-3">
            <span className="font-mono text-xs text-foreground-subtle">Step {index + 1}</span>
            <div className="flex gap-1">
              {commits.map((n) => {
                const inRange = n >= round.lo && n <= round.hi;
                return (
                  <span
                    key={n}
                    className={cn(
                      "flex h-7 flex-1 items-center justify-center rounded-[4px] border font-mono text-[0.65rem]",
                      n === round.test
                        ? "border-accent bg-accent text-accent-foreground"
                        : inRange
                          ? "border-border bg-background text-foreground-muted"
                          : "border-dashed border-border text-foreground-subtle opacity-40",
                    )}
                  >
                    {n}
                  </span>
                );
              })}
            </div>
            <span className={cn("font-mono text-xs", round.result === "bad" ? "text-accent-hover" : "text-foreground-muted")}>
              #{round.test} {round.result}
            </span>
          </li>
        ))}
        <li className="grid grid-cols-[4.5rem_minmax(0,1fr)_5.5rem] items-center gap-3">
          <span className="font-mono text-xs text-foreground">Found</span>
          <div className="flex gap-1">
            {commits.map((n) => (
              <span
                key={n}
                className={cn(
                  "flex h-7 flex-1 items-center justify-center rounded-[4px] border font-mono text-[0.65rem]",
                  n === 6
                    ? "border-accent bg-accent-soft font-semibold text-accent-hover"
                    : "border-dashed border-border text-foreground-subtle opacity-40",
                )}
              >
                {n}
              </span>
            ))}
          </div>
          <span className="font-mono text-xs text-accent-hover">#6 broke it</span>
        </li>
      </ol>
    </Wide>
  );
}

function CherryPick() {
  return (
    <svg
      viewBox="0 0 640 180"
      className="h-auto w-full"
      role="img"
      aria-label="Cherry-pick: commit Y on a fix branch is copied onto main as a new commit, Y prime. The original Y stays on its branch."
    >
      <defs>
        <marker id="git-cp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
      </defs>
      <text x="10" y="54" fontSize="11" className="fill-foreground-subtle font-mono">
        main
      </text>
      <text x="10" y="134" fontSize="11" className="fill-accent-hover font-mono">
        fix
      </text>
      <path d="M60 50 H400" fill="none" strokeWidth="2" className="stroke-foreground-subtle" />
      <path d="M160 50 C205 50 215 130 260 130 H360" fill="none" strokeWidth="2" className="stroke-accent" />

      {[
        { x: 60, l: "A" },
        { x: 160, l: "B" },
        { x: 260, l: "C" },
      ].map((c) => (
        <g key={c.l}>
          <circle cx={c.x} cy="50" r="9" strokeWidth="2" className="fill-surface stroke-foreground" />
          <text x={c.x} y="30" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
            {c.l}
          </text>
        </g>
      ))}
      {[
        { x: 260, l: "X" },
        { x: 360, l: "Y" },
      ].map((c) => (
        <g key={c.l}>
          <circle cx={c.x} cy="130" r="9" strokeWidth="2" className="fill-surface stroke-accent" />
          <text x={c.x} y="160" fontSize="11" textAnchor="middle" className="fill-foreground-muted font-mono">
            {c.l}
          </text>
        </g>
      ))}
      <circle cx="400" cy="50" r="10" strokeWidth="2" className="fill-accent stroke-accent" />
      <text x="400" y="30" fontSize="11" textAnchor="middle" className="fill-accent-hover font-mono">
        Y′
      </text>
      <path d="M372 122 C398 110 406 84 402 66" fill="none" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#git-cp-arrow)" className="stroke-accent" />
      <text x="420" y="102" fontSize="12" className="fill-accent-hover font-mono">
        git cherry-pick Y
      </text>
    </svg>
  );
}

const stashes = [
  { ref: "stash@{0}", msg: "On main: header styles" },
  { ref: "stash@{1}", msg: "On feature/login: half-done form" },
  { ref: "stash@{2}", msg: "On main: cache experiment" },
];

function StashStack() {
  return (
    <ol className="space-y-2">
      {stashes.map((stash, index) => (
        <li
          key={stash.ref}
          style={{ marginLeft: `${index * 14}px` }}
          className={cn(
            "flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[8px] border px-4 py-3",
            index === 0 ? "border-accent/50 bg-accent-soft" : "border-border bg-background",
          )}
        >
          <span className={cn("font-mono text-sm", index === 0 ? "text-accent-hover" : "text-foreground")}>
            {stash.ref}
          </span>
          <span className="text-sm text-foreground-muted">{stash.msg}</span>
          {index === 0 && (
            <span className="ml-auto font-mono text-[0.7rem] text-accent-hover">← pop takes this one</span>
          )}
        </li>
      ))}
    </ol>
  );
}

function StrategyLanes({ kind }: { kind: "trunk" | "github" | "gitflow" }) {
  return (
    <svg viewBox="0 0 260 90" className="h-auto w-full" aria-hidden="true">
      {kind === "trunk" && (
        <>
          <path d="M10 50 H250" strokeWidth="2.5" className="stroke-foreground" />
          {[40, 110, 180].map((x) => (
            <path
              key={x}
              d={`M${x} 50 C${x + 10} 50 ${x + 10} 28 ${x + 20} 28 C${x + 30} 28 ${x + 30} 50 ${x + 40} 50`}
              fill="none"
              strokeWidth="2"
              className="stroke-accent"
            />
          ))}
        </>
      )}
      {kind === "github" && (
        <>
          <path d="M10 30 H250" strokeWidth="2.5" className="stroke-foreground" />
          <path d="M40 30 C55 30 55 65 70 65 H110 C125 65 125 30 140 30" fill="none" strokeWidth="2" className="stroke-accent" />
          <path d="M140 30 C155 30 155 65 170 65 H200 C215 65 215 30 230 30" fill="none" strokeWidth="2" className="stroke-accent" />
        </>
      )}
      {kind === "gitflow" && (
        <>
          <path d="M10 15 H250" strokeWidth="2.5" className="stroke-foreground" />
          <path d="M10 48 H250" strokeWidth="2" className="stroke-foreground-subtle" />
          <path d="M40 48 C50 48 50 78 60 78 H100 C110 78 110 48 120 48" fill="none" strokeWidth="2" className="stroke-accent" />
          <path d="M150 48 C160 48 160 32 170 32 H190 C200 32 200 15 210 15" fill="none" strokeWidth="2" strokeDasharray="4 3" className="stroke-accent" />
          <path d="M190 32 C200 32 200 48 210 48" fill="none" strokeWidth="2" strokeDasharray="4 3" className="stroke-accent" />
        </>
      )}
    </svg>
  );
}

export const gitDeepSections: GuideSection[] = [
  {
    id: "under-the-hood",
    label: "Under the hood",
    title: "Four kinds of object, linked by their hashes.",
    lead: "Everything Git stores lives in .git/objects, named by a hash of its content. Once you see the objects, commands like reset, rebase and cherry-pick stop feeling like magic.",
    content: (
      <>
        <Figure title="What a commit really is">
          <Wide minWidth={560}>
            <ObjectModel />
          </Wide>
        </Figure>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card eyebrow="blob" title="File contents">
            Just the bytes of one file — no name, no permissions. Two identical
            files anywhere in history share one blob.
          </Card>
          <Card eyebrow="tree" title="A directory">
            A list of names pointing to blobs (files) and other trees
            (subfolders).
          </Card>
          <Card eyebrow="commit" title="A snapshot + metadata" accent>
            Points to one root tree, its parent commit(s), and records author,
            date and message.
          </Card>
          <Card eyebrow="ref" title="A name for a commit">
            Branches and tags are tiny files containing a commit hash. HEAD
            usually points to a branch.
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Look inside for yourself"
            code={`
git cat-file -p HEAD            # the commit: tree, parent, author, message
git cat-file -p HEAD^{tree}     # the root tree: names → hashes
git cat-file -t 3e1f9a          # what type is this object?
cat .git/refs/heads/main        # a branch is just a hash in a file
cat .git/HEAD                   # ref: refs/heads/main
`}
          />
          <Callout title="Why this matters">
            Because a commit’s hash covers its tree <em>and</em> its parent,
            changing anything in history — even one letter of an old message —
            produces new hashes for that commit and every commit after it. That
            is exactly what “rewriting history” means, and why it causes trouble
            once others have the old hashes.
          </Callout>
        </div>
      </>
    ),
  },
  {
    id: "conflicts",
    label: "Merge conflicts",
    title: "A conflict is Git asking you to decide — not an error.",
    lead: "When both sides changed the same lines, Git can’t know which version is right. It writes both into the file with markers and waits for you.",
    content: (
      <>
        <Figure title="Reading conflict markers">
          <AnnotatedCode
            title="src/greet.js — mid-merge"
            lines={[
              ["export function greet(name) {"],
              ["<<<<<<< HEAD", 1],
              ["  return `Hello, ${name}!`;"],
              ["||||||| base", 2],
              ['  return "Hello " + name;'],
              ["=======", 3],
              ["  return `Hi ${name}, welcome back`;"],
              [">>>>>>> feature/friendly-greeting", 4],
              ["}"],
            ]}
            notes={[
              { title: "Your side (HEAD)", body: "What the branch you’re on — the one you’re merging into — has." },
              { title: "The common ancestor", body: "What the line looked like before either change. Only shown with the zdiff3 style — turn it on, it makes decisions much easier." },
              { title: "The divider", body: "Everything below it, down to the last marker, is the incoming side." },
              { title: "Their side", body: "The branch being merged in (or, during a rebase, your commit being replayed)." },
            ]}
          />
        </Figure>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Steps
            items={[
              { title: "Git stops and tells you", body: "The merge or rebase pauses with a CONFLICT message naming the files.", code: "CONFLICT (content): Merge conflict in src/greet.js" },
              { title: "List what’s conflicted", body: "Conflicted files show as “both modified”.", code: "git status" },
              { title: "Edit each file", body: "Keep one side, the other, or write a combination. Delete all the marker lines. Run the tests." },
              { title: "Mark it resolved", body: "Staging the file tells Git you’re done with it.", code: "git add src/greet.js" },
              { title: "Continue", body: "Finish the operation that was interrupted.", code: "git merge --continue   # or: git rebase --continue" },
            ]}
          />
          <div className="space-y-6">
            <Callout tone="warn" title="You can always back out">
              <C>git merge --abort</C> or <C>git rebase --abort</C> puts
              everything back exactly as it was before you started.
            </Callout>
            <Code
              title="Make conflicts easier"
              code={`
git config --global merge.conflictstyle zdiff3   # show the base version too
git config --global rerere.enabled true          # reuse resolutions you've done before
git mergetool                                    # open a visual 3-way merge tool
`}
            />
            <Card title="Fewer conflicts in the first place">
              <ul className="mt-1 list-disc space-y-1.5 pl-5">
                <li>Pull or rebase onto main often — small drifts merge easily.</li>
                <li>Keep branches and pull requests short-lived.</li>
                <li>Don’t reformat whole files in a feature branch.</li>
                <li>Agree on a formatter so whitespace never conflicts.</li>
              </ul>
            </Card>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "remotes",
    label: "Remotes & tracking",
    title: "origin/main is a bookmark of where GitHub was when you last looked.",
    lead: "Your repository keeps read-only remote-tracking branches like origin/main. git fetch updates them; nothing else touches your own branches until you merge, rebase or pull.",
    content: (
      <>
        <Figure title="Ahead and behind at the same time" note="after git fetch">
          <Wide minWidth={560}>
            <AheadBehind />
          </Wide>
          <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-foreground-muted">
            You made C and D; a teammate pushed E. <C>git push</C> is now
            rejected — first bring E in with <C>git pull --rebase</C>, which
            replays C and D on top of E, then push.
          </p>
        </Figure>
        <DataTable
          caption="Commands that talk to remotes"
          head={["Command", "Updates origin/*", "Changes your branch", "Use it to"]}
          rows={[
            [<C key="c">git fetch</C>, "Yes", "No", "See what’s new without touching your work"],
            [<C key="c">git pull</C>, "Yes", "Yes — merge", "Catch up; may create a merge commit"],
            [<C key="c">git pull --rebase</C>, "Yes", "Yes — rebase", "Catch up with a straight history"],
            [<C key="c">git push</C>, "Yes", "No (moves the remote)", "Publish your commits"],
            [<C key="c">git push --force-with-lease</C>, "Yes", "No", "Overwrite your own rebased branch safely"],
          ]}
        />
        <Code
          title="Everyday remote commands"
          code={`
git remote -v                     # list remotes and their URLs
git fetch --prune                 # update origin/*, forget deleted branches
git status                        # "Your branch is ahead of 'origin/main' by 2 commits"
git branch -vv                    # every branch, its upstream, ahead/behind
git log --oneline main..origin/main   # commits on GitHub you don't have yet
git push -u origin feature/login  # publish a new branch and track it
`}
        />
      </>
    ),
  },
  {
    id: "history",
    label: "Reading history",
    title: "History is a searchable database. Learn to query it.",
    lead: "When something broke, who changed a line, or when a function disappeared — Git can answer in seconds.",
    content: (
      <>
        <DataTable
          caption="Ways to search Git history"
          head={["Question", "Command"]}
          rows={[
            ["What happened recently, across all branches?", <C key="c">git log --oneline --graph --all</C>],
            ["Every change to one file, with diffs", <C key="c">git log -p -- src/cart.ts</C>],
            ["When was this text added or removed?", <C key="c">git log -S &quot;calculateTotal&quot;</C>],
            ["Commits by one person in the last 2 weeks", <C key="c">git log --author=&quot;Ada&quot; --since=&quot;2 weeks ago&quot;</C>],
            ["Who last changed lines 40–60?", <C key="c">git blame -L 40,60 src/cart.ts</C>],
            ["What’s on my branch that main doesn’t have?", <C key="c">git log main..feature</C>],
            ["What did my branch change since it split off?", <C key="c">git diff main...feature</C>],
            ["What did a file look like in an old commit?", <C key="c">git show a1f3:src/cart.ts</C>],
          ]}
        />
        <Figure title="git bisect: binary-search for the commit that broke it" note="16 commits → 4 tests">
          <Bisect />
          <p className="mt-5 max-w-[70ch] text-sm leading-relaxed text-foreground-muted">
            You know commit 1 worked and commit 16 doesn’t. Bisect checks out
            the middle, you say good or bad, and it halves the range each time.
            Even 1,000 commits take only about 10 steps.
          </p>
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Bisect by hand"
            code={`
git bisect start
git bisect bad                 # the current commit is broken
git bisect good v1.4.0         # this release was fine
# Git checks out a commit in the middle. Test it, then:
git bisect good                # or: git bisect bad
# ...repeat until Git prints "<hash> is the first bad commit"
git bisect reset               # go back to where you started
`}
          />
          <Code
            title="…or let a script decide"
            code={`
git bisect start HEAD v1.4.0
git bisect run npm test        # exit code 0 = good, anything else = bad
`}
          />
        </div>
      </>
    ),
  },
  {
    id: "rewriting-history",
    label: "Rewriting history",
    title: "Clean up your commits before anyone else sees them.",
    lead: "Messy WIP commits are fine while you work. Before opening a pull request, you can reorder, merge, rename or drop them — as long as the branch is still yours alone.",
    content: (
      <>
        <DataTable
          caption="The three modes of git reset"
          head={["git reset …", "Moves the branch", "Clears staging", "Clears your files"]}
          rows={[
            [<C key="c">--soft HEAD~1</C>, "Yes", "No — changes stay staged", "No"],
            [<C key="c">--mixed HEAD~1 (default)</C>, "Yes", "Yes — changes become unstaged", "No"],
            [<C key="c">--hard HEAD~1</C>, "Yes", "Yes", <span key="w" className="text-accent-hover">Yes — uncommitted work is gone</span>],
          ]}
        />
        <Figure title="Interactive rebase: an editable to-do list" note="git rebase -i HEAD~6">
          <AnnotatedCode
            title="git-rebase-todo — oldest commit at the top"
            lines={[
              ["pick   f03 Add login form"],
              ["reword a1c Fix typo in button", 1],
              ["squash 9be Adjust spacing", 2],
              ["fixup  4d2 WIP", 3],
              ["drop   7aa Debug logging", 4],
              ["edit   c55 Split config file", 5],
            ]}
            notes={[
              { title: "reword", body: "Keep the commit, change its message." },
              { title: "squash", body: "Melt into the commit above and combine both messages." },
              { title: "fixup", body: "Like squash, but throw this commit’s message away." },
              { title: "drop", body: "Delete the commit entirely (or just delete its line)." },
              { title: "edit", body: "Stop at this commit so you can amend it or split it into several." },
            ]}
          />
          <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
            Reorder lines to reorder commits. Save and close the editor and Git
            replays the list from top to bottom.
          </p>
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Fixup commits: fix now, tidy later"
            code={`
git commit --fixup=f03              # "fixup! Add login form"
git rebase -i --autosquash main     # fixups jump into place automatically
git push --force-with-lease         # update your already-pushed branch
`}
          />
          <Callout tone="warn" title="--force-with-lease, never plain --force">
            After rewriting, a normal push is rejected. <C>--force-with-lease</C>{" "}
            only overwrites the remote branch if it still matches what you last
            fetched — so you can’t silently wipe a teammate’s commits. Never
            force-push <C>main</C>.
          </Callout>
        </div>
      </>
    ),
  },
  {
    id: "stash-cherry-pick",
    label: "Stash, cherry-pick & worktrees",
    title: "Tools for when you need to switch context fast.",
    lead: "Half-finished work and an urgent bug on another branch? You don’t have to commit junk or clone the repo twice.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Figure title="The stash is a stack" note="last in, first out">
            <StashStack />
          </Figure>
          <Code
            title="Stash"
            code={`
git stash push -m "header styles"   # park changes with a name
git stash -u                        # include untracked files too
git stash list                      # stash@{0}: On main: header styles
git stash pop                       # apply the top entry and remove it
git stash apply stash@{1}           # apply without removing
git stash drop stash@{2}            # throw one away
`}
          />
        </div>
        <Figure title="Cherry-pick copies a commit onto your branch">
          <Wide minWidth={560}>
            <CherryPick />
          </Wide>
          <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-foreground-muted">
            Y′ has the same changes as Y but a new hash. Handy for back-porting
            a fix to a release branch — but if you find yourself cherry-picking
            lots, a merge is usually the better tool.
          </p>
        </Figure>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Cherry-pick"
            code={`
git switch main
git cherry-pick 4d2e9a1            # copy one commit
git cherry-pick a1c..c55           # copy a range (excluding a1c)
git cherry-pick --abort            # if it conflicts and you change your mind
`}
          />
          <Code
            title="Worktrees: two branches checked out at once"
            code={`
git worktree add -b hotfix/login ../shop-hotfix main
cd ../shop-hotfix                  # fix, commit, push — main folder untouched
git worktree list
git worktree remove ../shop-hotfix
`}
          />
        </div>
      </>
    ),
  },
  {
    id: "strategies-tags",
    label: "Branching strategies & tags",
    title: "Pick a branching model that matches how often you ship.",
    content: (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card eyebrow="Ship continuously" title="Trunk-based" accent>
            <StrategyLanes kind="trunk" />
            Everyone merges tiny branches (hours, not days) into main. Needs
            good tests and feature flags for unfinished work.
          </Card>
          <Card eyebrow="Most teams" title="GitHub flow">
            <StrategyLanes kind="github" />
            main is always deployable. One branch per feature or fix, merged
            through a reviewed pull request, deployed right after.
          </Card>
          <Card eyebrow="Scheduled releases" title="Git flow">
            <StrategyLanes kind="gitflow" />
            Long-lived develop and main, plus feature, release and hotfix
            branches. Heavier — suits versioned software shipped on a schedule.
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title="Tags mark releases"
            code={`
git tag -a v1.2.0 -m "Release 1.2.0"   # annotated tag on the current commit
git push origin v1.2.0                  # tags are not pushed by default
git tag --list "v1.*"
git switch --detach v1.1.0              # look at an old release
`}
          />
          <Callout title="Detached HEAD, explained">
            Checking out a tag or a commit hash puts HEAD directly on a commit
            instead of a branch. Looking around is harmless. If you commit
            there, create a branch before leaving —{" "}
            <C>git switch -c my-fix</C> — or those commits become hard to find.
          </Callout>
        </div>
      </>
    ),
  },
  {
    id: "config",
    label: "Config & aliases",
    title: "A few settings that make Git noticeably nicer.",
    lead: "Git reads config from three levels: --system (the machine), --global (you), and --local (one repository), with the most specific winning.",
    content: (
      <>
        <Code
          title="~/.gitconfig worth having"
          code={`
git config --global pull.rebase true             # pull = fetch + rebase
git config --global fetch.prune true             # drop branches deleted on the remote
git config --global push.autoSetupRemote true    # first push sets the upstream
git config --global rerere.enabled true          # remember conflict resolutions
git config --global merge.conflictstyle zdiff3   # show the base in conflicts
git config --global core.editor "code --wait"    # use VS Code for messages
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.undo "reset --soft HEAD~1"
git config --list --show-origin                  # where each setting comes from
`}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Code
            title=".gitattributes — consistent line endings"
            code={`
* text=auto eol=lf      # normalise text files to LF
*.bat text eol=crlf     # Windows scripts keep CRLF
*.png binary            # never diff or convert images
`}
          />
          <Callout title="Seeing “LF will be replaced by CRLF”?">
            Windows uses CRLF line endings; macOS and Linux use LF. With{" "}
            <C>core.autocrlf true</C> Git converts on checkout and commit, and
            warns you when it does. A committed <C>.gitattributes</C> settles
            it for everyone on the project, whatever their OS.
          </Callout>
        </div>
      </>
    ),
  },
  {
    id: "glossary",
    label: "Glossary",
    title: "Git words, in one place.",
    content: (
      <Glossary
        terms={[
          { term: "repository", def: "A project folder plus its full history, stored in .git/." },
          { term: "working tree", def: "The actual files on disk that you edit." },
          { term: "index / staging area", def: "The draft of your next commit, built with git add." },
          { term: "commit", def: "A snapshot of the project with an author, a message and a parent." },
          { term: "hash (SHA)", def: "The unique ID of an object, derived from its contents. Usually shortened to 7 characters." },
          { term: "branch", def: "A movable name that points at a commit and advances as you commit." },
          { term: "HEAD", def: "What you have checked out right now — normally a branch." },
          { term: "detached HEAD", def: "HEAD points directly at a commit, not a branch." },
          { term: "remote", def: "Another copy of the repository, like the one on GitHub." },
          { term: "origin", def: "The default name for the remote you cloned from." },
          { term: "upstream", def: "The remote branch a local branch tracks; also a common name for the original repo of a fork." },
          { term: "fetch", def: "Download new commits and update origin/* without changing your branches." },
          { term: "pull", def: "fetch, then merge (or rebase) into your current branch." },
          { term: "fast-forward", def: "A merge where the branch simply moves ahead — no merge commit needed." },
          { term: "merge commit", def: "A commit with two parents that joins two lines of history." },
          { term: "rebase", def: "Replay commits on top of another base, creating new commits." },
          { term: "conflict", def: "Both sides changed the same lines; Git needs you to choose." },
          { term: "stash", def: "A stack of shelved, uncommitted changes." },
          { term: "tag", def: "A fixed name for a commit, typically a release like v1.2.0." },
          { term: "reflog", def: "A local log of everywhere HEAD has been — your undo history." },
          { term: "cherry-pick", def: "Copy the changes of one commit onto the current branch." },
          { term: "bisect", def: "Binary search through history for the commit that introduced a bug." },
        ]}
      />
    ),
  },
];
