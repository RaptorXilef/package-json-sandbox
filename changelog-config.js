import conventionalCommits from "conventional-changelog-conventionalcommits";

/**
 * @file changelog-config.js
 * @since 0.1.0
 * @description Zentrales ESM-Konfigurations-Modul für das Changelog-Format.
 */

const config = await conventionalCommits({
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

// Die CLI benötigt direkten Zugriff auf writerOpts und parserOpts
const exportConfig = config.conventionalChangelog || config;

// Sicherstellen, dass die Sortierung exakt deiner Liste entspricht
if (exportConfig.writerOpts) {
    exportConfig.writerOpts.commitGroupsSort = (a, b) => {
        const order = [
            "🚀 Features",
            "🐛 Bug Fixes",
            "⚡ Performance",
            "⚙️ Refactoring",
            "🏗️ Build System",
            "👷 CI/CD Configuration",
            "💎 Styling",
            "🧪 Tests",
            "📚 Dokumentation",
            "🧹 Chore / Maintenance",
            "⏪ Reverts",
        ];
        const idxA = order.indexOf(a.title);
        const idxB = order.indexOf(b.title);
        return (idxA > -1 ? idxA : 99) - (idxB > -1 ? idxB : 99);
    };
}

export default exportConfig;
