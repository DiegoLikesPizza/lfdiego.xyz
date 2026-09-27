# Packages

**GitHub Packages** hosts build artifacts next to your code: container images, npm packages, Maven/Gradle libraries, NuGet and RubyGems. Access follows the repository's permissions.

## Container images (ghcr.io)
The most used part. Build and push an image from a workflow:
```yaml
name: Container image
on:
  push:
    branches: [main]
    tags: ['v*']

permissions:
  contents: read
  packages: write

jobs:
  image:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/metadata-action@v5
        id: meta
        with:
          images: ghcr.io/${{ github.repository }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
```
`metadata-action` derives tags like `main`, `v1.2.0`, `1.2`, `sha-3f1f823`. Pull it anywhere:
```sh
docker pull ghcr.io/ada/shop:v1.2.0
```
New packages are **private** by default; make them public under the package's settings.

## Maven / Gradle libraries
Publish a Kotlin or Java library for other projects:
```kotlin
// build.gradle.kts
plugins { `maven-publish` }
publishing {
    publications { create<MavenPublication>("lib") { from(components["java"]) } }
    repositories {
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/ada/price-utils")
            credentials {
                username = System.getenv("GITHUB_ACTOR")
                password = System.getenv("GITHUB_TOKEN")
            }
        }
    }
}
```
```yaml
- run: ./gradlew publish
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
Consumers need a token with `read:packages` even for public Maven packages, which makes GitHub Packages awkward for open-source libraries: publish those to **Maven Central** instead. For company-internal libraries it's convenient.

## npm packages
Scoped packages (`@ada/price-utils`) with `"publishConfig": { "registry": "https://npm.pkg.github.com" }` in `package.json` and `NODE_AUTH_TOKEN` set in the workflow. Public npm libraries usually go to npmjs.com.

## Free tier
Public packages are free. Private packages: 500 MB storage and 1 GB data transfer per month on the free plan; ghcr.io container storage is currently free.

## Alternatives
| Registry | For |
|---|---|
| Docker Hub | public container images (rate-limited pulls) |
| Maven Central | open-source Java/Kotlin libraries |
| npmjs.com | open-source JavaScript packages |
| GitHub Releases assets | downloadable apps/jars without a package manager ([[github/Releases and Pages]]) |
