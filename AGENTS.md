# Agent Rules & Project Standards for userscripts

## Repository Overview

userscripts contains personal browser userscripts for site enhancements and automation.

## Code Standards and Practices

### Userscript Standards

- Follow Userscript metadata block requirements (e.g., `@name`, `@match`, `@grant`).
- Use modern JavaScript (ES6+) best practices.
- Implement proper error handling and logging for browser console.
- Ensure compatibility with Tampermonkey, Violentmonkey, or Greasemonkey.

### Documentation Standards

- Include clear installation instructions and compatible managers.
- Document script purposes, features, and site coverage.
- Provide troubleshooting guidance for common issues.
- Use markdown formatting consistently.

### Markdown Compliance Requirements (MANDATORY)

- **ALL markdown files (.md) MUST pass markdownlint validation with zero errors or warnings**
- Run `markdownlint <filename>` on every markdown file before considering it complete
- Follow the project's `.markdownlint.json` configuration strictly
- Address ALL markdownlint issues immediately - no exceptions or workarounds
- Common requirements include:
  - Maximum line length of 80 characters (MD013)
  - Consistent heading styles and hierarchy
  - Proper list formatting and indentation
  - Blank lines around headings and code blocks
  - Consistent link and reference formatting
  - No trailing whitespace
  - Files must end with newlines
  - Proper table formatting when applicable
- Use `markdownlint --fix <filename>` for auto-fixable issues when available
- Validate markdown files in CI/CD pipelines where applicable

## Development Guidelines

### Commit Message Convention

- Use the conventional commit format: `type(scope): description`
- Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`
- Commit descriptions should be a bullet list of changes made
- Example:

  ```text
  docs(AGENTS.md): update agent rules for cloudflare-worker project

  - this file had the wrong data from a totally different repository
  ```

#### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Formatting (white-space, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or correcting tests
- **chore**: Changes to build process or auxiliary tools

#### Scope Guidelines

- **action**: main action logic
- **docs**: documentation
- **userscripts**: userscripts
- **tests**: test-related
- **ci**: CI/CD configuration
- **deps**: dependency updates

### Whitespace and Code Formatting Standards

- **ALL files MUST be free of trailing whitespace**
- Run `grep -n '[[:space:]]$' <filename>` to check for trailing whitespace.
- Remove trailing whitespace with: `sed -i '' 's/[[:space:]]*$//' <filename>`.
- Ensure consistent indentation (2-space preferred for JavaScript).
- Use Unix line endings (LF).

### When Making Changes

- Preserve existing functionality unless explicitly asked to change it.
- Update documentation when adding new scripts or modifying features.
- Test scripts across different browsers and site layouts.
- **Always run markdownlint and fix all issues in markdown files before considering changes complete**

### Browser Integration Standards

- Implement proper cross-origin request handling where needed.
- Use DOM manipulation best practices (e.g., `MutationObserver` for dynamic sites).
- Minimize performance impact on host websites.

## GitHub & Automation Standards

These rules apply specifically to files in `.github/*` (workflows, templates, and documentation).

### Quality Gates (MANDATORY)

Before completing any change in `.github/`:

1. ✅ Run `markdownlint` validation (if .md file).
2. ✅ Ensure project standards are followed.
3. ✅ Verify contribution guidelines are up-to-date.
4. ✅ Check that automation maintains project standards.

### Templates and Workflows

- Ensure issue and pull request templates provide clear, actionable guidelines.
- Include project-specific troubleshooting sections in templates.
- Reference existing project documentation and standards.

### Documentation standards in .github/

- `.github/CONTRIBUTING.md` must include:
  - Development environment setup instructions.
  - Testing requirements and procedures.
  - Documentation standards for new features.
  - Project-specific contribution guidelines.

### Automation and CI/CD

- Project workflows must include automated testing stages.
- Code quality checks must be integrated into CI/CD.
- Release automation must be properly configured.

### Error Prevention

- NEVER generate markdown that violates line length or formatting rules.
- ALWAYS cross-reference with existing project practices before making changes.
- ENSURE all links and references are valid and current.
- VALIDATE that new requirements don't conflict with established workflows.
