import re
import sys

CRED = '\033[91m'
CGREEN = '\033[92m'
CEND = '\033[0m'

# check the project name
PROJECT_NAME_REGEX = r'[^A-Za-z0-9]'
project_name = '{{cookiecutter.project_name}}'
if re.search(PROJECT_NAME_REGEX, project_name):
    print(CRED + 'ERROR: please avoid using any special characters in your project name!')
    print(CRED + 'Include only alphanumeric characters.')
    # Exits with status 1 to indicate failure
    sys.exit(1)

# check the bundle identifier
BUNDLE_IDENTIFIER_REGEX = r'[^A-Za-z0-9.]'
bundle_identifier = '{{cookiecutter.bundle_identifier}}'
if re.search(BUNDLE_IDENTIFIER_REGEX, bundle_identifier):
    print(CRED + 'ERROR: %s is not a valid Android package name!'% bundle_identifier + CEND )
    print(CRED + 'Avoid using any special characters. Only alphanumeric characters are allowed.' + CEND)
    # Exits with status 1 to indicate failure
    sys.exit(1)

# check the base url
# BASE_URL_REGEX = r'((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'
# base_url = '{{cookiecutter.base_url}}'
# if re.match(BASE_URL_REGEX, base_url) is None:
#     print(CRED + 'ERROR: please avoid using any special characters in your base url!')
#     print(CRED + 'Include only alphanumeric characters.')
#     # Exits with status 1 to indicate failure
#     sys.exit(1)

# check the encryption key
ENCRYPTION_KEY_REGEX = r'[^A-Za-z0-9]'
encryption_key = '{{cookiecutter.encryption_key}}'
if re.search(ENCRYPTION_KEY_REGEX, encryption_key):
    print(CRED + 'ERROR: please avoid using any special characters in your encryption key!')
    print(CRED + 'Include only alphanumeric characters.')
    # Exits with status 1 to indicate failure
    sys.exit(1)

# check the repository link
REPOSITORY_LINK_REGEX = r'((git@|http(s)?:\/\/)([\w\.@]+)(\/|:))([\w,\-,\_]+)\/([\w,\-,\_]+)(.git){0,1}((\/){0,1})'
repository_link = '{{ cookiecutter.repository_link }}'
if repository_link != 'NA' :
    if (not re.search(REPOSITORY_LINK_REGEX, repository_link)):
        print(CRED + '\n ERROR: %s is not a valid repository URL! \n' % repository_link + CEND)
        # Exits with status 1 to indicate failure
        sys.exit(1)

print (CGREEN + 'Proceeding with app name: {}, package name: {}'.format(project_name, bundle_identifier) + CEND)