# About this Wiki

These guides started as seven long pages on lfdiego.xyz. They now live in **Diego's Wiki Engine**, a self-hosted wiki written in Kotlin, and are much more detailed: each guide is a section with its own pages, common errors, cheat sheet and glossary.

## How the content was made
1. **Source:** the pages are Markdown files in the `wiki/guides/` folder of the lfdiego.xyz repository. Every deploy imports them (`java -jar wiki.jar --import wiki/guides`); unchanged pages are skipped, changed ones get a new revision in the page history.
2. **Verification:**
   - **Git:** every command output comes from `code/git/demo.sh`, which builds example repositories with fixed names and dates, so the hashes are reproducible (Git 2.43).
   - **Java:** every example was compiled and run on **JDK 25** (Temurin 25.0.4.1; the programs are in `code/java/`).
   - **JavaScript:** every example was run with **Node.js 22** (`code/javascript/`).
   - **Kotlin:** compiled and run with **Kotlin 2.4.20** and kotlinx.coroutines 1.11.0 on JDK 21 (`code/kotlin/`, a Gradle project).
   - **GitHub:** every workflow file in `code/github/` passes `actionlint`.
   - **IDEs:** the VS Code config files in `code/ides/` are real and working; menu names and shortcuts describe the 2026 versions of IntelliJ IDEA and VS Code and can shift between releases.
   - **AI prompting:** tokenizer output is real (`code/ai-prompting/tokens.py`), the output validator ran on Node.js 22. Example model answers are illustrative: models phrase things differently every time.
3. **Diagrams** were drawn for the original site and exported as images.

## The engine
- One jar file, one compressed SQLite database.
- Page history with delta compression, text diffs, restore.
- Full-text search with prefix matching, typo correction and section jumps.
- A Word-like editor for people who don't want to write Markdown.
- Each wiki on lfdiego.xyz runs as its own instance below `/wiki/<name>/`.

## Related wikis
- [Java 27 wiki](https://lfdiego.xyz/wiki/java27/): the latest Java release in depth.
- [Kotlin wiki](https://lfdiego.xyz/wiki/kotlin/): the Kotlin language and ecosystem.

## Feedback
Found a mistake? The source is on GitHub; open an issue or a pull request ([[github/Pull Requests]] explains how).
