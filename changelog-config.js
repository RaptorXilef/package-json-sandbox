import conventionalChangelogConventionalCommits from "conventional-changelog-conventionalcommits";

/**
 * Wir nutzen Top-Level Await (verfügbar in Node 25),
 * um die Konfiguration direkt zu exportieren.
 */
export default await conventionalChangelogConventionalCommits({
    types: [
        { type: "feat", section: "🚀 Features" },
        { type: "fix", section: "🐛 Bug Fixes" },
        { type: "perf", section: "⚡ Performance" },
        { type: "refactor", section: "⚙️ Refactoring" },
        { type: "build", section: "🏗️ Build System" },
        { type: "ci", section: "👷 CI/CD Configuration" },
        { type: "style", section: "💎 Styling" },
        { type: "test", section: "🧪 Tests" },
        { type: "docs", section: "📚 Dokumentation" },
        { type: "chore", section: "🧹 Chore / Maintenance" },
        { type: "revert", section: "⏪ Reverts" },
    ],
});
