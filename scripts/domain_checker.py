import requests  # pyright: ignore[reportMissingModuleSource]
import re

def check_domain_status(domain):
    """
    Checks if a domain is alive and accessible by making an HTTP GET request.
    Returns True if the domain responds with a 200 OK status, False otherwise.
    """
    try:
        response = requests.get(f"http://{domain}", timeout=5) # 5-second timeout
        if response.status_code == 200:
            print(f"{domain} is alive and accessible (200 OK).")
            return True
        else:
            print(f"{domain} is online but returned status code {response.status_code}.")
            return False
    except requests.exceptions.ConnectionError:
        print(f"{domain} is not accessible (Connection Error).")
        return False
    except requests.exceptions.Timeout:
        print(f"{domain} timed out after 5 seconds.")
        return False
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while checking {domain}: {e}")
        return False

def extract_domains_from_userscript(filepath):
    """
    Extracts domains from the @match section of a userscript.
    """
    with open(filepath, "r") as f:
        content = f.read()

    # Regex to find all @match lines and extract the domain
    # It specifically looks for lines starting with // @match and captures the domain part
    domains = re.findall(r"^// @match\s+\*://\*\.(.*?)/\*", content, re.MULTILINE)
    return domains

if __name__ == "__main__":
    import os
    # Get the directory of the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    userscript_path = os.path.join(current_dir, "../paywall-bypass-script.js")
    extracted_domains = extract_domains_from_userscript(userscript_path)

    print("\n--- Checking Extracted Domains ---")
    for domain in extracted_domains:
        check_domain_status(domain)
