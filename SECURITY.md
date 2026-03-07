# Security Policy

## Supported Versions

This repository contains user scripts for browser extensions and does not follow traditional versioning. Security updates are applied to the current main branch as needed.

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| archived scripts | :x: |

## Reporting a Vulnerability

We take security seriously in our user scripts. If you discover a security vulnerability, please report it responsibly:

### How to Report

1. **Open a GitHub Issue**: Create a detailed issue describing the vulnerability
2. **Use GitHub Security Advisories**: For sensitive vulnerabilities, use the [Security tab](https://github.com/LanikSJ/userscripts/security/advisories) to report privately
3. **Email**: For critical vulnerabilities, you may contact the maintainer directly

### What to Include

When reporting a vulnerability, please include:

- **Detailed description** of the security issue
- **Steps to reproduce** the vulnerability
- **Impact assessment** of the potential security risk
- **Suggested fix** (if you have one)
- **Affected user scripts** (if applicable)

### Response Timeline

- **Initial response**: Within 48 hours
- **Vulnerability assessment**: Within 5 business days
- **Fix implementation**: As soon as reasonably possible based on severity
- **Public disclosure**: After a fix is implemented and tested

### Security Best Practices

Our user scripts follow these security practices:

- **No external dependencies**: Scripts are self-contained
- **Minimal permissions**: Only necessary browser APIs are used
- **Input validation**: User inputs are properly sanitized
- **Secure coding**: Following JavaScript security best practices
- **Regular updates**: Scripts are maintained and updated as needed

### Supported Browsers

User scripts are tested and supported on:

- **Chrome/Chromium** with Tampermonkey or Violentmonkey
- **Firefox** with Greasemonkey, Tampermonkey, or Violentmonkey
- **Safari** with Tampermonkey
- **Edge** with Tampermonkey or Violentmonkey
- **AdGuard** browser extension

### Security Notes

- User scripts run with elevated permissions in your browser
- Only install scripts from trusted sources
- Review script code before installation
- Keep your browser and script managers updated
- Report any suspicious behavior immediately

Thank you for helping keep our user scripts secure!
